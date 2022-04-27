import "jest";
import { createEvent, fireEvent, render } from "@testing-library/react";

import Header from "./Header";

const defaultProps = {
    handleSearch: jest.fn(),
    isLoading: false,
};

describe("Header", () => {
    it("matches snapshot", () => {
        const { asFragment } = render(<Header {...defaultProps} />)
        expect(asFragment()).toMatchSnapshot();
    });
    it("input changes value on change", async () => {
        const { findAllByLabelText, asFragment } = render(<Header {...defaultProps} />)
        const [textField] = await findAllByLabelText("Enter a movie title");
        fireEvent.change(
            textField,
            createEvent("input", textField, {
                target: {
                    value: "asdf"
                }
            })
        );
        expect(asFragment()).toMatchSnapshot();
    });
    it("enter key press triggers submit", async () => {
        const { findAllByLabelText } = render(<Header {...defaultProps} />)
        const [textField] = await findAllByLabelText("Enter a movie title");
        fireEvent.keyPress(textField, { key: "Enter", code: "Enter", charCode: 13 });
        expect(defaultProps.handleSearch).not.toBeCalled();

        const value = "asdf";
        fireEvent.change(
            textField,
            createEvent("input", textField, {
                target: {
                    value,
                }
            })
        );
        fireEvent.keyPress(textField, { key: "A", code: "A", charCode: 97 });
        expect(defaultProps.handleSearch).not.toBeCalled();
        fireEvent.keyPress(textField, { key: "Enter", code: "Enter", charCode: 13 });
        expect(defaultProps.handleSearch).toBeCalledWith(value);
    });
});
