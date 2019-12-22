<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="columns is-centered is-vcentered is-multiline">
        <div
          class="column is-one-quarter"
          v-for="(ticket, index) in listTickets"
          :key="index"
        >
          <qrcode
            :value="ticket._id"
            :options="{
              width: 200,
              color: {
                dark: '#2f80ed', // Blue dots
                light: '#0000' // Transparent background
              }
            }"
            class="is-horizontal-center"
          ></qrcode>
          <p class="has-text-centered" style="color: black;">
            <b>Position: {{ ticket.seatPosition }}</b>
          </p>
          <p class="has-text-centered">
            Movie Name: {{ ticket.movieInfo[0].movieName }}
          </p>
          <p class="has-text-centered">
            Movie Price: $ {{ ticket.movieInfo[0].price }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import getTicketService from "@/services/tickets/get-query";
import Navbar from "@/components/navbar-customer";
export default {
  components: {
    Navbar
  },
  data() {
    return {
      listTickets: []
    };
  },
  created() {
    getTicketService().then(({ data }) => {
      this.listTickets = data.list;
    });
  }
};
</script>
<style>
.is-horizontal-center {
  display: block;
  margin: auto;
}
</style>
