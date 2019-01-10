<template>
  <div class="vue1">
    <span>Vue slot 1s2342</span> <span>{{ test }}</span>
    <MzInput class="extra" value="123"></MzInput>
    <MzTable :dataSource="dataSource" :columns="columns" bordered></MzTable>
  </div>
</template>

<script>
import MzTable from 'components/MzTable/';
import MzTableCell from 'components/MzTable/MzTableCell';
import MzInput from 'components/MzInput/';
export default {
  components: {
    MzTable,
    MzTableCell,
    MzInput
  },
  data() {
    const columns = [
      {
        title: 'a',
        dataIndex: 'a',
        width: 400,
        customRender: (val, record, index) => {
          return <span>{`${val} - ${index}`}</span>;
        }
      },
      {
        title: 'b',
        dataIndex: 'b'
      }
    ];
    return {
      test: 12312,
      columns,
      dataSource: [
        {
          a: 1,
          b: 1
        },
        { a: 2, b: 2 }
      ]
    };
  }
};
</script>

<style scoped>
input::placeholder {
  color: red;
}
.vue1 {
  display: grid;
  margin-top: 30px;

  /* background: linear-gradient(to right, white, black); */
}
</style>
