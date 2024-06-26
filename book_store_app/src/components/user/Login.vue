<script>
export default {
  data: () => ({
    tab: null,
    visible: false,
    changeColor: false,
    rules: {
      required: (value) => !!value || "Field is required",
    },
  }),
};
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <br />
        <div>
          <label for="name">Email Id</label>
          <v-text-field variant="outlined"></v-text-field>
        </div>
        <div>
          <label for="name">Password</label>
          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
            :type="visible ? 'text' : 'password'"
            @click:append-inner="visible = !visible"
            variant="outlined"
          ></v-text-field>
        </div>
        <div class="forgot-text">Forgot Password?</div>
        <div>
          <v-btn block id="signupBtn">Login</v-btn>
        </div>
        <div>
          <v-divider id="divider"><b>OR</b></v-divider>
        </div>
        <div class="two-btn">
          <v-btn id="fb">Facebook</v-btn>
          <v-btn id="g">Google</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
label {
  font-size: small;
  font-weight: bold;
}

.forgot-text {
  float: right;
  margin-top: -20px;
  margin-bottom: 20px;
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
@media screen and (max-width: 370px) {
  #fb {
    width: 100px;
  }

  #g {
    width: 100px;
  }
}
</style>
