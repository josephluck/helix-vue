import * as vue from 'vue'

export function renderer (dom) {
  let vm
  let props
  return function (node, state, prev, actions) {
    if (!vm) {
      vm = new vue({
        data: {
          state,
          prev,
          actions,
        },
        render (createElement) {
          return createElement(node)
        },
      }).$mount(dom)
    }
    if (node) {
      vm.$set(vm.$data, 'state', state)
      vm.$set(vm.$data, 'prev', prev)
      vm.$set(vm.$data, 'actions', actions)
    }
  }
}
