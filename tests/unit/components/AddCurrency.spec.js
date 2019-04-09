/* eslint-env jest */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Element from 'element-ui';

import Component from '../../../src/components/AddCurrency.vue';

const localVue = createLocalVue();
localVue.use(Element);

describe('Test AddCurrency component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Component, {
      localVue,
      propsData: {
        selectedCurrency: [{
          currency: 'IDR',
        }],
      },
    });

    wrapper.setData({
      currency: '',
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

  test('success calling setDisabledOption function', () => {
    expect(wrapper.vm.setDisabledOption('IDR')).toEqual(true);
  });

  test('success calling add function', () => {
    wrapper.vm.add();
    expect(wrapper.vm.currency).toEqual('');
  });
});
