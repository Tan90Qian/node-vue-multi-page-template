<template>
  <div class="mz-table">
    <table :border="bordered ? 1 : 0" :cellspacing="bordered ? undefined : 0">
      <thead>
        <th
          v-for="(column, index) in columns"
          :key="column.key || column.dataIndex || index"
          :width="column.width"
        >
          {{ column.title }}
        </th>
      </thead>
      <tbody>
        <tr
          v-for="(record, rowIndex) in dataSource"
          :key="rowKey ? record[rowKey] : rowIndex"
          :class="
            typeof rowClassName === 'function' ? rowClassName(record, rowIndex) : rowClassName
          "
          :style="{ cursor: typeof onRowClick === 'function' ? 'pointer' : 'default' }"
          @click="typeof onRowClick === 'function' ? onRowClick(record, rowIndex) : undefined;"
        >
          <mz-table-cell
            v-for="(column, colIndex) in columns"
            :key="column.key || column.dataIndex || colIndex"
            :column="column"
            :record="record"
            :index="rowIndex"
          ></mz-table-cell>
        </tr>
      </tbody>
    </table>
    <div v-if="!dataSource || !dataSource.length" class="no-data">暂无数据</div>
  </div>
</template>
<script>
import MzTableCell from './MzTableCell';

export default {
  name: 'MzTable',
  components: {
    MzTableCell
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    dataSource: {
      type: Array,
      default: function () {
        return [];
      }
    },
    rowKey: [String, Number],
    bordered: {
      type: Boolean,
      default: false
    },
    rowClassName: [String, Function],
    onRowClick: Function
  }
};
</script>

<style lang="scss">
.mz-table {
  table {
    width: 100%;
    color: #212121;
    line-height: 58px;
    text-align: center;
    thead {
      background: #d7dbe9;
      font-weight: bold;
      font-size: 18px;
    }
    tbody {
      background: #fff;
      font-size: 16px;
      tr:nth-of-type(odd) {
        background: #f5f5f8;
      }
    }
  }
  .no-data {
    color: #212121;
    line-height: 60px;
    text-align: center;
  }
}
</style>
