import React from 'react';
import renderer from 'react-test-renderer';
import { MainPage } from '../Components/MainPageComponent/MainPage'

it('renders main page correctly', () => {
  const tree = renderer
    .create(<MainPage/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

// 如何调这snapshot的？
// 在哪里显示报错？