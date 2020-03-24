import React from "react";
import { UnLoggedNav } from "./UnLoggedNav";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <UnLoggedNav/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
