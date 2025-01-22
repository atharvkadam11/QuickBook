import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Grid,
  Paper,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Image1 from "../images/movies/15.jpg";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import axios from "axios";

function SelectMovieScreen() {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState(null);
  const [showTimings, setShowTimings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const location = useLocation();

  //const movieId = "438631";

  //const { movieId } = location.state;

  const videoOptions = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };
  const onPlayerReady = (event) => {};
  const movieName = "Dune";

  useEffect(() => {
    const fetchMovieInfo = async () => {
      //const movieId = "438631";

      try {
        const response = await axios.get(
          "http://localhost:3000/movie/" + movieId
        );
        console.log("Movie data d " + response.data.movie.id);
        setMovieInfo(response.data.movie);
        setLoading(false);
      } catch (error) {
        console.log("Movie data d " + error.message);
        setError(error.message);
      }
    };

    const fetchShowTimings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/movie/timings/" + movieId
        );
        console.log("Timing " + response.data.theatres[0].EventID);
        console.log(
          "Timing actual " + response.data.theatres[0].EventTimings[0]
        );
        setShowTimings(response.data.theatres);
        setLoading2(false);
      } catch (error) {
        console.log("Error.." + error.message);
        setError(error.message);
      }
    };
    fetchShowTimings();
    fetchMovieInfo();
    return () => {
      // Any cleanup code if needed
    };
  }, [movieId]);

  const handleBookTicket = () => {
    navigate("/bookSeat");
  };

  // Function to book a movie
  const bookMovie = (id, theatreName, timing) => {
    // Replace this with your booking API call
    console.log(`Booking movie at ${theatreName} for ${timing}`);
    navigate("/bookSeat", {
      state: { id, theatreName, timing, movieName, movieId },
    });
  };

  return (
    <div>
      {loading ? (
        <p>Loading....</p>
      ) : (
        <div style={{ marginTop: "25px" }}>
          <Box display="flex" p={1}>
            <Box flexShrink={0}>
              <img
                src={`https://image.tmdb.org/t/p/original/${movieInfo.poster_path}`}
                alt="Movie Poster"
                style={{ width: 300, height: 450 }}
              />
            </Box>
            <Box flexGrow={1} ml={2}>
              <Typography variant="h4" style={{ fontWeight: "bold" }}>
                {movieInfo.original_title}
              </Typography>
              <Typography paragraph style={{ marginTop: "10px" }}>
                {movieInfo.overview}
              </Typography>
              {loading2 ? (
                <p>Loading....</p>
              ) : (
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{ fontWeight: "bold", fontSize: "25px" }}
                        >
                          Theatre
                        </TableCell>
                        <TableCell
                          align="centre"
                          style={{ fontWeight: "bold", fontSize: "25px" }}
                        >
                          Show Timings
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {showTimings.map((theatre) => (
                        <TableRow key={theatre.venue_name}>
                          <TableCell>{theatre.venue_name}</TableCell>
                          <TableCell>
                            {theatre.EventTimings.map((timing) => (
                              <Button
                                key={timing}
                                onClick={() =>
                                  bookMovie(
                                    theatre.venue_id,
                                    theatre.venue_name,
                                    timing
                                  )
                                }
                              >
                                {timing}
                              </Button>
                            ))}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          </Box>
          <Box display={"flex"}>
            <Box
              p={1}
              style={{
                display: "flex",
              }}
            >
              {movieInfo.trailerKey ? (
                <YouTube
                  videoId={movieInfo.trailerKey}
                  opts={videoOptions}
                  onReady={onPlayerReady}
                />
              ) : (
                <div>Video not found</div>
              )}
            </Box>
            <Box flexGrow={1} ml={3}>
              <Grid container spacing={2} sx={{ padding: "20px" }}>
                <Grid item xs={12} sm={6}>
                  <Paper elevation={3} sx={{ padding: "20px" }}>
                    <Typography variant="h6" gutterBottom>
                      Cast
                    </Typography>
                    <List>
                      {movieInfo.cast.map((member, index) => (
                        <ListItem key={index} divider>
                          <ListItemText
                            primary={member.name}
                            secondary={member.character}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper elevation={3} sx={{ padding: "20px" }}>
                    <Typography variant="h6" gutterBottom>
                      Crew
                    </Typography>
                    <List>
                      {movieInfo.crew.map((member, index) => (
                        <ListItem key={index} divider>
                          <ListItemText
                            primary={member.name}
                            secondary={member.job}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
}

export default SelectMovieScreen;
