<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="columns">
        <div class="column">
          <Card
            :movieName="movieName"
            :price="moviePrice"
            :image="movieImage"
            :movieId="movieId"
          />
        </div>
        <div class="column">
          <div class="columns is-multiline" style="margin-top: 10px;">
            <div
              class="column is-one-third"
              v-for="(seat, index) in listSeat"
              :key="index"
            >
              <div class="seat" v-if="!seatWasBook.includes(seat)">
                <input type="checkbox" :id="seat" />
                <label :for="seat" @click="selectSeat(seat)">{{ seat }}</label>
              </div>
              <div class="isSelected" v-if="seatWasBook.includes(seat)">
                <input type="checkbox" :id="seat" />
                <label :for="seat">{{ seat }}</label>
              </div>
            </div>
          </div>
          <br /><br />
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">ราคารวม</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input
                    class="input is-static"
                    type="email"
                    :value="paymentAmount"
                    readonly
                  />
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">รหัสบัตร</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="รหัสบัตร"
                    v-model="cardNumber"
                    maxlength="16"
                    name="d"
                  />
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label"
                >CVC
                <br />
                วันหมดอายุ
              </label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded ">
                  <input
                    class="input"
                    type="password"
                    placeholder="CVC"
                    maxlength="3"
                    v-model="cardCvc"
                    name="b"
                  />
                </p>
              </div>
              <div class="field">
                <p class="control">
                  <input
                    class="input"
                    type="email"
                    name="a"
                    placeholder="mm/yyyy"
                    maxlength="7"
                    v-model="cardExpire"
                  />
                </p>
              </div>
            </div>
          </div>
          <button class="button is-link is-pulled-right" @click="payMovice">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import movieByIdService from "@/services/movies/get-id";
import Navbar from "@/components/navbar-customer";
import Card from "@/components/card";
import omiseService from "@/services/payments/verify-card";
import depositService from "@/services/payments/deposit";
import bookingService from "@/services/payments/pay-movie";

export default {
  components: {
    Navbar,
    Card
  },
  data() {
    return {
      cardNumber: "",
      cardExpire: "",
      cardCvc: "",
      movieId: "",
      moviePrice: "",
      movieImage: "",
      movieName: "",
      listSelected: [],
      paymentAmount: 0,
      listSeat: ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"],
      seatWasBook: []
    };
  },
  created: function() {
    this.movieId = this.$route.params.movieId;
    movieByIdService(this.movieId).then(({ data }) => {
      this.moviePrice = data.price;
      this.movieImage = data.image[0];
      this.movieName = data.movieName;
      this.seatWasBook = data.seatsBooking;
    });
  },
  methods: {
    selectSeat: function(seatNumber) {
      const seatIndex = this.listSelected.indexOf(seatNumber);
      if (seatIndex === -1) {
        this.listSelected.push(seatNumber);
        this.paymentAmount += this.moviePrice;
      } else {
        this.listSelected.splice(seatIndex, 1);
        this.paymentAmount -= this.moviePrice;
      }
    },
    payMovice: async function() {
      try {
        const cardToken = await omiseService(
          this.cardNumber,
          this.cardExpire,
          this.cardCvc
        );
        await depositService(cardToken.data.id, this.paymentAmount);
        await bookingService(this.movieId, this.listSelected);
        this.$router.push({ name: "ticket" });
      } catch (e) {
        /*eslint-disable */
        console.log(e);
      }
    }
  }
};
</script>
<style>
.seats {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
}
.isSelected {
  padding: 5px;
  position: relative;
  margin-top: 30px;
}

.isSelected input[type="checkbox"] {
  position: absolute;
  opacity: 0;
}
.isSelected label {
  display: block;
  position: relative;
  width: 100%;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.5rem;
  padding: 4px 0;
  background: orange;
  border-radius: 5px;
  animation-duration: 300ms;
  animation-fill-mode: both;
}
.seat {
  padding: 5px;
  position: relative;
  margin-top: 30px;
}

.seat input[type="checkbox"] {
  position: absolute;
  opacity: 0;
}

.seat input[type="checkbox"]:checked + label {
  background: #bada55;
  -webkit-animation-name: rubberBand;
  animation-name: rubberBand;
  animation-duration: 300ms;
  animation-fill-mode: both;
}
.seat input[type="checkbox"]:disabled + label {
  background: #dddddd;
  text-indent: -9999px;
  overflow: hidden;
}
.seat input[type="checkbox"]:disabled + label:after {
  content: "X";
  text-indent: 0;
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translate(-50%, 0%);
}
.seat input[type="checkbox"]:disabled + label:hover {
  box-shadow: none;
  cursor: not-allowed;
}
.seat label {
  display: block;
  position: relative;
  width: 100%;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.5rem;
  padding: 4px 0;
  background: #25daf6;
  border-radius: 5px;
  animation-duration: 300ms;
  animation-fill-mode: both;
}
</style>
