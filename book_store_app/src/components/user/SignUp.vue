<script setup lang="ts">
import { useSignupStore } from "@/stores/signUp";
const signupStore = useSignupStore();
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col class="inputs">
        <div>
          <label for="name">Full Name</label>
          <v-text-field
            :rules="signupStore.nameRules"
            variant="outlined"
          ></v-text-field>
        </div>
        <div>
          <label for="name">Email Id</label>
          <v-text-field
            :rules="signupStore.emailRules"
            variant="outlined"
          ></v-text-field>
        </div>
        <div>
          <label for="name">Password</label>
          <v-text-field
            :append-inner-icon="signupStore.visible ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="signupStore.passwordRules"
            :type="signupStore.visible ? 'text' : 'password'"
            @click:append-inner="signupStore.visible = !signupStore.visible"
            variant="outlined"
          ></v-text-field>
        </div>
        <div>
          <label for="name">Mobile Number</label>
          <v-text-field
            :rules="signupStore.mobileRules"
            variant="outlined"
          ></v-text-field>
        </div>
        <div>
          <v-btn id="signupBtn" block>SIGNUP</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.inputs{
  width: 330px;
}
#signupBtn {
  background-color: #a03037;
  color: #ffffff;
}
.card-signup {
  box-shadow: 0px 1px 10px 1px rgb(131, 130, 130);
  padding-top: 2%;
  padding-bottom: 2%;
}


</style>
