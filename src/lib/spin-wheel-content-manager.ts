import { SpinWheelSegment } from '@/types/spin-wheel.type'
import { SpinnerData } from '@/services/graphql/spinner'

export interface SpinWheelContentConfig {
  restaurantId: string
  segments: SpinWheelSegment[]
  isActive: boolean
  startDate?: string
  endDate?: string
  lastUpdated: string
}

// Default color palette for spin wheel segments
const DEFAULT_COLORS = [
  '#EE4040', // Red
  '#F0CF50', // Yellow
  '#815CD1', // Purple
  '#3DA5E0', // Blue
  '#FF9000', // Orange
  '#CF0F47', // Dark Red
  '#34A24F', // Green
  '#FF6B9D', // Pink
]

class SpinWheelContentManager {
  private static instance: SpinWheelContentManager
  private configCache: Map<string, SpinWheelContentConfig> = new Map()

  static getInstance(): SpinWheelContentManager {
    if (!SpinWheelContentManager.instance) {
      SpinWheelContentManager.instance = new SpinWheelContentManager()
    }
    return SpinWheelContentManager.instance
  }

  /**
   * Parse API spinner data into SpinWheelContentConfig
   */
  parseApiData(restaurantId: string, spinnerData: SpinnerData | null): SpinWheelContentConfig | null {
    if (!spinnerData) {
      return null
    }

    if (!spinnerData.distributions || spinnerData.distributions.length === 0) {
      return null
    }

    const segments: SpinWheelSegment[] = spinnerData.distributions.map((distribution, index) => {
      const label = distribution.label || ''
      const percentage = distribution.percentage || 0
      
      // Extract discount value from label (e.g., "60% off" -> 60)
      const discountMatch = label.match(/(\d+)%?\s*off/i)
      const discountValue = discountMatch ? parseInt(discountMatch[1], 10) : undefined
      
      // Determine discount type based on label
      let discountType: 'percentage' | 'fixed' | 'free_item' | 'no_prize' = 'percentage'
      let freeItemName: string | undefined = undefined
      
      const lowerLabel = label.toLowerCase()
      if (lowerLabel.includes('free') || lowerLabel.includes('complimentary')) {
        discountType = 'free_item'
        // Try to extract item name from offer name or label
        const itemMatch = label.match(/free\s+(\w+)/i) || distribution.offer?.name?.match(/free\s+(\w+)/i)
        freeItemName = itemMatch ? itemMatch[1] : 'Item'
      } else if (lowerLabel.includes('better luck') || lowerLabel.includes('no prize') || lowerLabel.includes('try again')) {
        discountType = 'no_prize'
      } else if (discountValue !== undefined) {
        discountType = 'percentage'
      }

      return {
        id: `${spinnerData.id}-${index}`,
        text: label,
        color: DEFAULT_COLORS[index % DEFAULT_COLORS.length],
        probability: percentage,
        discountType,
        discountValue,
        freeItemName,
        isActive: true,
        displayOrder: index + 1
      }
    })

    return {
      restaurantId,
      segments,
      isActive: true,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
      lastUpdated: new Date().toISOString()
    }
  }

  getConfig(restaurantId: string, spinnerData?: SpinnerData | null): SpinWheelContentConfig | null {
    if (spinnerData) {
      const config = this.parseApiData(restaurantId, spinnerData)
      if (config) {
        // Cache the config for later use
        this.configCache.set(restaurantId, config)
      }
      return config
    }
    
    // Try to get from cache
    return this.configCache.get(restaurantId) || null
  }

  selectSegment(restaurantId: string): SpinWheelSegment | null {
    const config = this.configCache.get(restaurantId)
    if (!config || !config.isActive) return null

    const activeSegments = config.segments.filter(s => s.isActive)
    if (activeSegments.length === 0) return null

    // All active segments are available (no cooldown or max spins restrictions)
    return this.selectWeightedSegment(activeSegments)
  }

  private selectWeightedSegment(segments: SpinWheelSegment[]): SpinWheelSegment {
    const totalWeight = segments.reduce((sum, segment) => sum + segment.probability, 0)
    let random = Math.random() * totalWeight

    for (const segment of segments) {
      random -= segment.probability
      if (random <= 0) {
        return segment
      }
    }

    // Fallback to last segment
    return segments[segments.length - 1]
  }

}

export const spinWheelContentManager = SpinWheelContentManager.getInstance()