import { configure, addDecorator } from '@storybook/vue';
import { withOptions } from '@storybook/addon-options';
import Vue from 'vue';

// Import your custom components.
import Pagination from '../views/components/Pagination/index.vue';
import MzInput from '../views/components/MzInput/index.vue';

// Install Vue plugins.

// Register custom components.
Vue.component('pagination', Pagination);
Vue.component('mz-input', MzInput);

addDecorator(
  withOptions({
    hierarchyRootSeparator: /\|/
  })
);

function loadStories() {
  // You can require as many stories as you need.
  require('../stories');

  const req = require.context('../stories', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
