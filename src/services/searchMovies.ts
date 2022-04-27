import axios from "axios"

import { graphUrl } from "../config";
import { IMovie } from "../types";

import { movieProperties } from "./movieProperties";

interface ISearchMovie {
    data: {
        searchMovies: IMovie[];
    }
}

export const searchMovies = async (query: string) => {
    return axios.post<ISearchMovie>(graphUrl, {
        query: `
            query SearchMovies {
                searchMovies(query: "${query}") {
                    ${movieProperties}
                }
            }
        `,
    });
};
