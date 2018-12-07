<template>
  <div :class="{ pagination: true, center }">
    <ul class="pagination-list">
      <li
        class="pagination-prev"
        title="上一页"
        :data-disabled="cCurrent === 1"
        @click="handlePageChange('prev');"
      >
        {{ prevText || '&lt;' }}
      </li>
      <li
        :class="['pagination-item', value === cCurrent ? 'actived' : '']"
        v-for="value in pageData"
        :key="value"
        :title="value"
        @click="handlePageChange(value);"
      >
        {{ value }}
      </li>
      <li
        class="pagination-next"
        title="下一页"
        :data-disabled="cCurrent === pageData.length"
        @click="handlePageChange('next');"
      >
        {{ nextText || '&gt;' }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
    },
    current: {
      type: Number,
    },
    pageSize: {
      type: Number,
    },
    onChange: {
      type: Function,
    },
    prevText: {
      type: String,
    },
    nextText: {
      type: String,
    },
    center: {
      type: Boolean,
    },
  },
  data() {
    return {
      totalNum: 0,
      currentPage: 1,
      size: 10,
    };
  },
  computed: {
    cTotal() {
      return this.total || this.totalNum;
    },
    cCurrent() {
      return this.current || this.currentPage;
    },
    cSize() {
      return this.pageSize || this.size;
    },
    pageData() {
      const pageNum = Math.ceil(this.cTotal / this.cSize);
      const result = [1];
      for (let i = 2; i <= pageNum; i++) {
        result.push(i);
      }
      return result;
    },
    onChangeValid() {
      return this.onChange && typeof this.onChange === 'function';
    },
  },
  methods: {
    handlePageChange(page) {
      switch (page) {
        case 'prev':
          if (this.cCurrent === 1) break;
          if (this.onChangeValid) {
            this.onChange(this.cCurrent - 1, this.cSize);
          } else {
            this.currentPage -= 1;
          }
          break;
        case 'next':
          if (this.cCurrent === this.pageData.length) break;
          if (this.onChangeValid) {
            this.onChange(this.cCurrent + 1, this.cSize);
          } else {
            this.currentPage += 1;
          }
          break;
        default:
          if (this.onChangeValid) {
            this.onChange(page, this.cSize);
          } else {
            this.currentPage = page;
          }
          break;
      }
    },
  },
};
</script>

<style lang="scss">
.pagination-list {
  .pagination-prev,
  .pagination-item,
  .pagination-next {
    float: left;
    min-width: 40px;
    line-height: 38px;
    font-size: 16px;
    box-sizing: border-box;
    border: 1px solid #858f98;
    margin-right: 20px;
    background: #fff;
    color: #858f98;
    text-align: center;
    user-select: none;
    cursor: pointer;
  }

  .pagination-next {
    margin-right: 0;
  }

  .pagination-item.actived {
    background: #061c67;
    color: #fff;
  }

  .pagination-prev[data-disabled='true'],
  .pagination-next[data-disabled='true'] {
    cursor: not-allowed;
  }

  &::after {
    content: '';
    display: block;
    clear: both;
  }
}
$paginationHeight: 40px;
.pagination.center {
  position: relative;
  height: $paginationHeight;

  .pagination-list {
    position: absolute;
    height: $paginationHeight;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
