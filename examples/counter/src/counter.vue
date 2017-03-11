<template>
  <section class='section hero'>
    <div class='card'>
      <div class='card-content'>
        <div class='title is-2'>
          <span>The count is: </span>
          <span>{{$root.state.count}}</span>
        </div>

        <div class='block control is-grouped'>
          <a class='control button' v-on:click="$root.actions.increment($root.state.amount)">
            Increment
          </a>
          <a class='control button' v-on:click="$root.actions.decrement($root.state.amount)">
            Decrement
          </a>
        </div>
        <div class='block control is-grouped'>
          <a class='control button' v-on:click="$root.actions.incrementAsync($root.state.amount,  $root.state.timeout )">
            Increment in {{ $root.state.timeout }} second{{ $root.state.timeout  > 1 ? 's' : ''}}
          </a>
          <a class='control button' v-on:click="$root.actions.decrementAsync($root.state.amount,  $root.state.timeout )">
            Decrement in {{ $root.state.timeout }} second{{ $root.state.timeout  > 1 ? 's' : ''}}
          </a>
        </div>
        
        <div class='block'>
          <div class='control'>
            <label class='label'>Adjust increment / decrement amount ({{$root.state.amount}})</label>
            <input
              type='range'
              v-bind:value="$root.state.amount"
              min='1'
              max='50'
              v-on:input="$root.actions.setAmount(parseFloat($event.target.value))"
            />
          </div>
        </div>

        <div class='block'>
          <div class='control'>
            <label class='label'>Adjust async timeout ({{ $root.state.timeout }}s)</label>
            <input
              type='range'
              v-bind:value="$root.state.timeout"
              min='1'
              max='10'
              v-on:input="$root.actions.setAsyncTimeout(parseFloat($event.target.value))"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        count: 100,
      }
    }
  }
</script>
