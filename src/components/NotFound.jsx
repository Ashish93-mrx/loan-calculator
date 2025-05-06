import React from "react";
import { Typography, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        textAlign: "center",
        paddingTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" color="error" fontWeight="bold">
        Oops! Page Not Found
      </Typography>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        sx={{ maxWidth: "400px", marginBottom: 2 }}
      >
        The page you're looking for doesn't exist or might have been moved.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2, padding: "10px 20px", fontSize: "16px" }}
        onClick={() => navigate("/")}
      >
        Go Back Home
      </Button>
    </Container>
  );
};

export default NotFound;
