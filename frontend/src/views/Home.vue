<template>
  <div>
    <div class="container">
      <p class="has-text-centered is-size-1">Election System</p>
    </div>
    <div class="container input-container is-vcentered">
      <div class="field">
        <label class="label">Username</label>
        <div class="control has-icons-left">
          <input
            class="input"
            type="text"
            placeholder="Username"
            autocomplete="off"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control has-icons-left">
          <input
            class="input"
            type="password"
            placeholder="Password"
            autocomplete="off"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-key"></i>
          </span>
        </div>
      </div>
      <div class="container">
        <div class="columns">
          <div class="column is-gapless">
            <button class="button is-link">Login</button>
          </div>
          <div class="column is-gapless">
            <a href="#"><p style="margin-top: 10px;">Register</p></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.input-container {
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>
