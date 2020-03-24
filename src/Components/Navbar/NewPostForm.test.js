import React from "react";
import { NewPostForm } from "./NewPostForm";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <NewPostForm
        title='test'
        description='test'
        content='test'
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
