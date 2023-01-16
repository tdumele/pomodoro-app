import React from "react";
import { render } from "@testing-library/react";
import Chrono from "..";

describe("Testing Chrono", () => {
  it("The component exists and is equals to the snapshot", () => {
    const { asFragment } = render(<Chrono />);
    expect(asFragment()).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });
});
