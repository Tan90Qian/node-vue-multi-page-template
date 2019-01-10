import { mount } from '@vue/test-utils';

import MzTable from '../index';

describe('MzTable tests', () => {
  it('should render .mz-table', () => {
    const wrapper = mount(MzTable, {
      propsData: {
        columns: []
      }
    });
    const mzTable = wrapper.find('.mz-table');

    expect(mzTable.exists()).toBe(true);
  });

  it('should render .no-data when dataSource was absent', () => {
    const wrapper = mount(MzTable, {
      propsData: {
        columns: []
      }
    });
    const noData = wrapper.find('.no-data');
    expect(noData.exists()).toBe(true);
  });

  it('should show border and cellspacing when bordered props was true', () => {
    const wrapper = mount(MzTable, {
      propsData: {
        columns: [],
        dataSource: [{}],
        bordered: true
      }
    });
    const table = wrapper.find('table');
    expect(table.attributes('border')).toBe('1');
    expect(table.attributes('cellspacing')).toBeFalsy();
  });

  it('should hide border and cellspacing when bordered props was false or absent', () => {
    const wrapper = mount(MzTable, {
      propsData: {
        columns: [],
        dataSource: [{}]
      }
    });
    const table = wrapper.find('table');
    expect(table.attributes('border')).toBe('0');
    expect(table.attributes('cellspacing')).toBe('0');
  });

  it('should have correct number of th', () => {
    const wrapper = mount(MzTable, {
      propsData: {
        columns: [{ dataIndex: 'a' }, { dataIndex: 'b' }, { dataIndex: 'c' }]
      }
    });
    const thArray = wrapper.findAll('th');

    expect(thArray.length).toBe(3);
  });

  it('should have correct number of tr', () => {
    const wrapper = mount(MzTable, {
      propsData: {
        columns: [],
        dataSource: [{ a: 1 }, { a: 2 }, { a: 3 }]
      }
    });
    const trArray = wrapper.findAll('tr');

    expect(trArray.length).toBe(3);
  });

  it("column's width should act on td's width", () => {
    const wrapper = mount(MzTable, {
      propsData: {
        columns: [
          {
            dataIndex: 'a',
            title: 'a',
            width: 200
          },
          {
            dataIndex: 'b',
            title: 'b'
          }
        ],
        dataSource: [{ a: 1, b: 1 }]
      }
    });
    const tdArray = wrapper.findAll('td');

    expect(tdArray.at(0).attributes('width')).toBe('200');
    expect(tdArray.at(1).attributes('width')).toBeFalsy();
  });
});
