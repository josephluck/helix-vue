const helix = require('../../../src/index').default
const viewOne = require('./view-one.vue')
const viewTwo = require('./view-two.vue')
const viewThree = require('./view-three.vue')

let mount = document.createElement('div')
document.body.appendChild(mount)

helix({
  model: {
    state: {
      title: 'not set',
    },
    reducers: {
      set (state, title) {
        return Object.assign({}, state, {
          title: title,
        })
      },
    },
    models: {
      counter: {
        scoped: true,
        state: {
          count: 1,
        },
        reducers: {
          increment (state, amount) {
            return {
              count: state.count + (amount || 1),
            }
          },
        },
        effects: {
          incrementAsync (state, actions) {
            setTimeout(() => {
              actions.increment(5)
            }, 1000)
          },
        },
        models: {
          secondTitle: {
            scoped: true,
            state: {
              title: 'hey',
            },
            reducers: {
              update (state, title) {
                return {
                  title: title,
                }
              },
            },
          },
        },
      },
      foo: {
        state: {
          bar: 'baz',
        },
      },
    },
  },
  routes: {
    '/': {
      view: viewOne,
    },
    '/bar': {
      onEnter (state, prev, actions) {
        actions.set('You have entered bar')
        console.log('bar onEnter', state.location.pathname)
      },
      onUpdate (state, prev, actions) {
        actions.set('You have updated bar')
        console.log('bar onUpdate', state.location.pathname)
      },
      onLeave (state, prev, actions) {
        actions.set('You have left bar')
        console.log('bar onLeave', state.location.pathname)
      },
      view: viewTwo,
    },
    '/bar/:baz': {
      onEnter (state, prev, actions) {
        actions.set(`You have entered bar:/baz ${state.location.params.baz}`)
        console.log('bar/:baz onEnter', state.location.pathname)
      },
      onUpdate (state, prev, actions) {
        actions.set(`You have updated bar:/baz ${state.location.params.baz}`)
        console.log('bar/:baz onUpdate', state.location.pathname)
      },
      onLeave (state, prev, actions) {
        actions.set(`You have left bar:/baz ${state.location.params.baz}`)
        console.log('bar/:baz onLeave', state.location.pathname)
      },
      view: viewThree,
    }
  },
  mount,
})
