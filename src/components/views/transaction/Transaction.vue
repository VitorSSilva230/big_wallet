
<template>
    <v-app>
    <v-container>
      <v-row>
        <v-col>
          <v-autocomplete
            v-model="selectedCoin.first"
            :items="firstCoinList"
            label="Escolha uma Moeda"
            item-text="name"
            item-value="id"
            @change="getInfoFirstCoin()"
            solo-inverted
          ></v-autocomplete>
          
        </v-col>
        <v-col>
          <v-autocomplete
            v-model="selectedCoin.second"
            :items="secondCoinList"
            label="Escolha uma Moeda"
            item-text="name"
            item-value="id"
            @change="getInfoSecondCoin()"
            solo-inverted
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-form >
    <v-container>
        <v-row>
        <v-col>
          <!-- Campo para inserir valores numéricos -->
          <v-text-field
            v-model="amount.first"
            :label="`Amount: ${this.infoFirstCoin.name}`"
            type="number"
            @input="changeCoin"
          ></v-text-field>
        </v-col>
        <v-col>
          <!-- Campo para exibir o resultado convertido -->
          <v-text-field
            v-model="amount.second"
            :label="`Amount: ${this.infoSecondCoin.name}`"
            disabled
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
      <v-btn @click="changeCoin()">
        Button
      </v-btn>
    </v-container>
  </v-app>
</template>
  
<script>
import axios from 'axios';


export default {
    name: "TransactionComponent",
    data() {
        return {
            selectedCoin: {
                first: "",
                second: "",
            },
            amount: {
                first: "",
                second: "",
            },
            firstCoinList: [],
            secondCoinList: [],
            
            infoFirstCoin: {
                id: "",
                name: "",
                symbol: "",
                current_price_brl: "",
                img_thumb: "",
                img_small: "",
                img_large: "",
            },
            infoSecondCoin: {
                id: "",
                name: "",
                symbol: "",
                current_price_brl: "",
                img_thumb: "",
                img_small: "",
                img_large: "",
            }
        };
    },
    methods: {

        getIdFirstCoin() {
        
            axios.get(`https://api.coingecko.com/api/v3/coins/list`)
            .then((response) => {
                
                this.firstCoinList = response.data.map((item) => ({
                    id: item.id,
                    name: item.name,
                }));

                console.log(this.firstCoinList);
            })
            .catch(error => console.error('Erro ao retornar registro:', error))
        },
        getIdSecondCoin() {
        
        axios.get(`https://api.coingecko.com/api/v3/coins/list`)
        .then((response) => {
            
            this.secondCoinList = response.data.map((item) => ({
                id: item.id,
                name: item.name,
                
            }));
        })
        .catch(error => console.error('Erro ao retornar registro:', error))

        },
        getInfoFirstCoin() {
            axios.get(`https://api.coingecko.com/api/v3/coins/${this.selectedCoin.first}`)
            .then((response) => {

                this.infoFirstCoin.id = response.data.id;
                this.infoFirstCoin.name = response.data.name;
                this.infoFirstCoin.symbol = response.data.symbol;
                this.infoFirstCoin.current_price_brl = response.data.market_data.current_price.brl;
                this.infoFirstCoin.img_thumb = response.data.image.thumb;
                this.infoFirstCoin.img_small = response.data.image.small;
                this.infoFirstCoin.img_large = response.data.image.large;

                console.log(this.infoFirstCoin);
            }).catch(error => console.error('Erro ao retornar registro:', error))
            
        },
        getInfoSecondCoin() {
            axios.get(`https://api.coingecko.com/api/v3/coins/${this.selectedCoin.second}`)
            .then((response) => {

                this.infoSecondCoin.id = response.data.id;
                this.infoSecondCoin.name = response.data.name;
                this.infoSecondCoin.symbol = response.data.symbol;
                this.infoSecondCoin.current_price_brl = response.data.market_data.current_price.brl;
                this.infoSecondCoin.img_thumb = response.data.image.thumb;
                this.infoSecondCoin.img_small = response.data.image.small;
                this.infoSecondCoin.img_large = response.data.image.large;

                console.log(this.infoSecondCoin);
            }).catch(error => console.error('Erro ao retornar registro:', error))
            
        },

        changeCoin() {
            if (this.infoFirstCoin.current_price_brl != "" || this.infoSecondCoin.current_price_brl != ""){
               
                this.amount.second = (this.amount.first) * (this.infoFirstCoin.current_price_brl / this.infoSecondCoin.current_price_brl);
                
            } else {
                this.$toast.open({
                    message: 'Selecione as duas moedas',
                    type: 'error',
                });
            }
            
        }
    },
    beforeMount()  {
        this.getIdFirstCoin();
        this.getIdSecondCoin()
    }
};
</script>
  
<style scoped>
body{
    
}
</style>
  