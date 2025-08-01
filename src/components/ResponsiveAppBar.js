import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-scroll";

const pages = ["home", "resume", "skills", "projects"];

const ResponsiveAppBar = React.memo(() => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  // Function to get scroll offset based on screen height
  const getScrollOffset = (page) => {
    const isTallMonitor = window.innerHeight >= 1000;

    if (isTallMonitor) {
      // More offset for tall monitors (scrolls down less)
      switch (page) {
        case "resume":
          return -250;
        case "skills":
          return -150;
        case "projects":
          return -225;
        default:
          return 0;
      }
    } else {
      // Standard offset for normal monitors
      switch (page) {
        case "resume":
          return -175;
        case "skills":
          return -75;
        case "projects":
          return -150;
        default:
          return 0;
      }
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar className="app-bar-custom">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                  }}
                >
                  <Link
                    activeClass="active"
                    to={page}
                    spy={true}
                    smooth={true}
                    offset={getScrollOffset(page)}
                    duration={500}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link
                  activeClass="active"
                  to={page}
                  spy={true}
                  smooth={true}
                  offset={getScrollOffset(page)}
                  duration={500}
                >
                  {page}
                </Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
});
export default ResponsiveAppBar;
