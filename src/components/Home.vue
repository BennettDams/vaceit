<template>
<div class="home">
  <div class="holder container">

    <!-- set class to "alert" if "showAlert" is false -->
    <!-- <div v-bind:class="alertObject"></div> -->

    <div v-for="(user, index) in users" :key="index">
      <h3>{{ user.nickname }}</h3>
      <p> {{ user.reason }} </p>
    </div>

    <br />

    <p>
      Theses are the skills:
    </p>

    <ul>
      <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
        <li v-for="(data, index) in skills" :key="index">
          {{ data.skill }}
          <i class="fa fa-minus-circle" v-on:click="remove(index)"></i>
        </li>
      </transition-group>
    </ul>

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
      axios.get('https://api.faceit.com/core/v1/bans?limit=100&offset=0')
        .then((response) => {
          this.users = response.data.payload;
          console.log(this.users);
        })
        .catch((error) => {
          console.log(error);
          this.users = "error";
        });
    },
    updateJsonBans() {
      var request = require('request');
      request('https://www.pythonanywhere.com/user/Bennett/files/home/Bennett/vace-it-crawler/face_it_bans.json', function(error, response, body) {
        if (!error && response.statusCode == 200) {
          var importedJSON = JSON.parse(body);
          console.log(importedJSON);
        } else {
          console.log(error);
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./Home.css" scoped>
</style>
