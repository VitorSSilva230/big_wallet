<!-- SearchSelect.vue -->

<template>
    <v-app>
    <v-container>
      <v-row>
        <v-col>
          <v-select
            v-model="selectedCoin"
            :items="coins"
            label="Escolha uma Moeda"
          ></v-select>
          <p>Você escolheu: {{ selectedCoin }}</p>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
  
<script>
import axios from 'axios';

export default {
    name: "TransactionComponent",
    data() {
        return {
            selectedCoin: "",
            coins: []
            
        };
    },
    methods: {
        getIdCoins() {
        
            axios.get(`https://api.coingecko.com/api/v3/coins/list`)
            .then((response) => {
                
                this.coins = response.data.map(item => item.name);
                
                console.log(this.coins);
                
                
            })
            .catch(error => console.error('Erro ao retornar registro:', error))
        },
    },
    beforeMount()  {
        this.getIdCoins();
    }
};
</script>
  
<style scoped>
/* Se necessário, adicione estilos personalizados aqui */
</style>
  