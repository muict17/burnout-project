<template>
  <div>
    <Navbar />
    
    <div class="container">
      <h1 class="title">Create Movie</h1>
      Title : <input type="text" v-model="movieName" /> <br />
      Price : <input type="text" v-model="moviePrice" /> <br />
      <input type="file" @change="onFileSelected" > <br />
      <button @click="addMovie" class="button is-info">ADD</button><br /><br />

    <h1 class="title">Movies List</h1>
    <table class="table is-fullwidth">
      
      <tr>
        <th>Image</th>
        <th>Movie name</th>
        <th>Price</th>
        <th>Delete Movie</th>
        <th>Edit Movie</th>
      </tr>
        
        <tr v-for="(element, index) in listOfMovie" :key="index">   
          <td><img :src="element.imgFile"></td>
          <td>{{ element.movie }}</td>
          <td>{{ element.price }}</td>
          <td><button class="button is-info" @click="deleteMovie(index)">
            Delete the Movie
          </button></td>
          <td><button class="button is-info" @click="toggleEdit(index)">
            Edit the Movie
          </button>
          <div v-if="toggle[index]">
            
          <br>
          Title : <input type="text" v-model="element.movie" /> <br />
          Price : <input type="text" v-model="element.price" /> <br />
          Image : <input type="file" @change="onFileSelected" > <br />
          <button
            class="button is-info"
            @click="clickEdit(index, element.movie, element.price, element.imgFile)"
          >
            Confirm
          </button>
         
        </div>

          </td>
<!--           
          <div v-if="toggle[index]">
            
          <br>
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
         
        </div> -->
          
          </tr>

        
        
      
      </table>
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
      selectedfile: null,
      toggle: []
    };
  },

  components: {
    Navbar
  },
  methods: {
    onFileSelected(event){
      /* eslint-disable */
      console.log(event)
      this.selectedfile = event.target.files[0]
    },
    addMovie() {
      this.listOfMovie.push({ movie: this.movieName, price: this.moviePrice, imgFile: this.selectedfile });
      this.toggle.push(false);
       /* eslint-disable */
       console.log(this.selectedfile);
    },

    deleteMovie(index) {
      this.listOfMovie.splice(index, 1);
    },
    clickEdit(index, name, price,imgFile) {
      /* eslint-disable */
      console.log(index, name, price);
      this.listOfMovie[index].movie = name;
      this.listOfMovie[index].price = price;
      this.listOfMovie[index].imgFile = imgFile;
      this.$set(this.toggle, index, !this.toggle[index]);
    },
    toggleEdit(index) {
      this.$set(this.toggle, index, !this.toggle[index]);
    }
  }
};
</script>

<style scoped>

.container > *{
  margin-top: 3px;
}

.title{
  font-size: 18px;
  margin: 0px;
  margin-top: 10px;

}



</style>