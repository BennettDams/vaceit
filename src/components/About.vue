<template>
<div class="about">
  <h1>
    Hello {{ theirName }}
  </h1>
  <div class="columns">
    <div class="column">1</div>
    <div class="column">2</div>
    <div class="column">3</div>
    <div class="column">4</div>
    <div class="column">5</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    // msg: String
  },
  data() {
    return {
      theirName: this.$route.params.name
    }
  }
}
</script>
