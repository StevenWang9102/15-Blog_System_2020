import React from 'react';
// import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { ArticleComments } from './ArticleComments'

it("renders correctly", () => {
  const tree = renderer
    .create((<ArticleComments/>))
    .toJSON();
  expect(tree).toMatchSnapshot();
});

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<ArticleDetails />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });