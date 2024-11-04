"use client"
import { Open_Sans } from "next/font/google"
import localFont from "next/font/local"

import { createTheme } from "@mui/material/styles"

import type {} from "@mui/x-data-grid/themeAugmentation"

declare module "@mui/material/styles" {
	interface TypographyVariants {
		SPP_H1: React.CSSProperties
		SPP_H2: React.CSSProperties
		SPP_H3: React.CSSProperties
		SPP_H4: React.CSSProperties
		SPP_H5: React.CSSProperties
		SPP_H6: React.CSSProperties
		SPP_Body_1: React.CSSProperties
		SPP_Body_2: React.CSSProperties
		SPP_Display_1: React.CSSProperties
		SPP_Display_2: React.CSSProperties
		SPP_Display_3: React.CSSProperties
		SPP_Caption: React.CSSProperties
		SPP_CTA: React.CSSProperties
	}

	// allow configuration using `createTheme`
	interface TypographyVariantsOptions {
		SPP_H1?: React.CSSProperties
		SPP_H2?: React.CSSProperties
		SPP_H3?: React.CSSProperties
		SPP_H4?: React.CSSProperties
		SPP_H5?: React.CSSProperties
		SPP_H6?: React.CSSProperties
		SPP_Body_1?: React.CSSProperties
		SPP_Body_2?: React.CSSProperties
		SPP_Display_1?: React.CSSProperties
		SPP_Display_2: React.CSSProperties
		SPP_Display_3: React.CSSProperties
		SPP_Caption?: React.CSSProperties
		SPP_CTA?: React.CSSProperties
	}

	interface Palette {
		outline: Palette["primary"]
		customColors: {
			lightSteelBlue: string
			cadetGrey: string
			blueGray: string
			whiteSmoke: string
			pastelGreen: string
			lightGray: string
			slateGrey: string
			black: string
			caramel: string
		}
	}

	interface PaletteColor {
		lighter?: string
	}

	interface SimplePaletteColorOptions {
		lighter?: string
	}

	interface PaletteOptions {
		outline?: PaletteOptions["primary"]
		customColors: {
			lightSteelBlue: string
			cadetGrey: string
			whiteSmoke: string
			blueGray: string
			pastelGreen: string
			lightGray: string
			slateGrey: string
			black: string
			caramel: string
		}
	}
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
	interface TypographyPropsVariantOverrides {
		SPP_H1: true
		SPP_H2: true
		SPP_H3: true
		SPP_H4: true
		SPP_H5: true
		SPP_H6: true
		SPP_Body_1: true
		SPP_Body_2: true
		SPP_Display_1: true
		SPP_Display_2: true
		SPP_Display_3: true
		SPP_Caption: true
		SPP_CTA: true
	}
}

const openSans = Open_Sans({
	weight: ["300", "400", "700"],
	subsets: ["latin"],
	display: "swap"
})

const metropolis = localFont({
	src: [
		{
			path: "../../fonts/Metropolis-Bold.otf",
			weight: "700",
			style: "normal"
		},
		{
			path: "../../fonts/Metropolis-SemiBold.otf",
			weight: "600",
			style: "normal"
		},
		{
			path: "../../fonts/Metropolis-Regular.otf",
			weight: "400",
			style: "normal"
		}
	]
})

const globalTheme = createTheme({
	palette: {
		mode: "light",
		outline: {
			light: "#E4E8EB",
			main: "#AFBBC2",
			dark: "#96A6AF"
		},
		primary: {
			light: "#9cdd63",
			main: "#73B042",
			dark: "#1B648E",
			lighter: "#E8F7FF",
			contrastText: "#FFFFFF"
		},
		secondary: {
			main: "#232323"
		},
		customColors: {
			lightSteelBlue: "#AFBBC2",
			cadetGrey: "#6E7D86",
			blueGray: "#F5FBFE",
			pastelGreen: "#D0F288",
			whiteSmoke: "#f6f6f6",
			black: "#000000",
			lightGray: "#EBEEF1",
			caramel: "#edc834",
			slateGrey: "#a8b4ba"
		}
	},
	shape: {
		borderRadius: 8
	}
})

const customeProperties = createTheme({
	...globalTheme,
	typography: {
		fontFamily: metropolis.style.fontFamily,
		SPP_H1: {
			color: globalTheme.palette.primary.main,
			fontFamily: metropolis.style.fontFamily,
			lineHeight: "56px",
			fontSize: 42,
			fontWeight: 700
		},
		SPP_H2: {
			color: globalTheme.palette.primary.main,
			fontFamily: metropolis.style.fontFamily,
			lineHeight: "48px",
			fontSize: 36,
			fontWeight: 700
		},
		SPP_H3: {
			color: globalTheme.palette.primary.main,
			fontFamily: metropolis.style.fontFamily,
			lineHeight: "32px",
			fontSize: 26,
			fontWeight: 700
		},
		SPP_H4: {
			color: globalTheme.palette.primary.main,
			fontFamily: metropolis.style.fontFamily,
			lineHeight: "28px",
			fontSize: 22,
			fontWeight: 700
		},
		SPP_H5: {
			color: globalTheme.palette.primary.main,
			fontFamily: metropolis.style.fontFamily,
			lineHeight: "24px",
			fontSize: 18,
			fontWeight: 700
		},
		SPP_H6: {
			color: globalTheme.palette.primary.main,
			fontFamily: metropolis.style.fontFamily,
			lineHeight: "20px",
			fontSize: 16,
			fontWeight: 600
		},
		SPP_Body_1: {
			color: globalTheme.palette.primary.main,
			fontFamily: openSans.style.fontFamily,
			lineHeight: "24px",
			fontSize: 14,
			fontWeight: 400
		},
		SPP_Body_2: {
			color: globalTheme.palette.primary.main,
			fontFamily: openSans.style.fontFamily,
			lineHeight: "20px",
			fontSize: 12,
			fontWeight: 400
		},
		SPP_Display_1: {
			color: globalTheme.palette.primary.main,
			fontFamily: metropolis.style.fontFamily,
			lineHeight: "40px",
			fontSize: 32,
			fontWeight: 700
		},
		SPP_Display_2: {
			color: globalTheme.palette.primary.main,
			fontFamily: metropolis.style.fontFamily,
			lineHeight: "7px",
			fontSize: 9,
			fontWeight: 400
		},
		SPP_Display_3: {
			color: globalTheme.palette.primary.main,
			fontFamily: metropolis.style.fontFamily,
			lineHeight: "14px",
			fontSize: 11,
			fontWeight: 400
		},
		SPP_Caption: {
			color: globalTheme.palette.primary.main,
			fontFamily: metropolis.style.fontFamily,
			lineHeight: "14px",
			fontSize: 14,
			fontWeight: 600
		},
		SPP_CTA: {
			color: globalTheme.palette.primary.main,
			fontFamily: metropolis.style.fontFamily,
			lineHeight: "32px",
			fontSize: 20,
			fontWeight: 700
		}
	}
})

const theme = createTheme({
	...customeProperties,
	components: {
		MuiTypography: {
			defaultProps: {
				variantMapping: {
					SPP_H1: "h1",
					SPP_H2: "h2",
					SPP_H3: "h3",
					SPP_H4: "h4",
					SPP_H5: "h5",
					SPP_H6: "h6",
					SPP_Body_1: "p",
					SPP_Body_2: "p",
					SPP_Display_1: "p",
					SPP_Display_2: "p",
					SPP_Display_3: "p",
					SPP_Caption: "p",
					SPP_CTA: "p"
				}
			}
		},
		MuiButton: {
			styleOverrides: {
				root: {
					fontFamily: metropolis.style.fontFamily,
					fontWeight: 700,
					fontSize: 16,
					lineHeight: "24px"
				},
				contained: {
					boxShadow: "none",
					"&:hover": {
						boxShadow: "none"
					}
				}
			}
		},
		MuiMenu: {
			styleOverrides: {
				paper: {
					boxShadow:
						"0px 2px 2px -1px rgba(0,0,0,0.1), 0px 4px 5px 0px rgba(0,0,0,0.08), 0px 1px 7px 1px rgba(0,0,0,0.06)"
				}
			}
		},

		MuiAccordion: {
			styleOverrides: {
				root: {
					".mui-10gfn9n-MuiPaper-root-MuiAccordion-root": {
						boxShadow: "none"
					}
				}
			}
		},

		MuiChip: {
			styleOverrides: {
				root: {
					borderRadius: 4
				},
				outlined: {
					border: "none",
					outline: `1px solid ${globalTheme.palette.outline.main}`
				}
			}
		},
		MuiInputBase: {
			styleOverrides: {
				multiline: {
					"&.MuiOutlinedInput-root": {
						backgroundColor: globalTheme.palette.primary.contrastText
					}
				}
			}
		},

		MuiDataGrid: {
			styleOverrides: {
				root: {
					border: "none",
					height: 500,
					overflow: "hidden",
					borderRadius: 0,
					".MuiDataGrid-row--lastVisible": {
						borderBottom: `1px solid ${globalTheme.palette.outline.light}`
					}
				},
				main: {
					overflow: "unset"
				},
				columnHeaderTitle: {
					...customeProperties.typography.SPP_H6,
					color: globalTheme.palette.text.primary
				},
				columnHeaders: {
					top: 0,
					zIndex: 1,
					position: "sticky",
					border: "none",
					marginBottom: 20,
					"& .MuiDataGrid-columnHeader:first-child": {
						paddingLeft: 0
					},
					"& .MuiDataGrid-columnHeader:last-child": {
						paddingRight: 0
					}
				},
				cell: {
					borderColor: globalTheme.palette.outline.light
				},
				row: {
					"& .MuiDataGrid-cell:first-child": {
						paddingLeft: 0
					},
					"& .MuiDataGrid-cell:last-child": {
						paddingRight: 0
					}
				}
			}
		},
		MuiTabs: {
			styleOverrides: {
				indicator: {
					height: 4,
					borderRadius: 4
				}
			}
		},
		MuiTab: {
			styleOverrides: {
				root: {
					...customeProperties?.typography?.SPP_H4,
					color: globalTheme.palette.secondary.main,
					paddingBottom: 20,
					paddingLeft: 0,
					paddingRight: 0,
					marginRight: 40,
					textTransform: "capitalize"
				}
			}
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					top: 30,
					verticalAlign: "top",
					borderRadius: 24,
					marginBottom: 100
				}
			}
		},
		MuiListItemText: {
			defaultProps: {
				primaryTypographyProps: {
					variant: "SPP_Caption",
					color: "secondary"
				},
				secondaryTypographyProps: {
					variant: "SPP_Body_1"
				}
			}
		},
		MuiAccordion: {
			styleOverrides: {
				root: {
					borderColor: globalTheme.palette.outline.light,
					borderRadius: "0px !important"
				}
			}
		}
	}
})

export default theme
