import { SpinWheelSegment } from './spin-wheel.type'

export interface SpinWheelFeatureConfig {
  isActive: boolean
  segments: SpinWheelSegment[]
  startDate?: string
  endDate?: string
  customSettings?: {
    theme?: 'default' | 'dark' | 'colorful'
    animationSpeed?: 'slow' | 'normal' | 'fast'
    soundEnabled?: boolean
    showProbability?: boolean
  }
}

export interface FeatureFlags {
  RESTAURANT_ORDER_MODULE?: boolean
  RESTAURANT_REVIEW_FUNNEL?: boolean
  RESTAURANT_PRE_PLATFORM_ORDER_FLOW?: boolean
  SPIN_WHEEL_ENABLED?: boolean
  SPIN_WHEEL_CONFIG?: SpinWheelFeatureConfig
}

export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  RESTAURANT_ORDER_MODULE: false,
  RESTAURANT_REVIEW_FUNNEL: true,
  RESTAURANT_PRE_PLATFORM_ORDER_FLOW: false,
  SPIN_WHEEL_ENABLED: false,
  SPIN_WHEEL_CONFIG: {
    isActive: false,
    segments: [],
    customSettings: {
      theme: 'default',
      animationSpeed: 'normal',
      soundEnabled: true,
      showProbability: false
    }
  }
}