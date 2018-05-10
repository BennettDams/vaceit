<template>
<div class="home">

  <div class="container">

    <div class="section center row">
      <div class="col s12">
        <p>
          <span id="header-vac">VAC</span>
          <span id="header-it">EIT</span>
        </p>
        <h3>Check out former enemy's bans</h3>
      </div>
    </div>

    <div class="section row">
      <div class="col s12">

        <form @submit.prevent="addSkill">
          <div class="input-field">

            <transition name="alert-in" enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
              <p class="alert" v-if="errors.has('skill')"> {{ errors.first('skill') }} </p>
            </transition>

            <input id="search" class="input center" type="text" placeholder="FACEIT ID / PROFILE LINK" v-model="skill" v-validate="'min:5'" name="skill" />

            <label class="label-icon" for="search"><i class="material-icons small">search</i></label>

          </div>
        </form>

      </div>
    </div>

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
