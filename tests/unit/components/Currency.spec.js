/* eslint-env jest */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Element from 'element-ui';

import Component from '../../../src/components/Currency.vue';

const localVue = createLocalVue();
localVue.use(Element);

describe('test Currency component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Component, {
      localVue,
      propsData: {
        data: {
          currency: 'IDR',
          detail: 'IDR - Indonesian Rupiah',
          value: 14000,
        },
        index: 0,
        amount: '10000',
        remove: jest.fn(),
        round: num => +(`${Math.round(`${num}e+2`)}e-2`),
      },
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

  test('success calling getRate function', () => {
    wrapper.vm.getRate('10000', 14000);
  });
});
