import { shallowMount } from '@vue/test-utils';

import { getStrFullLength, cutStrByFullLength } from 'components/Ellipsis/EllipsisText';

import Ellipsis from 'components/Ellipsis/';

describe('Ellipsis tests', () => {
  it('get full length', () => {
    expect(getStrFullLength('一二，a,')).toEqual(8);
  });
  it('cut str by full length', () => {
    expect(cutStrByFullLength('一二，a,', 7)).toEqual('一二，a');
  });
  it('cut str when length small', () => {
    expect(cutStrByFullLength('一22三', 5)).toEqual('一22');
  });

  it('should render span when absent lines and length', () => {
    const wrapper = shallowMount(Ellipsis, {
      slots: {
        default: ['test']
      }
    });
    expect(wrapper.html()).toEqual('<span class="ellipsis">test</span>');
  });
});
