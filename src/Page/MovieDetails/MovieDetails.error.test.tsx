import "jest";
import { render, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { mockMovie } from "../../test/movie";

import MovieDetails from "./MovieDetails";

const defaultProps = {
    movie: mockMovie,
    handleGetRelatedMovies: jest.fn(),
};

jest.mock("../../services/searchWiki", () => ({
    searchWiki: () => {
        throw new Error("404 error")
    }
}));

afterAll(() => {
    jest.clearAllMocks();
})

describe("MovieDetails error", () => {
    it("handles wikipedia error", async () => {
        let component: DocumentFragment | undefined = undefined;
        const { asFragment, findByText } = render(<MovieDetails {...defaultProps} />)
        await act(async () => {
            component = asFragment();
            await waitFor(() => expect(findByText("Related movies")).toBeTruthy());
        });
    });
});
