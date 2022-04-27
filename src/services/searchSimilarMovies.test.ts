import "jest";

import { mockMovie } from "../test/movie";

import { searchSimilarMovies } from "./searchSimilarMovies";

jest.mock("axios", () => ({
    post: () => mockMovie,
}));

afterAll(() => {
    jest.clearAllMocks();
});

describe("searchSimilarMovies", () => {
    it("called", async () => {
        const data = await searchSimilarMovies('my_id');
        expect(data).toEqual(mockMovie);
    });
});
