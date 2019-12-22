<template>
  <div>
    <Navbar />
        <h3>Create Movie</h3>
        Title : <input type="text" v-model="movieName"> <br>
        Price : <input type="text" v-model="moviePrice"> <br>
        <button @click="addMovie">ADD</button><br><br>

        
         <div v-for="(element,index) in listOfMovie" :key="index">
               <div>
                   {{element.movie}} 
                   {{element.price}} 
                   <button class="button is-info" @click="deleteMovie(index)">Delete the Movie</button>
                   <button class="button is-info" @click="clickEdit()">Edit the Movie</button>
                   <br>
               </div>

               <div v-show="toggle">
                    Title : <input type="text" v-model="element.movie"> 
                    Price : <input type="text" v-model="element.price"> 
                    <button class="button is-info" @click="clickEdit()">Confirm</button>
               </div>
        </div>
        
  </div>
</template>
<script>
import Navbar from "@/components/navbar-admin";
export default {
   data(){
        return {
           listOfMovie: [{movie:"Doraemon the movie", price:200},], 
           movieName:"",
           moviePrice:"",
           toggle: false,
        }
    },

  components: {
    Navbar,
  },
  methods:{
        addMovie(){
            this.listOfMovie.push({movie:this.movieName, price:this.moviePrice})
        },
       
        deleteMovie(index){  
            this.listOfMovie.splice(index,1);
        },

        clickEdit(){
           this.toggle = !this.toggle;

        },
     
    },        
};
</script>

