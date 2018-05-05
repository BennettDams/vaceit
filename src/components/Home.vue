<template>
<div class="home">
  <div class="holder container">

    <form @submit.prevent="addSkill">
      <input type="text" placeholder="Enter a skill" v-model="skill" v-validate="'min:5'" name="skill" />

      <transition name="alert-in" enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
        <p class="alert" v-if="errors.has('skill')"> {{ errors.first('skill') }} </p>
      </transition>
    </form>

  </div>
</div>
</template>

<script>
import axios from 'axios'
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
      users: []
    }
  },
  created() {
    this.loadUsers();
    // this.updateJsonBans();
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
    },
    remove(id) {
      this.skills.splice(id, 1);
    },
    loadUsers() {
      axios.get('')
        .then((response) => {
          this.users = response.data.payload;
          console.log(this.users);
        })
        .catch((error) => {
          console.log(error);
          this.users = "error";
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./Home.css" scoped>
</style>
