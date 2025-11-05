export interface SpinWheelSegment {
	id: string
	text: string
	color: string
	probability: number // 0-100, higher means more likely to win
	discountType: 'percentage' | 'fixed' | 'free_item' | 'no_prize'
	discountValue?: number // percentage or fixed amount
	freeItemName?: string // for free items
	maxUsesPerDay?: number // daily limit for this segment
	maxUsesTotal?: number // total limit for this segment
	isActive: boolean
	displayOrder: number
}

export interface SpinWheelConfig {
	id: string
	restaurantId: string
	segments: SpinWheelSegment[]
	isActive: boolean
	spinCooldownMinutes: number // time between spins for same user
	maxSpinsPerUserPerDay: number
	startDate?: string
	endDate?: string
	createdAt: string
	updatedAt: string
}

export interface SpinWheelUsage {
	id: string
	restaurantId: string
	userId: string // can be device ID, IP, or actual user ID
	segmentId: string
	prizeWon: string
	usedAt: string
	ipAddress?: string
	userAgent?: string
}

export interface SpinWheelStats {
	totalSpins: number
	spinsToday: number
	segmentUsage: Record<string, number> // segmentId -> count
	lastSpinTime?: string
	canSpin: boolean
	cooldownRemaining?: number // minutes
}

export interface SpinWheelResult {
	success: boolean
	prize?: string
	segment?: SpinWheelSegment
	error?: string
	stats?: SpinWheelStats
}