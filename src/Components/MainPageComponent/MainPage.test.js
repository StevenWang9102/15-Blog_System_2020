import React from "react";
import renderer from "react-test-renderer";
import { MainPage } from "./MainPage"

it("renders correctly", () => {
  const tree = renderer
    .create(<MainPage></MainPage>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
