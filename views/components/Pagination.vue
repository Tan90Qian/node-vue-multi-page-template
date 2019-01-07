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
      <template v-if="pageData.length <= 5">
        <li
          :class="['pagination-item', value === cCurrent ? 'actived' : '']"
          v-for="value in pageData"
          :key="value"
          :title="value"
          @click="handlePageChange(value);"
        >
          {{ value }}
        </li>
      </template>
      <template v-else>
        <li
          :class="['pagination-item', cCurrent == 1 ? 'actived' : '']"
          :title="1"
          @click="handlePageChange(1);"
        >
          1
        </li>
        <li v-if="cCurrent >= 5" class="pagination-item" @click="handlePageChange('left');">...</li>
        <li
          :class="['pagination-item', value === cCurrent ? 'actived' : '']"
          v-for="value in showedPage"
          :key="value"
          :title="value"
          @click="handlePageChange(value);"
        >
          {{ value }}
        </li>
        <li
          v-if="cCurrent <= pageData.length - 4"
          class="pagination-item"
          @click="handlePageChange('right');"
        >
          ...
        </li>
        <li
          :class="['pagination-item', cCurrent == pageData.length ? 'actived' : '']"
          :title="pageData.length"
          @click="handlePageChange(pageData.length);"
        >
          {{ pageData.length }}
        </li>
      </template>
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
      type: Number
    },
    current: {
      type: Number
    },
    pageSize: {
      type: Number
    },
    onChange: {
      type: Function
    },
    prevText: {
      type: String
    },
    nextText: {
      type: String
    },
    center: {
      type: Boolean
    }
  },
  data() {
    return {
      totalNum: 0,
      currentPage: 1,
      size: 10
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
    showedPage() {
      const { cCurrent, pageData } = this;
      if (cCurrent <= 3) {
        return pageData.slice(1, 5);
      } if (cCurrent >= pageData.length - 2) {
        return pageData.slice(-5, -1);
      }
      return pageData.slice(cCurrent - 3, cCurrent + 2);
    },
    onChangeValid() {
      return this.onChange && typeof this.onChange === 'function';
    }
  },
  methods: {
    handlePageChange(page) {
      const { cCurrent, pageData, onChange, cSize, onChangeValid } = this;
      let target;
      switch (page) {
        case 'prev':
          if (cCurrent === 1) break;
          if (onChangeValid) {
            onChange(cCurrent - 1, cSize);
          } else {
            this.currentPage -= 1;
          }
          break;
        case 'next':
          if (cCurrent === pageData.length) break;
          if (onChangeValid) {
            onChange(cCurrent + 1, cSize);
          } else {
            this.currentPage += 1;
          }
          break;
        case 'left':
          target = cCurrent - 5;
          if (target < 1) target = 1;
          if (onChangeValid) {
            onChange(target, cSize);
          } else {
            this.currentPage = target;
          }
          break;
        case 'right':
          target = cCurrent + 5;
          if (target > pageData.length) target = pageData.length;
          if (onChangeValid) {
            onChange(target, cSize);
          } else {
            this.currentPage = target;
          }
          break;
        default:
          if (onChangeValid) {
            onChange(page, cSize);
          } else {
            this.currentPage = page;
          }
          break;
      }
    }
  }
};
</script>

<style lang="scss">
.pagination-list {
  .pagination-prev,
  .pagination-item,
  .pagination-next {
    float: left;
    box-sizing: border-box;
    min-width: 40px;
    padding: 0 13px;
    border: 1px solid #858f98;
    margin-right: 5px;
    color: #858f98;
    background: #fff;
    font-size: 16px;
    line-height: 38px;
    text-align: center;
    cursor: pointer;
    user-select: none;
  }

  .pagination-next {
    margin-right: 0;
  }

  .pagination-item:hover {
    border-color: #858f98;
  }

  .pagination-item.actived {
    color: #fff;
    background: #061c67;
  }

  .pagination-prev[data-disabled='true'],
  .pagination-next[data-disabled='true'] {
    cursor: not-allowed;
  }

  &::after {
    clear: both;
    display: block;
    content: '';
  }
}
$paginationHeight: 40px;
.pagination.center {
  height: $paginationHeight;
  text-align: center;

  .pagination-list {
    display: inline-block;
    height: $paginationHeight;
  }
}
</style>
