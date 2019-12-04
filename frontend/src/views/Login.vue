<template>
  <div class="columns">
    <div class="column mobile">
      <logoComponent />
    </div>
    <div class="column">
      <div class="container title-block">
        <p class="text-title">
          SIGN IN<router-link class="sub-title" to="/register"
            >or create new account</router-link
          >
        </p>
      </div>
      <div class="columns is-multiline">
        <div class="column is-full">
          <div class="field">
            <div class="control has-icons-left">
              <input
                class="input"
                type="text"
                placeholder="Username"
                autocomplete="off"
                v-model="username"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="column is-full">
          <div class="field">
            <div class="control has-icons-left">
              <input
                class="input"
                type="password"
                placeholder="Password"
                autocomplete="off"
                v-model="password"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-key"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="container has-text-centered">
          <button class="button is-link" v-on:click="login">SIGN IN</button>
          <br />
          <p v-if="isError" class="text-error">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import logoComponent from "@/components/logoComponent";
import loginService from "@/services/authentication/login";
export default {
  components: {
    logoComponent
  },
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
      isError: false
    };
  },
  methods: {
    login: async function() {
      this.isError = false;
      try {
        /* eslint-disable */
        const { data } = await loginService(this.username, this.password);
        localStorage.setItem("token", data.token);
        localStorage.setItem("balance", data.balance);
        localStorage.setItem("username", data.username);
        this.$router.push("/home");
      } catch ({ response }) {
        if (response) {
          this.isError = true;
          this.errorMessage = response.data.msg;
        }
      }
    }
  }
};
</script>
<style>
.text-error {
  text-align: center;
  font-size: 18px;
  color: red;
}
.column {
  min-height: calc(100% - 20px);
}
.bg-triangle {
  position: relative;
  clip-path: polygon(0 0, 100% 0, 100% 100%);
  background-color: #2f80ed;
  height: 98vh;
}
.title-block {
  margin-bottom: 20%;
}
.sub-title {
  display: block;
  text-decoration: underline;
  font-size: 16px;
  text-align: center !important;
  color: black;
}
.text-title {
  font-size: 32px;
  text-align: center;
  color: black;
}
.brand-title {
  position: absolute;
  bottom: 0;
  margin-bottom: 15%;
  margin-left: 5%;
  left: 0;
  font-size: 64px;
  font-weight: bold;
  color: black;
}
.input-container {
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
@media only screen and (max-width: 600px) {
  .mobile {
    display: none;
  }
}
</style>
