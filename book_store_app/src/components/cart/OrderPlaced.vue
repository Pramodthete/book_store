<script setup lang="ts">
import router from "@/router";
import { onMounted, ref } from "vue";

const toBooks=()=>{
    router.push('/books')
}

</script>

<template>
  <div class="outerOrder">
    <div>
      <img
        src="../../assets/images/hurrayOrderPlaced.png"
        width="350px"
        height="300px"
        alt=""
      />
    </div>
    <div class="text-hurray">
        hurray!!! your order is confirmed the order id is #123456 save the order id for further communication..
    </div>
    <v-table>
      <thead>
        <tr>
          <th>Email Us</th>
          <th>Contact Us</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>admin@bookstore.com</td>
          <td>+91 8163475881</td>
          <td class="w-td">
            42, 14th Main, 15th Cross, Sector 4 ,opp to BDA complex, near
            Kumarakom restaurant, HSR Layout, Bangalore 560034
          </td>
        </tr>
      </tbody>
    </v-table>
    <br>
    <div>
        <v-btn @click="toBooks" color="blue">CONTINUE SHOPPING</v-btn>
    </div>
  </div>
</template>

<style scoped>
.text-hurray{
    width: 400px;
    text-align: center;
    padding-bottom: 20px;
    font-size: larger;
    font-weight: 500;
}
td {
  border-left: 1px solid black;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
th{
    text-align: center !important;
}
.v-table {
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  width: fit-content;
}
thead{
    background-color: rgb(244, 244, 244);
}
.outerOrder{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1%;
    margin-top: 2%;
}
.w-td{
    width:350px;
}
@media screen and (max-width:600px) {
    .outerOrder{
        margin-top: 10%;
    } 
    img{
        width: 100%;
    }
    .text-hurray{
        width: 100%;
    }
}
</style>
