import * as vue from 'vue'

export function renderer (dom) {
  let vm
  return function (node, state, prev, actions) {
    if (node) {
      if (!vm) {
        vm = new vue({
          data: {
            child: node,
            state,
            prev,
            actions,
          },
          render (createElement) {
            const data = this.$data as any
            return createElement(data.child)
          },
        }).$mount(dom)
      } else if (node) {
        vm.$set(vm.$data, 'child', node)
        vm.$set(vm.$data, 'state', state)
        vm.$set(vm.$data, 'prev', prev)
        vm.$set(vm.$data, 'actions', actions)
      }
    }
  }
}
