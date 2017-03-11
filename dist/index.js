"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue = require("vue");
function renderer(dom) {
    var vm;
    var props;
    return function (node, state, prev, actions) {
        if (!vm) {
            vm = new vue({
                data: {
                    state: state,
                    prev: prev,
                    actions: actions,
                },
                render: function (createElement) {
                    console.log('Creating element');
                    return createElement(node);
                },
            }).$mount(dom);
        }
        if (node) {
            vm.$set(vm.$data, 'state', state);
            vm.$set(vm.$data, 'prev', prev);
            vm.$set(vm.$data, 'actions', actions);
        }
    };
}
exports.renderer = renderer;
