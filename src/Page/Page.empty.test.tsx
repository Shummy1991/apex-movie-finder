import "jest";
import { createEvent, fireEvent, render, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import Page from "./Page";

jest.mock("../services/searchMovies", () => ({
    searchMovies: () => ({
        data: {
            data: {
                searchMovies: [],
            },
        },
    }),
}));

afterAll(() => {
    jest.clearAllMocks();
});

describe("MovieDetails", () => {
    it("should handle search", async () => {
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
        
        await act(async () => {
            fireEvent.click(searchButton);
            await waitFor(() => expect(findByText("No results!")).toBeTruthy())
        });
    });
});
