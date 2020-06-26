<template>
  <div
    class="table-rect__body"
    :style="`width:${width}px; height:${height}px; margin-top:${height}px;`"
  >
    <!-- <Seat
      v-for="(s, index) in seats"
      :key="`table-${alias}__seat-${index}`"
      tableType="rect"
      :width="seat.width"
      :position="seat.position"
      :display="seat.display"
      :margin="seat.margin"
      :top="seat.top"
    />-->
  </div>
</template>

<script>
// import Seat from "../Seat/Seat";

export default {
  name: "TableRect",
  components: {
    // Seat
  },
  data: () => ({
    width: 0,
    seat: {
      width: 0,
      position: "",
      display: "",
      margin: 0,
      top: 0
    }
  }),
  computed: {
    height() {
      return Math.ceil(this.width / 4);
    }
  },
  props: {
    alias: String,
    seats: Number
  },
  methods: {
    setConfig() {
      // Table
      this.width = this.$el.clientWidth;

      // Seats
      /*this.seat.width = Math.ceil((this.width * 0.7) / this.seats);
      this.seat.position = "relative";
      this.seat.display = "inline-block";
      this.seat.margin = Math.ceil(
        ((this.width * 0.3) / (this.seats + 1)) * 0.5
      );
      this.seat.top = this.seat.width + this.seat.margin;*/
    }
  },
  mounted() {
    this.setConfig();
  }
};
</script>

<style scoped>
.table-rect__body {
  min-width: 50%;
  min-height: 30%;
  max-width: 75%;
  max-height: 40%;
  margin: 0px auto;
  background: #db8979;
  border-radius: 2px;
}
</style>
