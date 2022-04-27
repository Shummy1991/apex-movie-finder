import "jest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { mockMovie } from "../../test/movie";

import MovieDetails from "./MovieDetails";
import { mockWiki } from "../../test/wiki";

const defaultProps = {
    movie: mockMovie,
    handleGetRelatedMovies: jest.fn(),
};

jest.mock("../../services/searchWiki", () => ({
    searchWiki: () => mockWiki,
}));

afterAll(() => {
    jest.clearAllMocks();
})

describe("MovieDetails", () => {
    it("matches snapshot", () => {
        const { asFragment } = render(<MovieDetails {...defaultProps} />)
        const component = asFragment();
        expect(component).toMatchSnapshot();
    })
    it("renders Wikipedia, calls related movies on desktop", async () => {
        window = Object.assign(window, { innerWidth: 1024 });
        const { asFragment, findByText } = render(<MovieDetails {...defaultProps} />)
        await act(async () => {
            asFragment();
            await waitFor(() => expect(findByText("Wikipedia")).toBeTruthy());
        });
        const relatedButton = await findByText("Related movies");
        fireEvent.click(relatedButton);
        expect(defaultProps.handleGetRelatedMovies).toBeCalled();
    });
    it("work on mobile", async () => {
        let component: DocumentFragment | undefined = undefined;
        window = Object.assign(window, { innerWidth: 475 });

        const { asFragment, findByText } = render(<MovieDetails {...defaultProps} />)
        await act(async () => {
            component = asFragment();
            await waitFor(() => expect(findByText("Wikipedia")).toBeTruthy());
        });
    });
});
