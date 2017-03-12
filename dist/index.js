"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue = require("vue");
function renderer(dom) {
    var vm;
    return function (node, state, prev, actions) {
        if (node) {
            if (!vm) {
                vm = new vue({
                    data: {
                        child: node,
                        state: state,
                        prev: prev,
                        actions: actions,
                    },
                    render: function (createElement) {
                        var data = this.$data;
                        return createElement(data.child);
                    },
                }).$mount(dom);
            }
            else if (node) {
                vm.$set(vm.$data, 'child', node);
                vm.$set(vm.$data, 'state', state);
                vm.$set(vm.$data, 'prev', prev);
                vm.$set(vm.$data, 'actions', actions);
            }
        }
    };
}
exports.renderer = renderer;
