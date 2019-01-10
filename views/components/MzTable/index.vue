<template>
  <div class="mz-table">
    <div class="mz-table-header">
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
      </table>
    </div>
    <div class="mz-table-body">
      <table
        v-if="dataSource.length"
        :border="bordered ? 1 : 0"
        :cellspacing="bordered ? undefined : 0"
      >
        <tbody>
          <tr
            v-for="(record, index) in dataSource"
            :key="rowKey ? record[rowKey] : index"
            :class="typeof rowClassName === 'function' ? rowClassName(record, index) : rowClassName"
            :style="{ cursor: typeof onRowClick === 'function' ? 'pointer' : 'default' }"
            @click="typeof onRowClick === 'function' ? onRowClick(record, index) : undefined;"
          >
            <mz-table-cell
              v-for="(column, index) in columns"
              :key="column.key || column.dataIndex || index"
              :column="column"
              :record="record"
              :index="index"
            ></mz-table-cell>
          </tr>
        </tbody>
      </table>
      <div v-else class="no-data">暂无数据</div>
    </div>
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
