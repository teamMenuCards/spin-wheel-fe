"use client"
import NextLink from "next/link"
import Image from "next/image"
import { Box, Typography, Link, IconButton } from "@mui/material"
import { styled } from "@mui/material/styles"

import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PhoneIcon from '@mui/icons-material/Phone'

import PeopleIcon from '@mui/icons-material/People'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useState } from 'react'

// Background Section
const HeaderContainer = styled(Box)({
	position: 'fixed',
	top: 0,
	left: 0,
	width: '100vw',
	height: '188px',
	backgroundImage: 'url("/restaurant-bg2.png")',
	backgroundSize: 'cover',
	backgroundPosition: 'center',
	zIndex: 1
})

// Info Section Styles 
const InfoSection = styled(Box)({
	width: '100%',
	backgroundColor: 'white',
	position: 'relative',
	marginTop: '180px',
	zIndex: 3,
	minHeight: 'calc(100vh - 180px)',
	borderTopLeftRadius: '16px',
	borderTopRightRadius: '16px',
	padding: '60px 16px 16px',
	'& > *': {
		maxWidth: '100%'
	}
})

// Logo Container 
const LogoContainer = styled(Box)({
	position: 'absolute',
	top: '-62.5px',
	left: '50%',
	transform: 'translateX(-50%)',
	width: '125px',
	height: '125px',
	borderRadius: '50%',
	overflow: 'hidden',
	border: '2px solid white',
	backgroundColor: 'white',
	zIndex: 4
})

// Wrapper to handle scrolling
const PageWrapper = styled(Box)({
	width: '100vw',
	minHeight: '100vh',
	position: 'relative',
	overflow: 'hidden'
})

// Restaurant Details Styles
const RestaurantDetails = styled(Box)({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'flex-start',
	width: '100%',
	'& > .details-section': {
		flex: '1 1 auto',
		textAlign: 'left',
		paddingRight: '16px',
		maxWidth: 'calc(100% - 150px)'
	},
	'& > .ratings-section': {
		flex: '0 0 auto',
		textAlign: 'right',
		width: '150px'
	}
})

const DetailsColumn = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	gap: '2px',
})

const CuisineText = styled(Typography)({
	textAlign: 'left',
	color: '#666',
	fontSize: '0.875rem',
	display: 'flex',
	flexWrap: 'wrap',
	gap: '4px'
})

const PhoneContainer = styled(Box)({
	textAlign: 'left',

})

const PhoneLink = styled(Link)({
	display: 'inline-flex',
	alignItems: 'center',
	gap: '4px',
	color: '#000',
	textDecoration: 'underline',
	'& .MuiSvgIcon-root': {
		fontSize: '14px',
		marginRight: '4px'
	}
})

// Ratings Styles
const RatingItem = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	gap: '8px',
	marginBottom: '8px',
	'& img': {
		width: '20px',
		height: '20px',
		objectFit: 'contain'
	},
	'& .rating-text': {
		fontSize: '0.875rem',
		color: '#000',
		whiteSpace: 'nowrap',
		minWidth: '120px',
		textAlign: 'left',
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline'
		}
	}
})

// Restaurant Details Components
const TimeContainer = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	gap: '4px',
	marginBottom: '2px'
})

const TimeBox = styled(Box)({
	display: 'inline-flex',
	alignItems: 'center',
	padding: '1px 8px',
	border: '1px solid #e0e0e0',
	borderRadius: '4px',
	'& .MuiTypography-root': {
		fontSize: '0.775rem',
		color: '#000'
	}
})

// container for location section
const LocationContainer = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	gap: '4px',
	marginTop: '2px',
	width: 'fit-content',
	maxWidth: '90%',
})

// LocationLink styling
const LocationLink = styled(Link)({
	display: 'inline-flex',
	alignItems: 'center',
	padding: '1px 8px',
	border: '1px solid #e0e0e0',
	borderRadius: '4px',
	color: '#000',
	textDecoration: 'none',
	'& .MuiTypography-root': {
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		fontSize: '0.775rem',
		color: '#000'
	}
})

// Menu Button Styles
const MenuButton = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	padding: '16px 24px',
	backgroundColor: 'white',
	borderRadius: '12px',
	marginBottom: '12px',
	boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
	width: '100%',
	maxWidth: '400px',
	margin: '0 auto 12px',
	transition: 'all 0.2s ease',
	cursor: 'pointer',
	position: 'relative',
	'&:hover': {
		boxShadow: '0 2px 4px rgba(0,0,0,0.12)',
		transform: 'translateY(-1px)'
	},
	'& img': {
		marginRight: '16px',
	},
	'& .MuiTypography-root': {
		color: '#2e2e2e',
		fontWeight: 500,
		position: 'absolute',
		left: '50%',
		transform: 'translateX(-50%)',
		width: 'auto'
	}
})

// Menu Options container
const MenuOptionsContainer = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	width: '100%',
	maxWidth: '400px',
	margin: '24px auto 0',
	padding: '0 16px'
})

// Reviews Section Styles
const ReviewsSection = styled(Box)({
	width: '100%',
	maxWidth: '400px', 
	margin: '32px auto 0',
	padding: '0 16px'
})

const ReviewsTitle = styled(Box)({
	marginBottom: '16px',
	'& .MuiTypography-root': {
		color: '#000',
		fontSize: '1rem',
		fontWeight: 500
	}
})

const CarouselContainer = styled(Box)({
	position: 'relative',
	width: '100%',
	borderRadius: '12px',
	overflow: 'hidden',
	backgroundColor: 'white',
	boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
})

const CarouselContent = styled(Box)({
	display: 'flex',
	transition: 'transform 0.3s ease-in-out'
})

const CarouselControls = styled(Box)({
	position: 'absolute',
	bottom: '12px',
	left: '50%',
	transform: 'translateX(-50%)',
	display: 'flex',
	gap: '8px',
	zIndex: 2
})

const CarouselDot = styled(Box)<{ active?: boolean }>(({ active }) => ({
	width: '8px',
	height: '8px',
	borderRadius: '50%',
	backgroundColor: active ? '#333' : '#ccc',
	cursor: 'pointer'
}))

function LandingPage({ options, restaurantInfo }) {
	const [currentReview, setCurrentReview] = useState(0)
	const reviews = [
		'/review1.jpeg',
		'/review2.jpeg'
	]

	const handleNext = () => {
		setCurrentReview((prev) => (prev + 1) % reviews.length)
	}

	const handlePrev = () => {
		setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
	}

	return (
		<PageWrapper>
			<HeaderContainer />
			<InfoSection>
				<LogoContainer>
					<Image
						src="/coco.jpg"
						alt="Restaurant Logo"
						width={125}
						height={125}
						priority
					/>
				</LogoContainer>
				
				<RestaurantDetails>
					<Box className="details-section">
						<Typography variant="h6" fontWeight="bold" mb={1} fontSize="1.325rem">
							{restaurantInfo.name}
						</Typography>
						
						<DetailsColumn>
							<CuisineText>
								{restaurantInfo.cuisine.join(", ")}
							</CuisineText>

							<TimeContainer>
								<Image 
									src="/clock-icon.png"
									alt="Time"
									width={14}
									height={14}
								/>
								<TimeBox>
									<Typography variant="body2">{restaurantInfo.timing}</Typography>
								</TimeBox>
							</TimeContainer>

							<PhoneContainer>
								<PhoneLink href={`tel:${restaurantInfo.phone}`} underline="always">
									<PhoneIcon sx={{ fontSize: '14px' }} />
									<Typography variant="body2">{restaurantInfo.phone}</Typography>
								</PhoneLink>
							</PhoneContainer>

							<Box display="flex" alignItems="center">
								<PeopleIcon sx={{ mr: 1, fontSize: '14px', color: '#000' }} />
								<Typography variant="body2">₹{restaurantInfo.priceForTwo} for two</Typography>
							</Box>

							<LocationContainer>
								<Image 
									src="/google-maps-icon.png"
									alt="Location"
									width={14}
									height={14}
								/>
								<LocationLink 
									href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurantInfo.location)}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Typography variant="body2">{restaurantInfo.location}</Typography>
								</LocationLink>
							</LocationContainer>
						</DetailsColumn>
					</Box>

					<Box className="ratings-section">
						<Typography 
							variant="subtitle2" 
							fontWeight="bold" 
							mb={2} 
							fontSize="0.975rem"
							textAlign="left"
							sx={{ 
								color: '#000',
								marginTop: '2px'
							}}
						>
							Ratings & Review
						</Typography>
						<Box>
							<RatingItem>
								<Image 
									src="/zomato-logo.png" 
									alt="Zomato" 
									width={20} 
									height={20}
									style={{ marginLeft: 'auto' }}
								/>
								<Link 
									href="https://www.zomato.com/restaurant-review" 
									target="_blank"
									rel="noopener noreferrer"
									className="rating-text"
									underline="none"
								>
									{restaurantInfo.ratings.zomato.rating} ({restaurantInfo.ratings.zomato.count})
								</Link>
							</RatingItem>
							<RatingItem>
								<Image 
									src="/swiggy-logo.png" 
									alt="Swiggy" 
									width={20} 
									height={20}
									style={{ marginLeft: 'auto' }}
								/>
								<Link 
									href="https://www.swiggy.com/city/mumbai/caramel-and-coco-mahim-dadar-rest947982"
									target="_blank"
									rel="noopener noreferrer"
									className="rating-text"
									underline="none"
								>
									{restaurantInfo.ratings.swiggy.rating} ({restaurantInfo.ratings.swiggy.count})
								</Link>
							</RatingItem>
							<RatingItem>
								<Image 
									src="/google-logo.png" 
									alt="Google" 
									width={20} 
									height={20}
									style={{ marginLeft: 'auto' }}
								/>
								<Link 
									href="https://g.co/kgs/GBwnWYV"
									target="_blank"
									rel="noopener noreferrer"
									className="rating-text"
									underline="none"
								>
									{restaurantInfo.ratings.google.rating} ({restaurantInfo.ratings.google.count})
								</Link>
							</RatingItem>
						</Box>
					</Box>
				</RestaurantDetails>

				{/* Menu Options */}
				<MenuOptionsContainer>
					{options?.map((item, index) => (
						<Link 
							key={index} 
							href={item.path} 
							component={NextLink} 
							underline="none"
							style={{ width: '100%' }}
						>
							<MenuButton>
								{item.value === "Menu" && (
									<Image 
										src="/menu-icon.png"
										alt="Menu"
										width={24}
										height={24}
									/>
								)}
								{item.value === "Zomato" && (
									<Image 
										src="/zomato-logo.png"
										alt="Reserve"
										width={24}
										height={24}
									/>
								)}
								{item.value === "Swiggy" && (
									<Image 
										src="/swiggy-icon.png"
										alt="Website"
										width={24}
										height={24}
									/>
								)}
								{item.value === "Whatsapp us!" && (
									<Image 
										src="/whatsapp-icon.png"
										alt="WhatsApp"
										width={24}
										height={24}
									/>
								)}
								<Typography variant="body1">
									{item.value}
								</Typography>
							</MenuButton>
						</Link>
					))}
				</MenuOptionsContainer>

				{/* Reviews Section */}
				<ReviewsSection>
					<ReviewsTitle>
						<Typography variant="subtitle1">
							Verified Reviews
						</Typography>
					</ReviewsTitle>

					<CarouselContainer>
						<CarouselContent
							sx={{
								transform: `translateX(-${currentReview * 100}%)`
							}}
						>
							{reviews.map((review, index) => (
								<Box
									key={index}
									sx={{
										flex: '0 0 100%',
										position: 'relative'
									}}
								>
									<Image
										src={review}
										alt={`Review ${index + 1}`}
										width={400}
										height={200}
										style={{
											width: '100%',
											height: 'auto',
											objectFit: 'contain'
										}}
									/>
								</Box>
							))}
						</CarouselContent>

						<CarouselControls>
							{reviews.map((_, index) => (
								<CarouselDot
									key={index}
									active={currentReview === index}
									onClick={() => setCurrentReview(index)}
								/>
							))}
						</CarouselControls>
					</CarouselContainer>
				</ReviewsSection>
			</InfoSection>
		</PageWrapper>
	)
}

export default LandingPage
