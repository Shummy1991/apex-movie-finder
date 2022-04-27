import { CircularProgress, Container } from "@mui/material";
import { useState } from "react";

import { searchMovies } from "../services";
import { searchSimilarMovies } from "../services/searchSimilarMovies";
import { IMovie } from "../types";

import Header from "./Header";
import Movies from "./Movies";
import "./Page.css";

const Page = () => {
  const [movies, setMovies] = useState<IMovie[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleSearch = async (query: string) => {
    setMovies(null);
    setIsLoading(true);
    try {
      const { data } = await searchMovies(query);
      setMovies(data.data.searchMovies);
    } catch (error) {
      console.log(error); // TODO: handle error
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetRelatedMovies = async (id: string) => {
    setMovies(null);
    setIsLoading(true);
    const { data } = await searchSimilarMovies(id);
    setIsLoading(false);
    setMovies(data.data.movie.similar);
  }

  return (
    <Container maxWidth="sm">
      <Header handleSearch={handleSearch} isLoading={isLoading}/>
      {isLoading && (
        <div className="movies-progress">
          <CircularProgress />
        </div>
      )}
      {movies && movies.length > 0 && (
        <Movies movies={movies} handleGetRelatedMovies={handleGetRelatedMovies} />
      )}
      {movies && movies.length === 0 && (
        <div className="no-results">No results!</div>
      )}
    </Container>
  );
}

export default Page;
