import { SpinWheelSegment } from '@/types/spin-wheel.type'

export interface SpinWheelContentConfig {
  restaurantId: string
  segments: SpinWheelSegment[]
  isActive: boolean
  startDate?: string
  endDate?: string
  lastUpdated: string
}

class SpinWheelContentManager {
  private static instance: SpinWheelContentManager

  static getInstance(): SpinWheelContentManager {
    if (!SpinWheelContentManager.instance) {
      SpinWheelContentManager.instance = new SpinWheelContentManager()
    }
    return SpinWheelContentManager.instance
  }

  getConfig(restaurantId: string): SpinWheelContentConfig | null {
    return this.createDefaultConfig(restaurantId)
  }

  // Utility Methods
  createDefaultConfig(restaurantId: string): SpinWheelContentConfig {
    const defaultSegments: SpinWheelSegment[] = [
      {
        id: '1',
        text: 'Flat 10% OFF',
        color: '#EE4040',
        probability: 30,
        discountType: 'percentage',
        discountValue: 10,
        isActive: true,
        displayOrder: 1
      },
      {
        id: '2',
        text: 'Flat 20% OFF',
        color: '#F0CF50',
        probability: 20,
        discountType: 'percentage',
        discountValue: 20,
        isActive: true,
        displayOrder: 2
      },
      {
        id: '3',
        text: 'Free Drinks',
        color: '#815CD1',
        probability: 15,
        discountType: 'free_item',
        freeItemName: 'Drinks',
        isActive: true,
        displayOrder: 3
      },
      {
        id: '4',
        text: 'Free Dessert',
        color: '#3DA5E0',
        probability: 15,
        discountType: 'free_item',
        freeItemName: 'Dessert',
        isActive: true,
        displayOrder: 4
      },
      {
        id: '5',
        text: 'Better Luck Next Time!',
        color: '#FF9000',
        probability: 15,
        discountType: 'no_prize',
        isActive: true,
        displayOrder: 5
      },
      {
        id: '6',
        text: '50% OFF Up To 500 Rs',
        color: '#CF0F47',
        probability: 5,
        discountType: 'percentage',
        discountValue: 50,
        maxUsesPerDay: 1, // Only 1 user per day can win this
        isActive: true,
        displayOrder: 6
      }
    ]

    return {
      restaurantId,
      segments: defaultSegments,
      isActive: true,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
      lastUpdated: new Date().toISOString()
    }
  }


  
  selectSegment(restaurantId: string): SpinWheelSegment | null {
    const config = this.getConfig(restaurantId)
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