/* eslint-env jest */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Element from 'element-ui';

import Component from '../../../src/components/Amount.vue';

const localVue = createLocalVue();
localVue.use(Element);

describe('Test Amount component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Component, {
      localVue,
    });

    wrapper.setData({
      amountValue: '0',
    });
  });

  afterAll(() => {
    if (wrapper) {
      wrapper.destroy();
    }
  });

  test('success mounting components', () => {
    expect(wrapper).toBeTruthy();
  });

  test('success calling isNumber function', () => {
    // CASE #1
    let mock;
    mock = {
      which: 32,
      preventDefault: jest.fn(),
    };
    wrapper.vm.isNumber(mock);
    expect(mock.preventDefault).toBeCalled();

    // CASE #2
    mock = {
      which: null,
      keyCode: 32,
      preventDefault: jest.fn(),
    };
    wrapper.vm.isNumber(mock);
    expect(mock.preventDefault).toBeCalled();

    // CASE #3
    mock = {
      which: null,
      keyCode: 58,
      preventDefault: jest.fn(),
    };
    wrapper.vm.isNumber(mock);
    expect(mock.preventDefault).toBeCalled();

    // CASE #4
    mock = {
      which: null,
      keyCode: 46,
    };
    expect(wrapper.vm.isNumber(mock)).toEqual(true);
  });
});
