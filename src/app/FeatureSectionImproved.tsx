"use client"

import React from "react"
import {
	Typography,
	Box,
	Grid,
	Container,
	
} from "@mui/material"

import { styled } from "@mui/material/styles"
//import CheckIcon from "@mui/icons-material/Check"


const FeaturesSection = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(10),
    padding: theme.spacing(3),
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(3, 1),
    },
  }))
  
  const FeatureBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    border: "1px solid #e0e0e0",
    borderRadius: theme.spacing(2),
    textAlign: "center",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.2)",
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  }))
  
  const FeatureIcon = styled(Image)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: 40,
      height: 40,
    },
  }))
  
  export default function FeaturesSectionComponent() {
    return (
      <FeaturesSection>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Why Choose MenuCard?
        </Typography>
        <Grid container spacing={4}>
          {[
            { title: "Food item rating", desc: "Let your old customers rate food and help new ones discover the best sellers.", icon: "/feature-icon1.png" },
            { title: "Marketing Returns", desc: "Don’t just blindly spend on marketing, figure out the ROI on what you spent.", icon: "/feature-icon2.png" },
            { title: "Customer Feedback", desc: "Ensure customers leaving your restaurant are happy and satisfied.", icon: "/feature-icon3.png" },
            { title: "Social Media Sharing", desc: "Make sure customers share their experiences and drive more traffic.", icon: "/feature-icon4.png" },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureBox>
                <FeatureIcon src={feature.icon} alt={`${feature.title} Icon`} width={60} height={60} />
                <Typography variant="h6" fontWeight="bold">{feature.title}</Typography>
                <Typography variant="body2" mt={1}>{feature.desc}</Typography>
              </FeatureBox>
            </Grid>
          ))}
        </Grid>
      </FeaturesSection>
    )
  }