import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

storiesOf('Interface|Pagination', module).add('传入current进行交互', () => ({
  template: '<pagination :total="5" v-model="current" @change="onChange"></pagination>',
  data() {
    return {
      current: 1
    };
  },
  methods: {
    onChange(page, pageSize) {
      this.current = page;
      action(page);
      action(pageSize);
    }
  }
}));
