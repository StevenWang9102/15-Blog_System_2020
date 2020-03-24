import React from "react";
import { LoggedUserNav } from "./LoggedUserNav";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <LoggedUserNav
        getUserInformationLocal={() => {}}
        postedArticleReloaded={() => {}}
        loadUserProfileDetail={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
