/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {render, fireEvent} from '@testing-library/react-native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('App works properly', () => {
  const {getByPlaceholderText, getByText} = render(<App />);

  it('renders correctly', () => {
    renderer.create(<App />);
  });

  it('should render searching notice while typing', () => {
    const searchInput = getByPlaceholderText('Search books...');

    fireEvent.changeText(searchInput, 'abcdefg');

    const searchingNotice = getByText('Searching...');

    expect(searchingNotice).not.toBeNull();
  });
});
