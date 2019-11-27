<template>
  <div class="columns">
    <div class="column">
      <div class="bg-triangle"></div>
      <h1 class="brand-title">
        MUICT<br />
        MOVIE <br />
        TICKET
      </h1>
    </div>
    <div class="column">
      <div class="field">
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
    </div>
  </div>
</template>
<style>
.column {
  min-height: calc(100% - 20px);
}
.bg-triangle {
  position: relative;
  clip-path: polygon(0 0, 100% 0, 100% 100%);
  background-color: #2f80ed;
  height: 98vh;
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
</style>
