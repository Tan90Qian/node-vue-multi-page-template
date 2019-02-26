// import Vue from 'vue';

import { storiesOf } from '@storybook/vue';

storiesOf('UI|Pagination', module)
  .add('基本渲染效果', () => '<pagination></pagination>')
  .add('设置总条数为5', () => '<pagination :total="5"></pagination>')
  .add('设置总条数为10', () => '<pagination :total="10"></pagination>')
  .add('设置总条数为10且每页2条', () => '<pagination :total="10" :pageSize="2"></pagination>')
  .add('居中显示', () => '<pagination center></pagination>')
  .add('默认在第三页', () => '<pagination :total="5" :defaultCurrent="3"></pagination>')
  .add(
    '修改前进和后退的文案',
    () => '<pagination prevText="上一页" nextText="下一页"></pagination>'
  )
  .add('前进和后退不可用时隐藏', () => '<pagination total="3" hideOnDisabled></pagination>');

storiesOf('UI|MzInput', module).add('基本渲染效果', () => '<mz-input></mz-input>');
