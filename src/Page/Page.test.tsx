import "jest";
import { createEvent, fireEvent, render, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { mockMovie } from "../test/movie";

import Page from "./Page";

jest.mock("../services/searchMovies", () => ({
    searchMovies: () => ({
        data: {
            data: {
                searchMovies: [mockMovie],
            },
        },
    }),
}));

jest.mock("../services/searchSimilarMovies", () => ({
    searchSimilarMovies: () => ({
        data: {
            data: {
                movie: {
                    similar: [mockMovie],
                },
            },
        },
    }),
}));

afterAll(() => {
    jest.clearAllMocks();
});

describe("MovieDetails", () => {
    it("matches snapshot", () => {
        const { asFragment } = render(<Page />)
        const component = asFragment();
        expect(component).toMatchSnapshot();
    });
    it("should handle search, fetching related movies", async () => {
        const { findByText, findAllByLabelText } = render(<Page />);
        const [textField] = await findAllByLabelText("Enter a movie title");
        const value = "the batman";
        fireEvent.change(
            textField,
            createEvent("input", textField, {
                target: {
                    value,
                }
            })
        );
        const searchButton = await findByText("Search");
        
        act(() => {
            fireEvent.click(searchButton);
        });
        const title = await findByText(mockMovie.name);
        await act(async () => {
            fireEvent.click(title);
            await waitFor(() => expect(findByText("Related movies")).toBeTruthy());
        });
        const related = await findByText("Related movies");
        fireEvent.click(related);
    });
});
