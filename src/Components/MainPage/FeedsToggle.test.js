import React from "react";
import { FeedsToggle } from "./FeedsToggle";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <FeedsToggle
        fromPage='test'
        profileNavStatusLeft='test'
        profileNavStatusRight='test'
        loadYourFeedArticles={() => {}}
        setProfileNavStatus={() => {}}
      />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
