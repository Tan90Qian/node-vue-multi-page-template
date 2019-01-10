<script>
import { isValidElement } from '../_util/prop-util.js';

function isInvalidRenderCellText(text) {
  return (
    text && !isValidElement(text) && Object.prototype.toString.call(text) === '[object Object]'
  );
}

export default {
  name: 'MzTableCell',
  props: {
    record: Object,
    column: Object,
    index: Number
  },
  methods: {
    handleClick(e) {
      const {
        record,
        column: { onCellClick }
      } = this;
      if (onCellClick) {
        onCellClick(record, e);
      }
    }
  },
  render() {
    const { column, record, index } = this;
    const { dataIndex, customRender, className = '' } = column;
    let text;
    let colSpan;
    let rowSpan;
    const tdProps = {
      attrs: {},
      class: className || column.class,
      on: {
        click: this.handleClick
      }
    };
    if (typeof dataIndex === 'string' || typeof dataIndex === 'number') {
      text = record[dataIndex];
    } else if (!dataIndex || dataIndex.length === 0) {
      text = record;
    }
    if (customRender) {
      text = customRender.call(this, text, record, index);
      if (isInvalidRenderCellText(text)) {
        tdProps.attrs = text.attrs;
        colSpan = tdProps.attrs.colSpan;
        rowSpan = tdProps.attrs.rowSpan;
        text = text.children;
      }
    }
    if (isInvalidRenderCellText(text)) {
      text = null;
    }
    if (rowSpan === 0 || colSpan === 0) {
      return null;
    }
    if (column.align) {
      tdProps.style = { textAlign: column.align };
    }
    if (column.width) {
      tdProps.attrs.width = column.width;
    }
    return <td {...tdProps}>{text}</td>;
  }
};
</script>
