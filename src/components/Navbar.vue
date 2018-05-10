<template>
  <div id="navbar">

<div class="anavbar-fixed">
  <nav class="transparent z-depth-0">
    <div class="nav-wrapper">
      <!-- <a href="#!" class="brand-logo center">Logo</a> -->
      <a class="brand-logo center"><i class="material-icons">gps_fixed</i></a>
      <ul class="left hide-on-med-and-down">
        <li class="active"><router-link to="/"><i class="material-icons">home</i></router-link></li>
        <li><router-link to="/banchecker">BAN CHECKER</router-link></li>
        <li><router-link to="/bans">BANS</router-link></li>
        <li><router-link to="/about">ABOUT</router-link></li>
      </ul>
    </div>
  </nav>
</div>

  </div>
  </template>

  <script>
  export default {
    name: 'navbar',
    methods: {
    }
  }
  </script>

  <style src="./Navbar.css">
  </style>
