import React from 'react';
import { ArticleContent } from './ArticleContent';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<ArticleContent currentArticleDetails={{}}/>).toJSON();
  expect(tree).toMatchSnapshot();
});