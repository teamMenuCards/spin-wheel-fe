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
        © 2024 MenuCards. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
