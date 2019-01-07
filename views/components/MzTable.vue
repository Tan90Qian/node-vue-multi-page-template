<template>
  <div class="mz-table">
    <div class="mz-table-header">
      <table :border="bordered ? undefined : 0" :cellspacing="bordered ? undefined : 0">
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
        :border="bordered ? undefined : 0"
        :cellspacing="bordered ? undefined : 0"
      >
        <tbody>
          <tr
            v-for="(item, index) in dataSource"
            :key="rowKey ? item[rowKey] : index"
            :class="rowClassName"
            :style="{ cursor: typeof onRowClick === 'function' ? 'pointer' : 'default' }"
            @click="typeof onRowClick === 'function' ? onRowClick(item, index) : undefined;"
          >
            <td
              v-for="(column, index) in columns"
              :key="column.key || column.dataIndex || index"
              :width="column.width"
            >
              {{
                typeof column.render === 'function'
                  ? column.render(item[column.dataIndex], item, index)
                  : item[column.dataIndex]
              }}
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="no-data">暂无数据</div>
    </div>
  </div>
</template>
<script>
export default {
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
    rowKey: {
      type: [String, Number]
    },
    bordered: {
      type: Boolean,
      default: false
    },
    rowClassName: {
      type: String
    },
    onRowClick: {
      type: Function
    }
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
