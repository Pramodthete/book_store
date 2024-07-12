<script setup lang="ts">
import { loginData } from "@/services/userService";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

export type loginDataType = {
  email:string,
  password:string
}

  const visible = ref(false);
  const email = ref('');
  const password = ref('');
  const router = useRouter(); 

  const emailRules = [
    (v: string) => !!v || "Email is required",
    (v: string) =>
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(v) ||
      "Must be a valid e-mail.",
  ];

  const passwordRules = [
    (v: string) => !!v || "Enter password.",
    (v: string) => /(?=.*[a-z])/.test(v) || "At least one lowercase letter.",
    (v: string) => /(?=.*[A-Z])/.test(v) || "At least one UPPERCASE letter.",
    (v: string) => /(?=.*\d)/.test(v) || "At least one digit.",
    (v: string) =>
      /(?=.*[@$!%*?&])/.test(v) || "At least one special character.",
    (v: string) => (v && v.length >= 8) || "Minimum 8 characters.",
  ];

  computed(() => ({
    email: email.value,
    password: password.value,
  }));

  const resetForm = () => {
    email.value = '';
    password.value = '';
  };

  const login = () => {
    console.log("Form is valid");
    const data: loginDataType = {
      email: email.value,
      password: password.value,
    };
    console.log("data==>", data);

    loginData(data)
      .then((res) => {
        localStorage.setItem("x-access-token", res.data.result.accessToken);
        console.log(res);
        resetForm();
        router.push("/books"); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <br />
        <div>
          <label for="email">Email Id</label>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            required
            variant="outlined"
          ></v-text-field>
        </div>
        <div>
          <label for="password">Password</label>
          <v-text-field
            v-model="password"
            :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
            :type="visible ? 'text' : 'password'"
            @click:append-inner="visible = !visible"
            :rules="passwordRules"
            variant="outlined"
            required
          ></v-text-field>
        </div>
        <div class="forgot-text">Forgot Password?</div>
        <div>
          <v-btn block id="signupBtn" @click="login">Login</v-btn>
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
