const helix = require('../../../src/index').default
const view = require('./view.vue')

function model () {
  let id = 1

  function _random (max) {
    return Math.round(Math.random() * 1000) % max
  }

  function buildData (count) {
    count = count || 1000
    const adjectives = ['pretty', 'large', 'big', 'small', 'tall', 'short', 'long', 'handsome', 'plain', 'quaint', 'clean', 'elegant', 'easy', 'angry', 'crazy', 'helpful', 'mushy', 'odd', 'unsightly', 'adorable', 'important', 'inexpensive', 'cheap', 'expensive', 'fancy']
    const colours = ['red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white', 'black', 'orange']
    const nouns = ['table', 'chair', 'house', 'bbq', 'desk', 'car', 'pony', 'cookie', 'sandwich', 'burger', 'pizza', 'mouse', 'keyboard']

    return new Array(count).fill('').map(() => {
      return {
        id: id++,
        label: `${adjectives[_random(adjectives.length)]} ${colours[_random(colours.length)]} ${nouns[_random(nouns.length)]}`,
      }
    })
  }

  return {
    state: {
      data: [],
      selected: false,
    },
    reducers: {
      run (state) {
        return { data: buildData(1000), selected: undefined }
      },
      add (state) {
        return {
          data: state.data.slice().concat(buildData(1000)),
          selected: undefined,
        }
      },
      runLots (state) {
        return { data: buildData(10000), selected: undefined }
      },
      clear (state) {
        return { data: [], selected: undefined }
      },
      update (state) {
        return {
          data: state.data.slice()
            .map((d, i) => {
              if (i % 10 === 0) {
                d.label = `${d.label} !!!`
              }
              return d
            }),
          selected: undefined,
        }
      },
      swapRows (state) {
        if (state.data.length > 10) {
          const newData = state.data.slice()
          const a = newData[4]
          newData[4] = newData[9]
          newData[9] = a

          return {
            data: newData,
            selected: state.selected,
          }
        } else {
          return state
        }
      },
      select (state, data) {
        return {
          data: state.data,
          selected: data.id,
        }
      },
      delete (state, data) {
        return {
          data: state.data.filter((d) => d.id !== data.id),
        }
      }
    }
  }
}

let mount = document.createElement('div')
document.body.appendChild(mount)

helix({
  model: model(),
  routes: {
    '': {
      view,
    },
  },
  mount,
})
