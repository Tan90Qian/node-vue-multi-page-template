import { mount } from '@vue/test-utils';

import Pagination from '../index';

describe('Pagination tests', () => {
  /* render test */
  it('should render ul and at least one li', () => {
    const wrapper = mount(Pagination);

    expect(wrapper.contains('.pagination-list')).toBe(true);
    expect(wrapper.contains('li')).toBe(true);
  });

  it('should set stateCurrent with defaultCurrent when current absent', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        defaultCurrent: 10,
        total: 10
      }
    });

    expect(wrapper.vm.stateCurrent).toBe(10);
  });

  it('should compute correct page number', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 10,
        pageSize: 3
      }
    });

    expect(wrapper.vm.pageData).toEqual([1, 2, 3, 4]);
  });

  it('initial stateCurrent could not less than 1', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        defaultCurrent: -1
      }
    });

    expect(wrapper.vm.stateCurrent).toBe(1);
  });

  it('initial stateCurrent could not more than page number', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        defaultCurrent: 10,
        total: 10,
        pageSize: 2
      }
    });

    expect(wrapper.vm.stateCurrent).toBe(5);
  });

  it('should add center class on the wrapper', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        center: true
      }
    });

    expect(wrapper.classes()).toContain('center');
  });

  it('should have prev and next item by default', () => {
    const wrapper = mount(Pagination);
    const prev = wrapper.find('.pagination-prev');
    const next = wrapper.find('.pagination-next');

    expect(prev.exists()).toBe(true);
    expect(prev.text()).toBe('&lt;');
    expect(next.exists()).toBe(true);
    expect(next.text()).toBe('&gt;');
  });

  it("should change prev and next item's text", () => {
    const wrapper = mount(Pagination, {
      propsData: {
        prevText: '上一页',
        nextText: '下一页'
      }
    });
    const prev = wrapper.find('.pagination-prev');
    const next = wrapper.find('.pagination-next');

    expect(prev.text()).toBe('上一页');
    expect(next.text()).toBe('下一页');
  });

  it('prev item should have data-disabled attr when stateCurrent equals to 1', () => {
    const wrapper = mount(Pagination);
    const prev = wrapper.find('.pagination-prev');

    expect(prev.attributes('data-disabled')).toBeTruthy();
  });

  it('next item should have data-disabled attr when stateCurrent equals to page number', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 2,
        defaultCurrent: 2
      }
    });
    const next = wrapper.find('.pagination-next');

    expect(next.attributes('data-disabled')).toBeTruthy();
  });

  it('should hide prev item when stateCurrent equals to 1 and hideOnDisabled is true', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        hideOnDisabled: true
      }
    });
    const prev = wrapper.find('.pagination-prev');

    expect(prev.exists()).toBe(false);
  });

  it('should hide next item when stateCurrent equals to page number and hideOnDisabled is true', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        hideOnDisabled: true,
        total: 2,
        defaultCurrent: 2
      }
    });
    const next = wrapper.find('.pagination-next');

    expect(next.exists()).toBe(false);
  });

  it('item which value equals to stateCurrent should have actived class', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 10,
        defaultCurrent: 5
      }
    });
    const activedItemArray = wrapper.findAll('.actived');
    const activedItem = activedItemArray.at(0);

    expect(activedItemArray.length).toBe(1);
    expect(activedItem.text()).toBe('5');
  });

  it('should have correct item number when page number less than 6', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 5
      }
    });
    const itemArray = wrapper.findAll('.pagination-item');

    expect(itemArray.length).toBe(5);
  });

  it(`should have correct item number when page number more than 5
      and stateCurrent less than 4`, () => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 10,
        defaultCurrent: 3
      }
    });
    const itemArray = wrapper.findAll('.pagination-item');
    const left = wrapper.find('.left');
    const right = wrapper.find('.right');

    expect(itemArray.length).toBe(7);
    expect(left.exists()).toBe(false);
    expect(right.exists()).toBe(true);
  });

  it(`should have correct item number when page number more than 5
      and stateCurrent more than (page number - 3)`, () => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 10,
        defaultCurrent: 8
      }
    });
    const itemArray = wrapper.findAll('.pagination-item');
    const left = wrapper.find('.left');
    const right = wrapper.find('.right');

    expect(itemArray.length).toBe(7);
    expect(left.exists()).toBe(true);
    expect(right.exists()).toBe(false);
  });

  it(`should have correct item number when [page number more than 5]
      and [stateCurrent between 4 and (page number - 3)]`, () => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 10,
        defaultCurrent: 5
      }
    });
    const itemArray = wrapper.findAll('.pagination-item');
    const left = wrapper.find('.left');
    const right = wrapper.find('.right');

    expect(itemArray.length).toBe(9);
    expect(itemArray.at(2).text()).toBe('3');
    expect(itemArray.at(6).text()).toBe('7');
    expect(left.exists()).toBe(true);
    expect(right.exists()).toBe(true);
  });

  /* interaction test start */

  it('click next will increase current props', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 3,
        current: 1
      },
      listeners: {
        change(page) {
          wrapper.setProps({
            current: page
          });
        }
      }
    });
    const next = wrapper.find('.pagination-next');
    next.trigger('click');

    expect(wrapper.vm.stateCurrent).toBe(2);
  });

  it('click prev will reduce current props', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 3,
        current: 3
      },
      listeners: {
        change(page) {
          wrapper.setProps({
            current: page
          });
        }
      }
    });
    const prev = wrapper.find('.pagination-prev');
    prev.trigger('click');

    expect(wrapper.vm.stateCurrent).toBe(2);
  });

  it('click item will change current to correct value', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 5,
        current: 1
      },
      listeners: {
        change(page) {
          wrapper.setProps({
            current: page
          });
        }
      }
    });
    const target = wrapper.findAll('.pagination-item').at(3);
    target.trigger('click');

    expect(wrapper.vm.stateCurrent).toBe(4);
  });

  it('click actived item will not emit change event', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 5,
        current: 2
      }
    });
    const actived = wrapper.find('.actived');
    actived.trigger('click');

    expect(wrapper.emitted('change')).toBeFalsy();
  });

  it('click left will change current to correct value', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 10,
        current: 7
      },
      listeners: {
        change(page) {
          wrapper.setProps({
            current: page
          });
        }
      }
    });
    let left = wrapper.find('.left');
    let actived;

    left.trigger('click');
    actived = wrapper.find('.actived');
    expect(actived.text()).toBe('2');

    wrapper.setProps({ current: 5 });
    left = wrapper.find('.left');
    left.trigger('click');
    actived = wrapper.find('.actived');
    expect(actived.text()).toBe('1');
  });

  it('click right will change current to correct value', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 10,
        current: 2
      },
      listeners: {
        change(page) {
          wrapper.setProps({
            current: page
          });
        }
      }
    });
    let right = wrapper.find('.right');
    let actived;

    right.trigger('click');
    actived = wrapper.find('.actived');
    expect(actived.text()).toBe('7');

    wrapper.setProps({ current: 6 });
    right = wrapper.find('.right');
    right.trigger('click');
    actived = wrapper.find('.actived');
    expect(actived.text()).toBe('10');
  });
});
