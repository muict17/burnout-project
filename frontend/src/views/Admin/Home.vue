<template>
  <div>
    <Navbar />
    <h3>Create Movie</h3>
    Title : <input type="text" v-model="movieName" /> <br />
    Price : <input type="text" v-model="moviePrice" /> <br />
    <button @click="addMovie">ADD</button><br /><br />

    <div v-for="(element, index) in listOfMovie" :key="index">
      <div>
        {{ element.movie }}
        {{ element.price }}
        <button class="button is-info" @click="deleteMovie(index)">
          Delete the Movie
        </button>
        <button class="button is-info" @click="toggleEdit(index)">
          Edit the Movie
        </button>
        <br />
      </div>
      {{ listOfMovie }}
      <div v-if="toggle[index]">
        Title : <input type="text" v-model="element.movie" />
        <br />
        Price :
        <input type="text" v-model="element.price" />
        <button
          class="button is-info"
          @click="clickEdit(index, element.movie, element.price)"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/navbar-admin";
export default {
  data() {
    return {
      listOfMovie: [],
      movieName: "",
      moviePrice: "",
      toggle: []
    };
  },

  components: {
    Navbar
  },
  methods: {
    addMovie() {
      this.listOfMovie.push({ movie: this.movieName, price: this.moviePrice });
      this.toggle.push(false);
    },

    deleteMovie(index) {
      this.listOfMovie.splice(index, 1);
    },
    clickEdit(index, name, price) {
      /* eslint-disable */
      console.log(index, name, price);
      this.listOfMovie[index].movie = name;
      this.listOfMovie[index].price = price;
    },
    toggleEdit(index) {
      this.$set(this.toggle, index, !this.toggle[index]);
    }
  }
};
</script>
