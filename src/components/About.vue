<template>
<div class="about">
  <h1>
    Hello {{ theirName }}
  </h1>
  <p>
    ABOUT
  </p>
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
