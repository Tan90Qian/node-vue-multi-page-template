import { mount } from '@vue/test-utils';

import EllipsisText, { getStrFullLength, cutStrByFullLength } from '../EllipsisText';

describe('EllipsisText tests', () => {
  let children;

  beforeEach(() => {
    children = '一二，a,';
  });

  it('get full length', () => {
    expect(getStrFullLength('一二，a,')).toEqual(8);
  });
  it('cut str by full length', () => {
    expect(cutStrByFullLength('一二，a,', 7)).toEqual('一二，a');
  });
  it('cut str when length small', () => {
    expect(cutStrByFullLength('一22三', 5)).toEqual('一22');
  });

  it('render empty span when text was empty string', () => {
    const wrapper = mount(EllipsisText, {
      propsData: {
        text: ''
      }
    });
    expect(wrapper.html()).toEqual('<span></span>');
  });

  it('render "<span>一二，a,</span>" when length was 7 and fullWidthRecognition was false', () => {
    const wrapper = mount(EllipsisText, {
      propsData: {
        text: children,
        length: 7,
        fullWidthRecognition: false
      }
    });
    expect(wrapper.html()).toEqual('<span>一二，a,</span>');
  });

  it('render "<span>一二，a</span>" when length was 7 and fullWidthRecognition was true', () => {
    const wrapper = mount(EllipsisText, {
      propsData: {
        text: children,
        length: 7,
        fullWidthRecognition: true
      }
    });
    expect(wrapper.html()).toEqual('<span>一二，a...</span>');
  });
});
