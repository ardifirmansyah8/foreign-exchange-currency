/* eslint-env jest */
import { shallowMount, createLocalVue } from '@vue/test-utils';

import Component from '../../src/App.vue';

const localVue = createLocalVue();

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Component, {
      localVue,
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
});
