import { assert } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import App from './App';

describe('Test the root App component', function () {

  it('should render the app', function () {
    const wrapper = shallow(<App />);
    assert.isOk(wrapper.html());
  });

});
