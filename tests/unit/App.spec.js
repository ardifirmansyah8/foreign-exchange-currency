/* eslint-env jest */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Element from 'element-ui';

import axios from 'axios';
import Component from '../../src/App.vue';

const localVue = createLocalVue();
localVue.use(Element);

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({
    data: {
      rates: {
        IDR: 1000,
      },
    },
  })),
}));

describe('Test App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Component, {
      localVue,
    });

    wrapper.setData({
      amount: '0',
      selectedCurrency: [],
      rates: {},
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

  test('success calling roundNum function', () => {
    expect(wrapper.vm.roundNum(100.56888)).toEqual(100.57);
  });

  test('success calling setAmount function', () => {
    wrapper.vm.setAmount('1,000');
    expect(wrapper.vm.amount).toEqual('1000');
  });

  test('success calling getCurrency function', () => {
    wrapper.vm.getCurrency();
    expect(axios.get).toBeCalledWith('https://api.exchangeratesapi.io/latest?base=USD');
  });

  test('success calling addCurrency function', () => {
    const mock = {
      label: 'IDR',
      detail: 'IDR - Indonesian Rupiah',
      value: 'IDR',
    };
    wrapper.vm.addCurrency(mock);
    expect(wrapper.vm.selectedCurrency).toEqual([{
      currency: mock.label,
      detail: mock.detail,
      value: 1000,
    }]);
  });

  test('success calling removeCurrency function', () => {
    wrapper.vm.removeCurrency();
    expect(wrapper.vm.selectedCurrency).toEqual([]);
  });
});
