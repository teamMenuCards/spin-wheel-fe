import React from "react";
import { Typography, Box } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        padding: "1rem",
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #ddd",
      }}
    >
      <Typography variant="body2" color="textSecondary">
          © 2024 MenuCards. All rights reserved by Welnia Food Private
      </Typography>
      <Typography variant="body2" style={{ color: "black" }}>
						<span>getmenucards@gmail.com</span>
						<span style={{ paddingLeft: "15px" }}>9757024944</span>
				</Typography>
    </Box>
  );
};

export default Footer;
