import axios from "axios";

import { graphUrl } from "../config";
import { IMovie } from "../types";

import { movieProperties } from "./movieProperties";

interface ISearchMovie {
    data: {
        movie: {
            similar: IMovie[];
        }
    }
}

export const searchSimilarMovies = async (id: string) => {
    return axios.post<ISearchMovie>(graphUrl, {
        query: `
            query getMovie {
                movie(id: "${id}") {
                    similar {
                        ... on Movie {
                            ${movieProperties}
                        }
                    }
                }
            }
        `,
    });
};
