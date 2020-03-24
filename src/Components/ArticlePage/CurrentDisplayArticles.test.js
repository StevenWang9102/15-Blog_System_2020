import React from "react";
import { CurrentDisplayArticles } from "./CurrentDisplayArticles";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <CurrentDisplayArticles
        currentDisplayArticle={[]}
        pageName='test'
        userInformation={{}}
        setProfileNavStatus={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
