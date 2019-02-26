import { shallowMount } from '@vue/test-utils';

import Ellipsis from '../index';

describe('Ellipsis tests', () => {
  let children;

  beforeEach(() => {
    children = '一二，a,';
  });
  /* snapshot test */
  test('renders correctly', () => {
    const wrapper = shallowMount(Ellipsis, {
      slots: {
        default: [children]
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  /* render test */
  it('render span when absent lines and length', () => {
    const wrapper = shallowMount(Ellipsis, {
      slots: {
        default: [children]
      }
    });
    expect(wrapper.html()).toEqual(`<span class="ellipsis">${children}</span>`);
  });

  it('render empty span when children was absent', () => {
    const wrapper = shallowMount(Ellipsis);
    expect(wrapper.html()).toEqual('<span class="ellipsis"></span>');
  });

  it('render EllipsisText when lines was absent', () => {
    const wrapper = shallowMount(Ellipsis, {
      propsData: {
        length: 10
      }
    });
    expect(wrapper.html().toLowerCase()).toContain('EllipsisText'.toLowerCase());
  });

  it('render EllipsisText when lines was absent', () => {
    const wrapper = shallowMount(Ellipsis, {
      propsData: {
        length: 10
      }
    });
    expect(wrapper.html().toLowerCase()).toContain('EllipsisText'.toLowerCase());
  });
});
