import "jest";
import { createEvent, fireEvent, render, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";


import {darkTheme} from "./index";

jest.mock("react-dom/client", () => ({
    createRoot: jest.fn(() => ({
        render: jest.fn()
    })),
}))

describe("Index", () => {
    it("dark theme matches snapshot", () => {
        expect(darkTheme).toMatchSnapshot();
    });
});
