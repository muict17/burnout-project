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
          <router-link to="/">Movies</router-link>
        </div>
        <div class="navbar-item">
          <router-link to="/">Payments</router-link>
        </div>
      </div>
      <div>
        <div class="navbar-item">
          <p class="logo">MUICT TICKET</p>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">{{ username }} / {{ coin }} point</div>
        <div class="navbar-item"><a href="#" @click="logout">Logout</a></div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  props: ["username", "coin"],
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
