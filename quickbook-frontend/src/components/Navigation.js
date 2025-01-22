import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import { flexbox } from "@mui/system";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();

  const moviePage = () => {
    navigate("/movies");
  };

  const eventPage = () => {
    navigate("/event");
  };

  const showPage = () => {
    navigate("/show");
  };

  return (
    <div style={{ backgroundColor: "black" }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ height: 0 }}
      >
        <Toolbar>
          <div style={{ marginTop: "-30px" }}>
            <Button color="inherit" onClick={moviePage}>
              Movies
            </Button>
            <Button color="inherit" onClick={eventPage}>
              Events
            </Button>
            <Button color="inherit" onClick={showPage}>
              Shows
            </Button>
          </div>

          {/* Add more navigation links as needed */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navigation;
