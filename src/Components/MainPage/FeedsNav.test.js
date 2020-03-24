import React from "react";
import { FeedsNav } from "./FeedsNav";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <FeedsNav
        navName='test'
        author_name='test'
        userInformation={{}}
        popularNavClean={() => {}}
        loadGlobalFeeds={() => {}}
        loadUserProfileDetail={() => {}}
        setProfileNavStatus={() => {}}
        setHomeNavStatus={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
