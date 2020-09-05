<template>
  <a-card class="weddings_card" :title="title">
    <MenuPresentList :content="presents" @selectPresent="onSelectPresent" />
  </a-card>
</template>

<script>
// Modules
import jwt from "jsonwebtoken";

// Layouts
import MenuPresentList from "../../layouts/MenuPresentList/MenuPresentList";

// Models
import { guestGetsOwnDataById as ggodbi } from "../../models/companion";
import {
  guestGetsAllInWedding as ggapiw,
  guestSelectsPresent as gsp,
} from "../../models/present";

export default {
  name: "GuestLandingCol2",
  components: {
    MenuPresentList,
  },
  data: () => ({
    mainGuest: {},
    presents: [],
    selectedPresents: [],
  }),
  computed: {
    // Lang
    title() {
      return this.$root.$options.languages.lang.gettingStarted.presentsForm
        .title[this.$root.$options.languages.current];
    },
  },
  methods: {
    // Init
    async init() {
      // Decoding token
      const token = this.$route.params.token;
      const decoded = jwt.verify(token, "WED_WED_WEDDINGS");

      // Get guest
      try {
        this.mainGuest = await ggodbi(decoded.id);
      } catch (error) {
        console.error(error);
      }

      if (!this.mainGuest) return;

      // #️⃣ Get all Presents in Wedding
      try {
        this.presents = await ggapiw(this.mainGuest.weddingId);
      } catch (error) {
        console.error("Error: Get all Presents in Wedding:", error);
      }
    },
    onSelectPresent(present) {
      console.log("onSelectPresent:", present);

      /*let foundAt = -1;

      const some = this.selectedPresents.some((p, i) => {
        foundAt = i;
        return p_id === present.p._id;
      });

      if (some) {
        this.selectedPresents.splice(foundAt, 1);
      } else {
        this.selectedPresents.push(p);
      }*/
    },
    updatePresents() {
      if (this.selectedPresents.length === 0) return;

      const promises = [];

      this.selectedPresents.forEach((p) => {
        promises.push(gsp(p._id, { guestId: this.mainGuest._id }));
      });

      if (promises.length === 0) return;

      // Go promises!
      Promise.all(promises)
        .then(() => {
          // Message
          this.$message.success(this.updateSuccess, 5);
        })
        .catch((reason) => {
          console.error(reason);

          // Message
          this.$message.warning(
            this.$root.$options.languages.lang.common.failMessage[
              this.$root.$options.languages.current
            ],
            5
          );
        });
    },
  },
  beforeMount() {
    this.init();
  },
};
</script>
