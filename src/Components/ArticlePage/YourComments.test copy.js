import React from "react";
import { YourComments } from "./YourComments";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <YourComments
        userInformation='test'
        currentSlug='test'
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
