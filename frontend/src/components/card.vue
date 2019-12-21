<template>
  <div class="card" @click="toSelectSeat">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="image" :alt="movieName" />
      </figure>
    </div>
    <div class="card-content">
      <div class="content has-text-centered">
        Name: {{ movieName }} <br />
        Price: $ {{ price }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["movieName", "price", "image", "movieId"],
  methods: {
    toSelectSeat: function() {
      this.$router.push({ name: "seat", params: { movieId: this.movieId } });
    }
  }
};
</script>
<style>
.card {
  cursor: pointer;
}
</style>
