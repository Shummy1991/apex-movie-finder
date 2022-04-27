import "jest";
import { fireEvent, render } from "@testing-library/react";

import { mockMovie } from "../../test/movie";

import Movies from "./Movies";

const defaultProps = {
    movies: [mockMovie],
    handleGetRelatedMovies: jest.fn(),
};

afterAll(() => {
    jest.clearAllMocks();
})

describe("MovieDetails", () => {
    it("matches snapshot", () => {
        const { asFragment } = render(<Movies {...defaultProps} />)
        const component = asFragment();
        expect(component).toMatchSnapshot();
    });

    it("title is clickable", async () => {
        const { findByText } = render(<Movies {...defaultProps} />)
        const component = await findByText(mockMovie.name);
        fireEvent.click(component);
    });
});
