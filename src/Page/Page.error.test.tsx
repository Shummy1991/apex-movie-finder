import "jest";
import { createEvent, fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import Page from "./Page";

jest.mock("../services/searchMovies", () => ({
    searchMovies: () => {
        throw new Error("404 error")
    },
}));

afterAll(() => {
    jest.clearAllMocks();
});

describe("MovieDetails error", () => {
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
        
        act(() => {
            fireEvent.click(searchButton);
        });
    });
});
