import "@testing-library/jest-dom";

import { screen, within } from "@testing-library/react";
import React from "react";

import { Field } from "@/components/Field";
import { renderWithProviders } from "@/utils/helpers/test-utils";

test("should render field of 100 buttons", () => {
	renderWithProviders(<Field />);
	const element = screen.getByTestId("field");
	const buttons = within(element).getAllByRole("button");
	expect(buttons).toHaveLength(100);
});
