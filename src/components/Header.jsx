import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  Divider,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Typography
        variant="h6"
        sx={{ p: 2, textAlign: "center", fontWeight: "bold" }}
      >
        Loan Calculator
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <Typography>Home</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/exchange_rates_live">
            <Typography>Exchange Rates (Live)</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/error_page">
            <Typography>ERROR PAGE</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component="a"
            href="https://github.com/Ashish93-mrx/loan-calculator"
            target="_blank"
          >
            <Typography>MY GITHUB REPO</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ThemeToggle />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor:
            theme.palette.mode === "dark"
              ? "#424242"
              : theme.palette.primary.main,
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            Loan EMI Calculator
          </Typography>
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 3 }}>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/exchange_rates_live"
              >
                Exchange Rates (Live)
              </Button>
              <Button color="inherit" component={Link} to="/error_page">
                ERROR PAGE
              </Button>
              <Button
                color="inherit"
                href="https://github.com/Ashish93-mrx/loan-calculator"
                target="_blank"
              >
                MY GITHUB REPO
              </Button>
              <ThemeToggle />
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Header;
