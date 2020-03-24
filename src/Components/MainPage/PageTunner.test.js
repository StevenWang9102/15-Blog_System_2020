import React from "react";
import { PageTunner } from "../MainPage/PageTunner";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <PageTunner
        articlesAllCount={0}
        fromPage='test'
        loadUserProfileDetail={() => {}}
        loadGlobalFeeds={() => {}}
        onFavoritedArticleNavClicked={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
