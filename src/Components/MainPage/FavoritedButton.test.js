import React from "react";
import { FavoritedButton } from "./FavoritedButton";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <FavoritedButton
        userInformation={{}}
        article={{}}
        onFavoritedArticleClicked={() => {}}
        setHttpMethod={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
