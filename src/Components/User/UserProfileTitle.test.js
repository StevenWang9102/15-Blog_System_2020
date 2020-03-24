import React from "react";
import { UserProfileTitle } from "./UserProfileTitle";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <UserProfileTitle
        userInformation={{}}
        author_name='test'
        currentProfileDetail={{}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
