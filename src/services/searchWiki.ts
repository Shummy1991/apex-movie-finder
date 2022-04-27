import axios from "axios";

import { IWiki } from "../types/wiki";

const url = "https://en.wikipedia.org/api/rest_v1/page/summary";

export const searchWiki = async (query: string) => {
    return axios.get<IWiki>(`${url}/${encodeURIComponent(query)}`)
};
