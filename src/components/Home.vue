<template>
<div class="home">

  <section class="hero">
    <div class="hero-body">
      <div class="container">

        <div class="columns is-centered">
          <div class="column has-text-centered">
            <h1 class="title has-text-white is-size-1 has-text-weight-bold">VACEIT</h1>
          </div>
        </div>

        <div class="columns is-centered">
          <div class="column has-text-centered">
            <h2 class="subtitle has-text-white is-size-2 is-italic">Check out if a former enemy got banned</h2>
          </div>
        </div>

      </div>
    </div>
  </section>

  <section>
    <div class="columns is-centered is-mobile">
      <div class="column is-8 is-three-quarters-mobile">

        <form @submit.prevent="addSkill">

          <div class="field">
            <div class="control">

              <transition name="alert-in" enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
                <p class="alert" v-if="errors.has('skill')"> {{ errors.first('skill') }} </p>
              </transition>

              <input class="input" type="text" placeholder="Enter a skill" v-model="skill" v-validate="'min:5'" name="skill" />

            </div>
          </div>

        </form>

      </div>
    </div>
  </section>
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
