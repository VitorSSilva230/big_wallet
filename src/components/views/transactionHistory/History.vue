<template>
    <v-app>
      <!-- Seu conteúdo existente -->
    </v-app>
  </template>
  
  <script>
  import axios from 'axios';
  import jsonData from './id_coin.json';
  
  export default {
    name: 'historyComponent',
    data() {
      return {
        idCoin: jsonData,
        dadosApi: [],
        idsJaBuscados: [], // Array para armazenar os IDs já buscados
        hasError: false, // Indica se ocorreu um erro nas chamadas de API
      };
    },
    methods: {
      async getIdCoinData() {
        // Carrega os IDs já buscados do armazenamento local
        this.idsJaBuscados = JSON.parse(localStorage.getItem('idsJaBuscados')) || [];
  
        // Tenta realizar chamadas de API até que tenha sucesso ou após um erro
        while (!this.hasError) {
          for (let i = 0; i < this.idCoin.length; i++) {
            const coin = this.idCoin[i];
  
            if (!this.idsJaBuscados.includes(coin.id)) {
              try {
                const dados = await this.makeApiCall(coin);
  
                this.idsJaBuscados.push(coin.id);
                this.dadosApi.push(dados);
              } catch (error) {
                console.error('Erro ao obter dados para', this.dadosApi, this.idsJaBuscados, error);
                this.hasError = true;
                break; // Sai do loop interno se houver um erro
              }
            }
  
          }
  
          // Salva os IDs e os dados já buscados no armazenamento local após concluir todas as chamadas
          localStorage.setItem('idsJaBuscados', JSON.stringify(this.idsJaBuscados));
          localStorage.setItem('dadosApi', JSON.stringify(this.dadosApi));
  
  
          // Se todas as chamadas foram bem-sucedidas, termina o loop
          if (!this.hasError) break;
  
          // Se ocorreu um erro, aguarda 1 minuto antes de tentar novamente
          this.hasError = false;
          await this.sleep(60000);
        }
      },
      async makeApiCall(coin) {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.id}`);
        const data = response.data;
        return {
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          url_img_thumb: data.image.thumb,
          url_img_small: data.image.small,
          url_img_large: data.image.large
        };
      },
      sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    },
    mounted() {
      this.dadosApi = JSON.parse(localStorage.getItem('dadosApi')) || [];
      this.getIdCoinData();
    }
  };
  </script>
  