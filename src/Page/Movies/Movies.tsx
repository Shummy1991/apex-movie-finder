import { Card, CardContent, Grid, Stack } from "@mui/material";
import { useState } from "react";

import MovieDetails from "../MovieDetails";
import { IMoviesProps } from "./Movies.models";
import { getGenres } from "./Movies.utils";
import "./Movies.css";

const Movies = ({ movies, handleGetRelatedMovies }: IMoviesProps) => {
    // The original idea was to display wiki below the card, but there were too much space left on the right side.
    const [selectedMovie, setSelectedMovie] = useState<string | null>(null);

    return (
        <Stack spacing={2}>
            {movies.map(movie => (
                <Card key={movie.id}>
                    <CardContent className="movie-card-content">
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <img src={movie.img?.url} className="movie-image" />
                            </Grid>
                            <Grid item xs={8}>
                                <h4 onClick={() => setSelectedMovie(movie.id)}>
                                    {movie.name}
                                </h4>
                                <div className="movie-genres">
                                    {getGenres(movie.genres)}
                                </div>
                                <div className="movie-score">
                                    Score: {movie.score}
                                </div>
                                {selectedMovie === movie.id && (
                                    <MovieDetails movie={movie} handleGetRelatedMovies={handleGetRelatedMovies} />
                                )}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ))}
        </Stack>
    )
};

export default Movies;
