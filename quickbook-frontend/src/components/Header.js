import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu"; // Assuming you use it as the app logo
import { Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import LoginForm from "./LoginForm";

import SearchAutocomplete from "./SearchAutocomplete";

import Image1 from "../images/movies/1.avif";
import Image2 from "../images/movies/2.avif";
import Image3 from "../images/movies/3.avif";
import Image4 from "../images/movies/4.avif";
import Image5 from "../images/movies/5.avif";
import Image6 from "../images/movies/6.avif";
import Image7 from "../images/movies/7.avif";
import Image8 from "../images/movies/8.avif";
import Image9 from "../images/movies/9.avif";
import { useAuth } from "../context/auth.context";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, logout } = useAuth();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleClick = () => {
    setShowLogin(true);
  };
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const toggleLoggedIn = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const userProfile = () => {
    navigate("/user");
  };

  const handleSupportClick = () => {
    navigate("/support");
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (query.trim() !== "") {
      axios
        .get(`http://localhost:3000/movie/search?query=${query}`)
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
        });
    } else {
      setResults([]);
    }
  }, [query]);

  // const [name, setName] = useState("");
  // console.log(name);

  const movies = [
    { id: 1, title: "Ram Sethu", poster: Image1 },
    { id: 2, title: "Black Panther", poster: Image2 },
    { id: 3, title: "Bh", poster: Image3 },
    { id: 4, title: "Drishyam", poster: Image4 },
    { id: 5, title: "Dhrishyam 2", poster: Image5 },
    { id: 6, title: "UUnchai", poster: Image6 },
    { id: 7, title: "Inception", poster: Image7 },
    { id: 8, title: "Interstellar", poster: Image8 },
    { id: 9, title: "Inception", poster: Image9 },
    // Add more movie objects here
  ];

  //old version
  // return (
  //   <AppBar position="static" sx={{ minHeight: "10px" }}>
  //     <Toolbar sx={{ minHeight: "10px", marginBottomx: 15 }}>
  //       <IconButton
  //         edge="start"
  //         color="inherit"
  //         aria-label="menu"
  //         sx={{ mr: 1 }}
  //         onClick={handleLogoClick}
  //       >
  //         <h4>QuickBook</h4>
  //         {/* This icon serves as the app logo */}
  //       </IconButton>
  //       {/* This Box component serves as a spacer */}
  // <Box flex={1}>
  //   <TextField
  //   // onChange={(e) => {
  //   //   setName(e.target.value);
  //   // }}
  //     style={{ color: "white" }}
  //     fullWidth
  //     variant="outlined"
  //     placeholder="Search for movies/events/shows..."
  //     InputProps={{
  //       sx: {
  //         "& .MuiInputBase-input::placeholder": {
  //           // Targeting the placeholder style
  //           color: "white", // Change to your desired placeholder color
  //           opacity: 1, // Optional: adjust the opacity of the placeholder text
  //         },
  //         background: "#353232",
  //         color: "white",
  //       },

  //       startAdornment: (
  //         <InputAdornment position="start">
  //           <SearchIcon style={{ color: "white" }} />
  //         </InputAdornment>
  //       ),
  //     }}
  //   />
  // </Box>

  //       <Button onClick={handleClick} color="inherit" sx={{ ml: 2 }} >
  //       {/* {seen ? <Login toggle={togglePop} /> : null} */}

  //         Login/Signup
  //       </Button>
  //       {showLogin && <LoginForm/>}
  //     </Toolbar>
  //   </AppBar>
  // );

  const updateResults = (newResults) => {
    setResults(newResults);
  };

  //new version
  return (
    <AppBar position="static" sx={{ minHeight: "10px" }}>
      <Toolbar sx={{ minHeight: "10px", marginBottomx: 15 }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 1 }}
          onClick={handleLogoClick}
        >
          <h4>QuickBook</h4>
          {/* This icon serves as the app logo */}
        </IconButton>
        {/* This Box component serves as a spacer */}
        <Box flex={1}>
          <input
            type="text"
            style={{
              marginLeft: "20px",
              marginTop: "10px",
              width: "900px",
              height: "50px",
              borderRadius: "5px",
              fontStyle: "italic",
              fontSize: "17px",
            }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="  Search for a movie..."
          />
        </Box>

        {!user ? (
          <>
            <Button onClick={handleSupportClick} color="inherit" sx={{ ml: 2 }}>
              Customer Support
            </Button>
            <Button onClick={handleClick} color="inherit" sx={{ ml: 2 }}>
              Login/Signup
            </Button>

            {showLogin && (
              <LoginForm
                onLoginToggle={toggleLogin}
                onLoggedInToggle={toggleLoggedIn}
              />
            )}
          </>
        ) : (
          <>
            <Button onClick={handleSupportClick} color="inherit" sx={{ ml: 2 }}>
              Customer Support
            </Button>
            <Button onClick={userProfile} color="inherit" sx={{ ml: 2 }}>
              Welcome, {user.username}
            </Button>
            <Button onClick={handleLogout} color="inherit" sx={{ ml: 2 }}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
      <SearchAutocomplete results={results} updateResults={updateResults} />
    </AppBar>
  );
};

export default Header;
