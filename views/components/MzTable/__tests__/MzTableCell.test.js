/* eslint-disable no-unused-vars */
import { mount } from '@vue/test-utils';
import sinon from 'sinon';

import MzTableCell from '../MzTableCell';

describe('MzTableCell tests', () => {
  let propsData;
  let record;
  beforeEach(() => {
    record = {
      a: 1
    };
    propsData = {
      column: {
        dataIndex: 'a'
      },
      record,
      index: 0
    };
  });
  it('should render simple td by default', () => {
    const wrapper = mount(MzTableCell, {
      propsData
    });
    const td = wrapper.find('td');

    expect(td.exists()).toBeTruthy();
    expect(td.text()).toBe('1');
  });

  it('should add class name from column', () => {
    propsData.column.className = 'test';
    const wrapper = mount(MzTableCell, {
      propsData
    });
    const td = wrapper.find('td');

    expect(td.classes('test')).toBeTruthy();
  });

  it('should set text-align style when align in column', () => {
    propsData.column.align = 'right';
    const wrapper = mount(MzTableCell, {
      propsData
    });
    const td = wrapper.find('td');

    expect(td.html()).toContain('text-align: right');
  });

  it('should set width attribute when width in column', () => {
    propsData.column.width = 300;
    const wrapper = mount(MzTableCell, {
      propsData
    });
    const td = wrapper.find('td');

    expect(td.attributes('width')).toBe('300');
  });

  it('should render content by customRender function', () => {
    propsData.column.customRender = function customRender(val, record, index) {
      const h = this.$createElement;
      return <span class="test">{`${val} - ${index}`}</span>;
    };
    const wrapper = mount(MzTableCell, {
      propsData
    });
    const td = wrapper.find('td');

    expect(td.html()).toContain('<span class="test">1 - 0</span>');
  });

  it('should render null when rowSpan or colSpan equal to 0', () => {
    propsData.column.customRender = function customRender(val, record, index) {
      const h = this.$createElement;
      return {
        children: <span>test</span>,
        attrs: {
          rowSpan: 0
        }
      };
    };
    const wrapper = mount(MzTableCell, {
      propsData
    });
    const td = wrapper.find('td');

    expect(td.exists()).toBeFalsy();
  });

  it('should call onCellClick when td trigger click event', () => {
    propsData.column.onCellClick = (record, e) => {
      console.log(record, e);
    };
    const onCellClickMock = sinon
      .mock(propsData.column)
      .expects('onCellClick')
      .withArgs(record);
    const wrapper = mount(MzTableCell, {
      propsData
    });
    const td = wrapper.find('td');
    td.trigger('click');

    onCellClickMock.verify();
  });
});
