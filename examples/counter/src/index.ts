const helix = require('helix-js').default
const renderer = require('../../../dist/index').renderer
const counter = require('./counter.vue')

let mount = document.createElement('div')
document.body.appendChild(mount)

helix({
  model: {
    state: {
      count: 10,
      amount: 1,
      timeout: 1,
    },
    reducers: {
      increment (state, amount) {
        return {
          count: state.count + amount,
        }
      },
      decrement (state, amount) {
        return {
          count: state.count - amount,
        }
      },
      setAsyncTimeout (state, timeout) {
        return {
          timeout,
        }
      },
      setAmount (state, amount) {
        return {
          amount,
        }
      }
    },
    effects: {
      incrementAsync (state, actions, amount, secs) {
        setTimeout(() => {
          actions.increment(amount)
        }, secs * 1000)
      },
      decrementAsync (state, actions, amount, secs) {
        setTimeout(() => {
          actions.decrement(amount)
        }, secs * 1000)
      },
    },
  },
  component: counter,
  render: renderer(mount),
})
