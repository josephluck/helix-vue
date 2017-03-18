<template>
  <div>
    <div class='container'>
      <div class='jumbotron'>
        <div class='row'>
          <div class='col-md-6'>
            <h1>Helix</h1>
          </div>
        </div>
        <div class='col-md-6'>
          <div class='row'>
            <div class='col-sm-6 smallpad'>
              <button type='button' class='btn btn-primary btn-block' id='run' v-on:click="run">Create 1,000 rows</button>
            </div>
            <div class='col-sm-6 smallpad'>
              <button type='button' class='btn btn-primary btn-block' id='runlots' v-on:click="runLots">Create 10,000 rows</button>
            </div>
            <div class='col-sm-6 smallpad'>
              <button type='button' class='btn btn-primary btn-block' id='add' v-on:click="add">Append 1,000 rows</button>
            </div>
            <div class='col-sm-6 smallpad'>
              <button type='button' class='btn btn-primary btn-block' id='update' v-on:click="update">Update every 10th row</button>
            </div>
            <div class='col-sm-6 smallpad'>
              <button type='button' class='btn btn-primary btn-block' id='clear' v-on:click="clear">Clear</button>
            </div>
            <div class='col-sm-6 smallpad'>
              <button type='button' class='btn btn-primary btn-block' id='swaprows' v-on:click="swapRows">Swap Rows</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <table class='table table-hover table-striped test-data'>
      <tbody>
        <tr v-for="row in $root.state.data" v-bind:class="{'danger': $root.state.selected === row.id}">
          <td class='col-md-1'>{{row.id}}</td>
          <td class='col-md-4'>
            <a v-on:click="click(row.id)">{{row.label}}</a>
          </td>
          <td class='col-md-1'>
            <a v-on:click="del(row.id)">
              <span class='glyphicon glyphicon-remove' aria-hidden='true'></span>
            </a>
          </td>
          <td class='col-md-6'></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  let startTime
  let lastMeasure
  
  function startMeasure (name) {
    startTime = performance.now()
    lastMeasure = name
  }

  function stopMeasure () {
    const last = lastMeasure
    if (lastMeasure) {
      window.setTimeout(function metaStopMeasure () {
        lastMeasure = null
        const stop = performance.now()
        const duration = 0
        console.log(last + ' took ' + (stop - startTime))
      }, 0)
    }
  }

  function printDuration () {
    stopMeasure()
  }

  export default {
    updated () {
      printDuration()
    },
    methods: {
      run () {
        startMeasure('run')
        this.$root.actions.run()
      },

      runLots () {
        startMeasure('runLots')
        this.$root.actions.runLots()
      },

      add () {
        startMeasure('add')
        this.$root.actions.add()
      },

      update () {
        startMeasure('update')
        this.$root.actions.update()
      },

      clear () {
        startMeasure('clear')
        this.$root.actions.clear()
      },

      swapRows () {
        startMeasure('swapRows')
        this.$root.actions.swapRows()
      },

      del (id) {
        return function (e) {
          startMeasure('delete')
          this.$root.actions.delete({ id: id })
        }
      },

      click (id) {
        return function (e) {
          startMeasure('click')
          this.$root.actions.select({ id: id })
        }
      }
    }
  }
</script>