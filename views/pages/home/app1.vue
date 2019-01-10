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

const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    attrs: {}
  };
  if (index === 4) {
    obj.attrs.colSpan = 0;
  }
  return obj;
};

export default {
  components: {
    MzTable,
    MzTableCell,
    MzInput
  },
  data() {
    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        tel: '0571-22098909',
        phone: 18889898989,
        address: 'New York No. 1 Lake Park'
      },
      {
        key: '2',
        name: 'Jim Green',
        tel: '0571-22098333',
        phone: 18889898888,
        age: 42,
        address: 'London No. 1 Lake Park'
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        tel: '0575-22098909',
        phone: 18900010002,
        address: 'Sidney No. 1 Lake Park'
      },
      {
        key: '4',
        name: 'Jim Red',
        age: 18,
        tel: '0575-22098909',
        phone: 18900010002,
        address: 'London No. 2 Lake Park'
      },
      {
        key: '5',
        name: 'Jake White',
        age: 18,
        tel: '0575-22098909',
        phone: 18900010002,
        address: 'Dublin No. 2 Lake Park'
      }
    ];
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        customRender: (text, row, index) => {
          if (index < 4) {
            return <a href="javascript:;">{text}</a>;
          }
          return {
            children: <a href="javascript:;">{text}</a>,
            attrs: {
              colSpan: 5
            }
          };
        }
      },
      {
        title: 'Age',
        dataIndex: 'age',
        customRender: renderContent
      },
      {
        title: 'Home phone',
        colSpan: 2,
        dataIndex: 'tel',
        customRender: (value, row, index) => {
          const obj = {
            children: value,
            attrs: {}
          };
          if (index === 2) {
            obj.attrs.rowSpan = 2;
          }
          // These two are merged into above cell
          if (index === 3) {
            obj.attrs.rowSpan = 0;
          }
          if (index === 4) {
            obj.attrs.colSpan = 0;
          }
          return obj;
        }
      },
      {
        title: 'Phone',
        colSpan: 0,
        dataIndex: 'phone',
        customRender: renderContent
      },
      {
        title: 'Address',
        dataIndex: 'address',
        customRender: renderContent
      }
    ];
    return {
      test: 12312,
      columns,
      dataSource: data
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
