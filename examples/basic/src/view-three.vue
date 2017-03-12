<template>
  <div>
    <links v-on:clicked="navigate"></links>
    <h1>view three {{$root.state.location.params.baz}}</h1>
    {{$root.state.title}}
    <div>
      <input v-bind:value="$root.state.title" v-on:input="$root.actions.set($event.target.value)" />
    </div>
  </div>
</template>

<script>
  import links from './links.vue'
  export default {
    components: {
      links,
    },
    methods: {
      navigate (loc) {
        this.$root.actions.location.set(loc)
      }
    }
  }
</script>