<template>
  <div>
    <Navbar />
    <div class="container" style="margin-top: 30px;">
      <div
        class="columns is-variable is-1-mobile is-0-tablet is-3-desktop is-8-widescreen is-2-fullhd"
      >
        <div class="column" v-for="(value, index) in listMovies" :key="index">
          <Card
            :movieName="value.movieName"
            :price="value.price"
            :image="value.image[0]"
            :movieId="value._id"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moviesService from "@/services/movies/get-query";
import Navbar from "@/components/navbar-customer";
import Card from "@/components/card";
export default {
  components: {
    Navbar,
    Card
  },
  data() {
    return {
      listMovies: [],
      username: localStorage.getItem("username"),
      coin: localStorage.getItem("balance")
    };
  },
  created() {
    /* eslint-disable */
    moviesService().then(({ data }) => {
      this.listMovies = data.list;
    });
  }
};
</script>
