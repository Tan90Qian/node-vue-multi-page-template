<template>
  <div :class="{ pagination: true, center }">
    <ul class="pagination-list">
      <li
        class="pagination-prev"
        :title="prevText"
        v-if="!(hideOnDisabled && stateCurrent === 1)"
        :data-disabled="stateCurrent === 1"
        @click="handleCurrentChange('prev');"
      >
        {{ prevText }}
      </li>
      <template v-if="pageData.length <= 5">
        <li
          :class="['pagination-item', value === stateCurrent ? 'actived' : '']"
          v-for="value in pageData"
          :key="value"
          :title="value"
          @click="handleCurrentChange(value);"
        >
          {{ value }}
        </li>
      </template>
      <template v-else>
        <li
          :class="['pagination-item', stateCurrent == 1 ? 'actived' : '']"
          :title="1"
          @click="handleCurrentChange(1);"
        >
          1
        </li>
        <li
          v-if="stateCurrent >= 5"
          class="pagination-item left"
          @click="handleCurrentChange('left');"
        >
          ...
        </li>
        <li
          :class="['pagination-item', value === stateCurrent ? 'actived' : '']"
          v-for="value in showedPage"
          :key="value"
          :title="value"
          @click="handleCurrentChange(value);"
        >
          {{ value }}
        </li>
        <li
          v-if="stateCurrent <= pageData.length - 4"
          class="pagination-item right"
          @click="handleCurrentChange('right');"
        >
          ...
        </li>
        <li
          :class="['pagination-item', stateCurrent == pageData.length ? 'actived' : '']"
          :title="pageData.length"
          @click="handleCurrentChange(pageData.length);"
        >
          {{ pageData.length }}
        </li>
      </template>
      <li
        class="pagination-next"
        :title="nextText"
        v-if="!(hideOnDisabled && stateCurrent === pageData.length)"
        :data-disabled="stateCurrent === pageData.length"
        @click="handleCurrentChange('next');"
      >
        {{ nextText }}
      </li>
    </ul>
  </div>
</template>

<script>
import { hasProp } from '../_util/prop-util.js';

function fixControlledValue(value) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}

export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    defaultCurrent: {
      type: Number,
      default: 1
    },
    current: Number,
    pageSize: {
      type: Number,
      default: 1
    },
    prevText: {
      type: String,
      default: '&lt;'
    },
    nextText: {
      type: String,
      default: '&gt;'
    },
    hideOnDisabled: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'current',
    event: 'change'
  },
  data() {
    const { current, defaultCurrent } = this.$props;
    return {
      stateCurrent: fixControlledValue(!hasProp(this, 'current') ? defaultCurrent : current)
    };
  },
  created() {
    if (this.stateCurrent < 1) {
      this.stateCurrent = 1;
    } else if (this.stateCurrent > this.pageData.length) {
      this.stateCurrent = this.pageData.length;
    }
  },
  watch: {
    current(val) {
      this.stateCurrent = fixControlledValue(val);
    }
  },
  computed: {
    pageData() {
      const { total, pageSize } = this;
      const pageNum = Math.ceil(total / pageSize);
      const result = [1];
      for (let i = 2; i <= pageNum; i++) {
        result.push(i);
      }
      return result;
    },
    showedPage() {
      const { stateCurrent, pageData } = this;
      if (stateCurrent <= 3) {
        return pageData.slice(1, 5);
      }
      if (stateCurrent >= pageData.length - 2) {
        return pageData.slice(-5, -1);
      }
      return pageData.slice(stateCurrent - 3, stateCurrent + 2);
    }
  },
  methods: {
    handleCurrentChange(page) {
      const { stateCurrent, pageData, pageSize } = this;
      if (page === stateCurrent) return;
      let target;
      switch (page) {
        case 'prev':
          if (stateCurrent === 1) break;
          this.emitChange(stateCurrent - 1, pageSize);
          break;
        case 'next':
          if (stateCurrent === pageData.length) break;
          this.emitChange(stateCurrent + 1, pageSize);
          break;
        case 'left':
          target = stateCurrent - 5;
          if (target < 1) target = 1;
          this.emitChange(target, pageSize);
          break;
        case 'right':
          target = stateCurrent + 5;
          if (target > pageData.length) target = pageData.length;
          this.emitChange(target, pageSize);
          break;
        default:
          this.emitChange(page, pageSize);
          break;
      }
    },
    emitChange(page, pageSize) {
      if (!hasProp(this, 'current')) {
        this.stateCurrent = page;
      } else {
        this.$emit('change', page, pageSize);
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
    cursor: default;
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
