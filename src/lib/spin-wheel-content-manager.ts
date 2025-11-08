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
   * Calculates angles for each segment based on total segments
   * Default "No discount" segment always gets 0-72 degrees (first segment)
   */
  parseApiData(restaurantId: string, spinnerData: SpinnerData | null): SpinWheelContentConfig | null {
    if (!spinnerData) {
      return null
    }

    if (!spinnerData.distributions || spinnerData.distributions.length === 0) {
      return null
    }

    // First, create segments without angles
    const segmentsWithoutAngles: SpinWheelSegment[] = spinnerData.distributions.map((distribution, index) => {
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
      } else if (lowerLabel.includes('better luck') || lowerLabel.includes('no prize') || lowerLabel.includes('try again') || lowerLabel.includes('no discount')) {
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

    // Separate "No discount" segment from other segments
    const noDiscountSegment = segmentsWithoutAngles.find(
      segment => segment.discountType === 'no_prize' && segment.text.toLowerCase().includes('no discount')
    )
    const otherSegments = segmentsWithoutAngles.filter(
      segment => !(segment.discountType === 'no_prize' && segment.text.toLowerCase().includes('no discount'))
    )

    // Sort other segments by displayOrder to ensure consistent placement
    const sortedOtherSegments = [...otherSegments].sort((a, b) => {
      // Ensure displayOrder is defined, default to 999 if not
      const orderA = a.displayOrder ?? 999
      const orderB = b.displayOrder ?? 999
      return orderA - orderB
    })

    // Reorder: "No discount" first (displayOrder: 0), then other segments sorted by displayOrder
    const orderedSegments: SpinWheelSegment[] = noDiscountSegment 
      ? [noDiscountSegment, ...sortedOtherSegments]
      : sortedOtherSegments

    // Calculate angles for each segment
    const totalSegments = orderedSegments.length
    const anglePerSegment = 360 / totalSegments // e.g., 5 segments = 72 degrees each

    const segments: SpinWheelSegment[] = orderedSegments.map((segment, index) => {
      const startAngle = index * anglePerSegment
      const endAngle = (index + 1) * anglePerSegment
      const centerAngle = startAngle + (anglePerSegment / 2)

      return {
        ...segment,
        startAngle,
        endAngle,
        centerAngle
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