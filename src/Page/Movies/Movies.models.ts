import { IMovie } from "../../types";

export interface IMoviesProps {
    movies: IMovie[];
    handleGetRelatedMovies: (id: string) => void;
}
