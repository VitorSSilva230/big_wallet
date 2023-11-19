<template>
    <v-container class="">
        <v-card height="200px" width="400px">
            <v-img src="https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1696501400" height="50px" width="50px"></v-img>
            <v-card-title>Bitcoin</v-card-title>
            <v-card-subtitle>R$12176273</v-card-subtitle>
        </v-card>
        <v-btn @click="getIdCoins()"> Get info</v-btn>
    </v-container>
</template>

<script>
import axios from 'axios';


export default {
    name: 'DashboardComponent',
  data() {
    return {
      dataCoin:{
        image: "",
        id: "",
        symbol: "",
        name: ""
      }
    };
  },
  methods: {

    getIdCoins() {
        
        axios.get(`https://api.coingecko.com/api/v3/coins/list`)
        .then((response) => {
            
            this.dataCoin.id = response.data.map(item => item.id);
            this.dataCoin.symbol = response.data.map(item => item.symbol);
            this.dataCoin.name = response.data.map(item => item.name);
            
            console.log(this.dataCoin.id);
            
            this.getDataCoins();
        })
        .catch(error => console.error('Erro ao retornar registro:', error))
    },

    getDataCoins() {
        let coin = this.dataCoin.id;
        
            axios.get(`https://api.coingecko.com/api/v3/coins/${coin}`)
            .then((response) => {
            
            const infoCoin = response.data;
            
            this.dataCoin.image = infoCoin.image.small;
            
            console.log(this.dataCoin.image);
            
            })
            .catch(error => console.error('Erro ao retornar registro:', error))
            
        
    }
  } 
};
</script>