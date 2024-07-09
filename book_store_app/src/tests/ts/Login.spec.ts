import { mount } from '@vue/test-utils';
import {expect,describe,it} from '@jest/globals';
import Login from '../../src/components/user/Login.vue';

describe('Login.vue', () => {
  console.log('Helooooooooooooooooooooooooooo');
  
  it('should have data as a function', () => {
    expect(typeof Login.data).toBe('function');
  });

  it('should have default data with show set to true', () => {
    const wrapper = mount(Login);
    expect(wrapper.vm.show).toBe(true);
  });
});