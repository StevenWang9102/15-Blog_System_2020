import React from "react";
import { PublicComments } from "./PublicComments";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <PublicComments
        currentComments={{}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
