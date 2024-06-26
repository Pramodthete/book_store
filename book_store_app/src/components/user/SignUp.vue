<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import imageSrc from '../../assets/images/cartImg.png';
import Login from '@/components/user/Login.vue';

const tab = ref<number | null>(null);
const tabs = ref(2);
const visible = ref(false);
const imgSrc = ref(imageSrc);
const changeColor = ref(false);

const nameRules = [
  (value: string) => !!value || "Enter Full Name",
  (value: string) => (value && value.length >= 5) || "Please Enter Full Name",
];

const passwordRules = [
  (value: string) => !!value || "Enter password.",
  (value: string) => /(?=.*[a-z])/.test(value) || "At least one lowercase letter.",
  (value: string) => /(?=.*[A-Z])/.test(value) || "At least one UPPERCASE letter.",
  (value: string) => /(?=.*\d)/.test(value) || "At least one digit.",
  (value: string) => /(?=.*[@$!%*?&])/.test(value) || "At least one special character.",
  (value: string) => (value && value.length >= 8) || "Minimum 8 characters.",
];

const router = useRouter();
const login = () => {
  changeColor.value = !changeColor.value;
  router.push('/login');
};

const signup = () => {
  changeColor.value = !changeColor.value;
  router.push('/signup');
};
</script>


<template>
  <div class="outerDiv">
    <div class="imgBox">
      <img id="cartId" width="250" aspect-ratio="16/9" cover :src="imgSrc"></img>
      <div id="img-below-text"><b>ONLINE BOOK SHOPPING</b></div>
    </div>
    <v-card class="card-signup">
      <v-tabs v-model="tab" align-tabs="center" color="#A03037">
        <v-tab  @click="login" :value="1"><b
            :class="{ 'login-btn': !changeColor, 'login-text': changeColor }" id="login-text">LOGIN</b> </v-tab>
        <v-tab @click="signup" :value="2"><b
            :class="{ 'login-btn': changeColor, 'signup-text': !changeColor }" id="signup-text">SIGNUP</b> </v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item v-for="n in tabs" :key="n" :value="n">
          <v-container fluid>
            <v-row>
              <Login v-show="n==1"/>
              <v-col class="inputs" v-show="n == 2">
                <div>
                  <label for="name">Full Name</label>
                  <v-text-field :rules="nameRules" variant="outlined"></v-text-field>
                </div>
                <div>
                  <label for="name">Email Id</label>
                  <v-text-field variant="outlined"></v-text-field>
                </div>
                <div>
                  <label for="name">Password</label>
                  <v-text-field :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="visible ? 'text' : 'password'" @click:append-inner="visible = !visible"
                    variant="outlined"></v-text-field>
                </div>
                <div>
                  <label for="name">Mobile Number</label>
                  <v-text-field variant="outlined"></v-text-field>
                </div>
                <div>
                  <v-btn id="signupBtn" block>SIGNUP</v-btn>
                </div>
              </v-col>
               
            </v-row>
          </v-container>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </div>
</template>

<style>
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
  background-color: rgb(247, 246, 246);
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
}

.v-slide-group__content {
  width: 489px;
  gap: 15%;
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


.v-field__field {
  height: 41px;
}

.v-container--fluid {
  max-width: 340px;
}

.two-btn {
  display: flex;
  justify-content: space-between;
}

.v-text-field .v-field--no-label input,
.v-text-field .v-field--active input {
  padding: 0;
  padding-bottom: 16px;
  padding-left: 6px;
}

.v-tab--selected .v-tab__slider {
  opacity: 1;
  width: 33px;
  height: 6px;
  border-radius: 4px;
  margin-left: 35%;
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
