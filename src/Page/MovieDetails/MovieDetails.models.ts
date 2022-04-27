import { IMovie } from "../../types";

export interface IMovieDetailsProps {
    movie: IMovie;
    handleGetRelatedMovies: (id: string) => void;
}
