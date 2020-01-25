import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { ArticleDetails } from './ArticleDetails'

it("renders correctly", () => {
  const tree = renderer
    .create((<ArticleDetails/>))
    .toJSON();
  expect(tree).toMatchSnapshot();
});

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<ArticleDetails />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });