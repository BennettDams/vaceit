<template>
<div class="home">
  <div class="holder">
    <ul>
      <li v-for="(data, index) in skills" :key="index">{{ data.skill }}</li>
    </ul>

    <!-- set class to "alert" if "showAlert" is false -->
    <div v-bind:class="alertObject"></div>

    <p>
      Theses are the skills:
    </p>

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
      skills: [{
          "skill": "Java"
        },
        {
          "skill": "Spring"
        }
      ],
      alertObject: {
        alert: true
      },
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./Home.css" scoped>
</style>
