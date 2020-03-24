import React from "react";
import { SignInOptions } from "./SignInOptions";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <SignInOptions/>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
