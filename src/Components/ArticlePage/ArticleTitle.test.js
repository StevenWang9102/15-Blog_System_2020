import React from "react";
import { ArticleTitle } from "./ArticleTitle";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <ArticleTitle
        article={{}}
        pageName='test'
        setProfileNavStatus={() => {}}
        loadUserProfileDetail={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
