<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <div class="navbar-burger burger" data-target="my-navbar-menu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div id="my-navbar-menu" class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item">
          <router-link to="/home">Movies</router-link>
        </div>
      </div>
      <div>
        <div class="navbar-item">
          <p class="logo">MUICT TICKET</p>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <router-link to="/home">My Tickets</router-link>
        </div>
        <div class="navbar-item"><a @click="logout">Logout</a></div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      username: localStorage.getItem("username"),
      coin: localStorage.getItem("balance")
    };
  },
  methods: {
    logout: function() {
      localStorage.clear();
      this.$router.push("/");
    }
  }
};
</script>
<style>
.logo {
  text-align: center;
  font-size: 28px;
}
.navbar-item > a,
.navbar-item {
  color: black;
  font-size: 18px;
  font-weight: bold;
}
</style>
