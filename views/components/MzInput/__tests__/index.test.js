import { mount } from '@vue/test-utils';
import Vue from 'vue';

import MzInput from '../index';

describe('MzInput tests', () => {
  /* input tests */
  it('render input', () => {
    const wrapper = mount(MzInput);

    expect(wrapper.contains('input')).toBe(true);
  });

  it('should render password input when type was password', () => {
    const wrapper = mount(MzInput, {
      propsData: {
        type: 'password'
      }
    });
    const input = wrapper.find({ ref: 'input' });

    expect(input.attributes('type')).toBe('password');
  });

  it('should set placeholder on input', () => {
    const wrapper = mount(MzInput, {
      propsData: {
        placeholder: 'please'
      }
    });
    const input = wrapper.find({ ref: 'input' });

    expect(input.attributes('placeholder')).toBe('please');
  });

  it('input should has data-test attr', () => {
    const wrapper = mount(MzInput, {
      attrs: {
        'data-test': '123'
      }
    });
    const input = wrapper.find({ ref: 'input' });

    expect(input.attributes('data-test')).toBe('123');
  });

  it('should emit onFocus event when input focus', () => {
    const wrapper = mount(MzInput);
    const input = wrapper.find({ ref: 'input' });
    input.trigger('focus');

    expect(wrapper.emitted().onFocus).toBeTruthy();
  });

  it('should emit onBlur event when input blur', () => {
    const wrapper = mount(MzInput);
    const input = wrapper.find({ ref: 'input' });
    input.trigger('blur');

    expect(wrapper.emitted().onBlur).toBeTruthy();
  });

  it('should emit onFocus once mounted when autoFocus given', () => {
    const wrapper = mount(MzInput, {
      propsData: {
        autoFocus: true
      }
    });

    return Vue.nextTick().then(() => {
      expect(wrapper.emitted().onFocus).toBeTruthy();
    });
  });

  /* slot tests */
  it('should not render prefix div when prefix slot absent', () => {
    const wrapper = mount(MzInput);

    expect(wrapper.contains('.mz-input-prefix')).toBe(false);
  });

  it('should render prefix div when prefix slot given', () => {
    const wrapper = mount(MzInput, {
      slots: {
        prefix: ['<i>123</i>']
      }
    });

    expect(wrapper.html()).toContain('<span class="mz-input-prefix"><i>123</i></span>');
  });

  it('should not render suffix div when suffix slot absent', () => {
    const wrapper = mount(MzInput);

    expect(wrapper.contains('.mz-input-suffix')).toBe(false);
  });

  it('should render suffix div when suffix slot given', () => {
    const wrapper = mount(MzInput, {
      slots: {
        suffix: ['<i>123</i>']
      }
    });

    expect(wrapper.html()).toContain('<span class="mz-input-suffix"><i>123</i></span>');
  });
});
