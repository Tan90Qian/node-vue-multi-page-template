export const hasProp = (instance, prop) => {
  const $options = instance.$options || {};
  const propsData = $options.propsData || {};
  return prop in propsData;
};

export function isValidElement(element) {
  return element && element.context && element.context._isVue;
}

export function mergeProps() {
  const args = [].slice.call(arguments, 0);
  const props = {};
  args.forEach((p = {}) => {
    for (const [k, v] of Object.entries(p)) {
      props[k] = props[k] || {};
      if (isPlainObject(v)) {
        Object.assign(props[k], v);
      } else {
        props[k] = v;
      }
    }
  });
  return props;
}
