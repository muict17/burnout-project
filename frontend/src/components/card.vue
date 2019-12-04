<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="image" :alt="movieName" />
      </figure>
    </div>
    <div class="card-content">
      <div class="content has-text-centered">
        Name: {{ movieName }} <br />
        Price: $ {{ price }}
        <!-- <time datetime="2016-1-1">{{ startDate }} - {{ endDate }}</time> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["startDate", "endDate", "movieName", "price", "image"]
};
</script>
