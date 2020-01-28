import React from "react";
import renderer from "react-test-renderer";
import { ArticlePreview } from "./ArticlePreview"

it("renders correctly", () => {
  const tree = renderer
    .create(<ArticlePreview></ArticlePreview>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
