<script setup>
import { useSignupStore } from '@/stores/signUp';
const signupStore = useSignupStore()

</script>

<template>
    <div class="outerDiv">
    <div class="imgBox">
      <img id="cartId" width="250" aspect-ratio="16/9" cover :src="signupStore.imgSrc"></img>
      <div id="img-below-text"><b>ONLINE BOOK SHOPPING</b></div>
    </div>
    <v-card class="card-signup">
      <v-tabs v-model="signupStore.tab" align-tabs="center" color="#A03037">
        <v-tab  @click="signupStore.login" :value="1"><b
            :class="{ 'login-btn': !signupStore.changeColor, 'login-text': signupStore.changeColor }" id="login-text">LOGIN</b> </v-tab>
        <v-tab @click="signupStore.signup" :value="2"><b
            :class="{ 'login-btn': signupStore.changeColor, 'signup-text': !signupStore.changeColor }" id="signup-text">SIGNUP</b> </v-tab>
      </v-tabs>

      <v-tabs-window v-model="signupStore.tab">
        <v-tabs-window-item v-for="n in signupStore.tabs" :key="n" :value="n">
          <v-container fluid>
            <v-row>
              <RouterView/>
            </v-row>
          </v-container>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </div>
</template>

<style >
body {
    background-color: rgb(184, 184, 184);
  }

#cartId {
  border-radius: 50%;
}
.outerDiv {
  display: flex;
  justify-content: center;
  align-items: center;
}

.imgBox {
  height: 400px;
  margin-top: 5%;
  padding-right: 40px;
  padding-top: 50px;
  padding-left: 40px;
  padding-bottom: 50px;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  background-color: #F5F5F5;
  opacity: 1;
}

#img-below-text {
  display: flex;
  justify-content: center;
  margin-top: 10%;
  font-size: large
}

.card-signup {
  box-shadow: 0px 1px 10px 1px rgb(131, 130, 130);
  padding-top: 2%;
  padding-bottom: 2%;
  width: 450px;
}

#login-text {
  font-size: 25px;
  color: #878787;
}

.login-btn {
  color: #0A0102 !important;
}

#signup-text {
  font-size: 25px;
  color: #878787;
}

label {
  font-size: small;
  font-weight: bold;
}

#signupBtn {
  background-color: #a03037;
  color: #ffffff;
}

.v-container--fluid {
  max-width: 340px;
}
.v-tab__slider {
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: 0;
    width: 38px;
    height: 6px;
    border-radius: 5px;
    margin-left: 38px;
}
.v-field__field {
    height: 50px;
}
.v-text-field .v-field--no-label input, .v-text-field .v-field--active input {
    padding: 0;
    padding-bottom: 8px;
    padding-left: 5px;
}
.v-slide-group__content {
    gap: 15%;
}

@media screen and (max-width:900px) {
  .imgBox {
    display: none;
  }
  .outerDiv{
    justify-content: center;
    place-items: center;
  }
}

@media screen and (max-width:550px) {
  .card-signup{
    border: none;
    box-shadow: none;
    width: fit-content;
  }
  .v-slide-group__content {
    gap: 0%;
    width: fit-content;
  }
}
</style>