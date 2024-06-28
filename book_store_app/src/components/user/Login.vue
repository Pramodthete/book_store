<script setup lang="ts">
import { useLoginStore } from "@/stores/login";
const loginStore = useLoginStore();
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <br />
        <div>
          <label for="email">Email Id</label>
          <v-text-field
            v-model="loginStore.email"
            :rules="loginStore.emailRules"
            required
            variant="outlined"
          ></v-text-field>
        </div>
        <div>
          <label for="password">Password</label>
          <v-text-field
            v-model="loginStore.password"
            :append-inner-icon="loginStore.visible ? 'mdi-eye' : 'mdi-eye-off'"
            :type="loginStore.visible ? 'text' : 'password'"
            @click:append-inner="loginStore.visible = !loginStore.visible"
            :rules="loginStore.passwordRules"
            variant="outlined"
            required
          ></v-text-field>
        </div>
        <div class="forgot-text">Forgot Password?</div>
        <div>
          <v-btn block id="signupBtn" @click="loginStore.login">Login</v-btn>
        </div>
        <div>
          <v-divider id="divider"><b>OR</b></v-divider>
        </div>
        <div class="two-btn">
          <v-btn id="fb">Facebook</v-btn>
          <v-btn id="g">Google</v-btn>
        </div>
        <br>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
label {
  font-size: small;
  font-weight: bold;
}

.v-row {
    width: 330px;
}

.forgot-text {
  float: right;
  margin-top: -20px;
  margin-bottom: 20px;
  font-size: small;
}

#signupBtn {
  background-color: #a03037;
  color: #ffffff;
}

#divider {
  margin-top: 30px;
  margin-bottom: 30px;
}

.v-field__field {
  height: 41px;
}

.v-container--fluid {
  max-width: 340px;
}

.two-btn {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

#fb {
  text-transform: capitalize;
  background-color: #4266b2;
  color: white;
  width: 130px;
  height: 40px;
}

#g {
  text-transform: capitalize;
  background-color: #f5f5f5;
  width: 130px;
  height: 40px;
}


@media screen and (max-width: 370px) {
  #fb {
    width: 100px;
  }
  #g {
    width: 100px;
  }
}
</style>
