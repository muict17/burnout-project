<template>
  <div>
    <Navbar />
    <div class="container">
      <h1 class="title has-text-centered">Create Movie</h1>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Movie Name</label>
        </div>

        <div class="field-body">
          <div class="field">
            <p class="control is-narrow has-icons-left">
              <input
                class="input"
                type="text"
                placeholder="Movie name"
                v-model="movieName"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-video"></i>
                <ion-icon name="videocam"></ion-icon>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Movie Price</label>
        </div>

        <div class="field-body">
          <div class="field">
            <p class="control is-narrow has-icons-left">
              <input
                class="input"
                type="number"
                placeholder="Movie Price"
                v-model="moviePrice"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-dollar-sign"></i>
                <ion-icon name="videocam"></ion-icon>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Movie Image</label>
        </div>

        <div class="field-body">
          <div class="field">
            <p class="control is-narrow ">
              <input
                class="input"
                type="file"
                @change="onFileSelected"
                accept="image/*"
              />
            </p>
          </div>
        </div>
      </div>
      <div class="field is-horizontal is-center">
        <div class="field-label">
          <!-- Left empty for spacing -->
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <button @click="addMovie" class="button is-info">
                Create the Movie
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <h1 class="title has-text-centered">Movies List</h1>
      <table class="table is-fullwidth">
        <tr>
          <th>Image</th>
          <th>Movie name</th>
          <th>Price</th>
          <th>Delete Movie</th>
          <th>Edit Movie</th>
        </tr>
        <tr v-for="(element, index) in listOfMovie" :key="index">
          <td><img class="image" :src="element.image" /></td>
          <td>{{ element.movieName }}</td>
          <td>{{ element.price }}</td>
          <td>
            <button
              class="button is-info"
              @click="deleteMovie(element._id, index)"
            >
              Delete the Movie
            </button>
          </td>
          <td>
            <button class="button is-info" @click="toggleEdit(index)">
              Edit the Movie
            </button>
            <div v-if="toggle[index]">
              <br />
              Title : <input type="text" v-model="element.movieName" /> <br />
              Price : <input type="text" v-model="element.price" /> <br />
              Image :
              <input
                type="file"
                @change="onFileUpdateSelected($event, index)"
              />
              <br />
              <button
                class="button is-info"
                @click="
                  clickEdit(
                    index,
                    element._id,
                    element.movieName,
                    element.price,
                    element.image
                  )
                "
              >
                Confirm
              </button>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/navbar-admin";
import createMovieService from "@/services/movies/create";
import listMovieService from "@/services/movies/get-query";
import deleteMovieService from "@/services/movies/delete";
import updateMovieService from "@/services/movies/update";

export default {
  data() {
    return {
      listOfMovie: [],
      movieName: "",
      moviePrice: "",
      selectedfile: null,
      toggle: []
    };
  },

  components: {
    Navbar
  },
  created() {
    /* eslint-disable */
    listMovieService().then(({ data }) => {
      this.listOfMovie = data.list;
    });
  },
  methods: {
    onFileSelected(event) {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => (this.selectedfile = reader.result);
        reader.readAsDataURL(file);
      }
    },
    onFileUpdateSelected(event, index) {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => (this.listOfMovie[index].image = reader.result);
        reader.readAsDataURL(file);
      }
    },
    async addMovie() {
      try {
        const data = await createMovieService({
          movieName: this.movieName,
          price: this.moviePrice,
          image: [this.selectedfile]
        });
        this.listOfMovie.push({
          movieName: this.movieName,
          price: this.moviePrice,
          image: this.selectedfile
        });
        this.toggle.push(false);
      } catch (e) {
        console.log(e);
      }
    },

    async deleteMovie(movieId, index) {
      try {
        await deleteMovieService(movieId);
        this.listOfMovie.splice(index, 1);
      } catch (e) {
        console.log(e);
      }
    },
    async clickEdit(index, movieId) {
      try {
        const { movieName, price, image } = this.listOfMovie[index];
        await updateMovieService(movieId, {
          movieName,
          price,
          image: [image]
        });
        this.$set(this.toggle, index, !this.toggle[index]);
      } catch (e) {
        console.log(e);
      }
    },
    toggleEdit(index) {
      this.$set(this.toggle, index, !this.toggle[index]);
    }
  }
};
</script>

<style scoped>
.image {
  width: 100px;
}
.container > * {
  margin-top: 3px;
  margin-bottom: 30px;
}

.title {
  font-size: 18px;
  margin: 0px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
