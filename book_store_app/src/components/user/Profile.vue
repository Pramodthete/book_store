<script setup lang="ts">
import { useHomeStore } from "@/stores/home";
import { ref } from "vue";

const homeStore = useHomeStore();
const radio = ref("Work");
const pass = ref("Pass@123");
const items=ref([
        {
          title: 'Home',
          disabled: false,
          href: 'books',
        },{
          title: `My Profile`,
          disabled: false,
          href: 'profile',
        }
        ])
</script>

<template>
  <div>
    <br />
    <v-breadcrumbs :items></v-breadcrumbs>
  </div>
  <div class="outer-div">
    <div class="outerBorder">
      <div class="details">
        <h2>
          Personal Details
          <span style="font-size: smaller; color: #a03037">Edit</span>
        </h2>
        <div>
          <label for="name">Full Name</label>
          <v-text-field
            v-model="homeStore.cartName"
            disabled
            variant="solo-filled"
          ></v-text-field>
        </div>
        <div>
          <label for="name">Email Id</label>
          <v-text-field
            v-model="homeStore.cartEmail"
            disabled
            variant="solo-filled"
          ></v-text-field>
        </div>
        <div>
          <label for="name">Password</label>
          <v-text-field
            v-model="pass"
            type="password"
            disabled
            variant="solo-filled"
          ></v-text-field>
        </div>
        <div>
          <label for="name">Mobile Number</label>
          <v-text-field
            v-model="homeStore.cartMobile"
            disabled
            variant="solo-filled"
          ></v-text-field>
        </div>
      </div>
      <div class="details">
        <h2>
          Address Details
          <span style="font-size: smaller; color: #a03037">Edit</span>
        </h2>
        <div class="address-details">
          <div class="flex2">
            <div>
              <span><h3>1. WORK</h3> </span
              ><span style="color: rgb(146, 76, 76)"> Edit</span>
            </div>
          </div>
          <div>
            <label for="address">Address</label>
            <v-textarea
              v-model="homeStore.cartAddresss"
              auto-grow
              variant="outlined"
              style="height: 180px"
              disabled
            ></v-textarea>
            <div class="flex1 lower">
              <div>
                <label for="name">City / Town</label>
                <v-text-field
                  width="340px"
                  variant="outlined"
                  v-model="homeStore.cartCity"
                  disabled
                ></v-text-field>
              </div>
              <div>
                <label for="name">State</label>
                <v-text-field
                  width="340px"
                  variant="outlined"
                  v-model="homeStore.cartState"
                  disabled
                ></v-text-field>
              </div>
            </div>
            <div>
              <div>Type</div>
              <div class="flex">
                <div>
                  <v-radio
                    v-model="radio"
                    color="red-darken-3"
                    name="add"
                    label="Home"
                    value="Home"
                  ></v-radio>
                </div>
                <div>
                  <v-radio
                    v-model="radio"
                    color="red-darken-3"
                    name="add"
                    label="Work"
                    value="Work"
                  ></v-radio>
                </div>
                <div>
                  <v-radio
                    v-model="radio"
                    color="red-darken-3"
                    name="add"
                    label="Other"
                    value="Other"
                  ></v-radio>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br /><br />
</template>

<style scoped>
.outer-div {
  display: flex;
  justify-content: center;
  margin: 1%;
}
.outerBorder {
  width: 900px;
  padding: 2%;
  margin-bottom: 2%;
}
.details {
  /* display: flex; */
  /* flex-wrap: wrap; */
  width: 100%;
  gap: 50px;
}
.flex1 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
  gap: 12%;
}
.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 70%;
}
.lower {
  margin-top: -5%;
}
@media screen and (max-width: 500px) {
  .outerBorder {
    width: 100%;
    padding: 1%;
    margin: 1%;
  }
  .v-breadcrumbs {
    margin-top: 5%;
  }
  .flex1 {
    width: 100%;
    gap: 0px;
  }
  .v-text-field {
    width: 100%;
  }
}
</style>
