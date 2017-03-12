<template>
  <div>
    <a style="margin-right: 10px;" href="/">view one</a>
    <a style="margin-right: 10px;" href="/bar">view two</a>
    <a style="margin-right: 10px;" href="/bar/123">view three (123)</a>
    <a style="margin-right: 10px;" href="/bar/456">view three (456)</a>
    <a style="margin-right: 10px;" href="/bar/789">view three (789)</a>
    <a style="margin-right: 10px;" v-on:click="$emit('clicked', '/bar/abc')">view three (abc)</a>
    <a style="margin-right: 10px;" v-on:click="$emit('clicked', '/bar/def')">view three (def)</a>
  </div>
</template>