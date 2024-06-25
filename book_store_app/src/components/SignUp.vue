<script>
import imageSrc from '../assets/images/cartImg.png';
export default {
  data: () => ({
    tab: null,
    visible: false,
    imgSrc:imageSrc
  }),
};
</script>

<template>
  <div class="outerDiv">
    <div class="imgBox">
      <img id="cartId"
      width="250"
        aspect-ratio="16/9"
        cover
        :src="imgSrc"
      ></img>
      <div id="img-below-text"><b>ONLINE BOOK SHOPPING</b></div>
    </div>
    <v-card class="card-signup">
        <v-tabs v-model="tab" align-tabs="center" color="#A03037">
          <v-tab id="login-text" :value="1"><b>LOGIN</b> </v-tab>
          <v-tab id="signup-text" :value="2"><b>SIGNUP</b> </v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">
          <v-tabs-window-item v-for="n in 2" :key="n" :value="n">
            <v-container fluid>
              <v-row>
                <v-col class="inputs" v-show="n == 2">
                  <div>
                    <label for="name">Full Name</label>
                    <v-text-field variant="outlined"></v-text-field>
                  </div>
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
                  <div>
                    <label for="name">Mobile Number</label>
                    <v-text-field variant="outlined"></v-text-field>
                  </div>
                  <div>
                    <v-btn id="signupBtn" block>SIGNUP</v-btn>
                  </div>
                </v-col>
                <v-col v-show="n == 1">
                  <div>
                    <label for="name">Email Id</label>
                    <v-text-field variant="outlined"></v-text-field>
                  </div>
                  <div>
                    <label for="name">Password</label>
                    <v-text-field
                      :append-inner-icon="visible ? 'mdi-eye':'mdi-eye-off' "
                      :type="visible ? 'text' : 'password'"
                      @click:append-inner="visible = !visible"
                      variant="outlined"
                    ></v-text-field>
                  </div>
                  <div>
                    <v-btn block>SIGNIN</v-btn>
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
#cartId{
  border-radius: 50%;
}
.outerDiv {
  display: flex;
}
.imgBox{
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
#img-below-text{
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
  gap: 17%;
}
#login-text {
  font-size: 20px;
  color: #878787;
}
#signup-text {
  font-size: 20px;
  color: #878787;
}
label{
  font-size: small;
  font-weight: bold;
}
/* span.v-btn__content{
    color: rgb(69, 69, 69);
    caret-color: rgb(45, 45, 45);
} */

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
.v-text-field .v-field--no-label input, .v-text-field .v-field--active input {
  padding: 0;
    padding-bottom: 16px;
    padding-left: 6px;
}
</style>
