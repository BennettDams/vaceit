<template>
<div class="home">
  <div class="holder">

    <!-- set class to "alert" if "showAlert" is false -->
    <div v-bind:class="alertObject"></div>

    <p>
      Theses are the skills:
    </p>

    <ul>
      <li v-for="(data, index) in skills" :key="index">{{ data.skill }}</li>
    </ul>

    <form @submit.prevent="addSkill">
      <input type="text" placeholder="Enter a skill" v-model="skill" v-validate="'min:5'" name="skill" />
      <p class="alert" v-if="errors.has('skill')"> {{ errors.first('skill') }} </p>
    </form>

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
      skill: "",
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
  },
  methods: {
    addSkill() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.skills.push({
            skill: this.skill
          })
          this.skill = "";
        } else {
          console.log("input not valid")
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./Home.css" scoped>
</style>
