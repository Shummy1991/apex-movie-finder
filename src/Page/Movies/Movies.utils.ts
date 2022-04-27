import { IGenre } from "../../types";

export const getGenres = (genres: IGenre[]) => {
    return genres
        .map(genre => genre.name)
        .join(", ");
};
