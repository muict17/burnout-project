<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="columns">
        <div class="column">
          <qrcode-stream @decode="scanQr"></qrcode-stream>
        </div>
        <div class="column">
          <br /><br /><br />
          <p>
            Movie Name: <b>{{ movieName }}</b>
          </p>
          <br />
          <p>
            Seat Position: <b>{{ seatPosition }}</b>
          </p>
          <br />
          <p>
            customer Name: <b>{{ customerName }}</b>
          </p>

          <br /><br />
          <p class="message has-text-success" v-if="!isError && isScanned">
            Completed!
          </p>
          <p class="message has-text-danger" v-if="isError && isScanned">
            This Ticket was used!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/navbar-admin";
import scanService from "@/services/tickets/scan";
import getTicketIdService from "@/services/tickets/get-id";
export default {
  components: {
    Navbar
  },
  data() {
    return {
      movieName: "",
      seatPosition: "",
      customerName: "",
      ticketIsUsed: false,
      isError: false,
      isScanned: false
    };
  },
  methods: {
    scanQr: async function(ticketId) {
      this.isScanned = true;
      /* eslint-disable */
      try {
        const ticketInfo = await getTicketIdService(ticketId);
        this.movieName = ticketInfo.data.movieInfo[0].movieName;
        this.customerName = ticketInfo.data.userInfo[0].username;
        this.seatPosition = ticketInfo.data.seatPosition;
        this.ticketIsUsed = ticketInfo.data.isUsed;
        if (this.ticketIsUsed === false) {
          const { data } = await scanService(ticketId);
        } else {
          this.isError = true;
        }
      } catch ({ response }) {
        this.isError = true;
        console.log(response);
      }
    }
  }
};
</script>
<style scoped>
.message {
  font-size: 20px;
}
</style>
