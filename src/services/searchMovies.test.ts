import "jest";

import { mockMovie } from "../test/movie";

import { searchMovies } from "./searchMovies";

jest.mock("axios", () => ({
    post: () => mockMovie,
}));

afterAll(() => {
    jest.clearAllMocks();
});

describe("searchMovies", () => {
    it("called", async () => {
        const data = await searchMovies('the batman');
        expect(data).toEqual(mockMovie);
    });
});
