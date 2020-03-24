import React from "react";
import { EditButton } from "./EditButton";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <EditButton
        article_slug='test'
        onDeleteArticleClicked={() => {}}
        onEditArticleClicked={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
