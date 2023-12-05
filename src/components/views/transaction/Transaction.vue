
<template>
  <v-app>
    <v-container>
      <v-row>
          <v-col>
            <span class="text-h5">Todas as moedas no mercado atual</span>
          </v-col>
      </v-row>
            
      <v-row>
        <v-col>
          <v-autocomplete v-model="selectedCoin.first" :items="firstCoinList" label="Escolha uma Moeda" item-text="name"
            item-value="id" @change="getInfoCoin(selectedCoin.first)" solo-inverted>
            <template #item="{ item }">
              <v-list-item-avatar>
                <v-img :src="item.img_thumb" alt="Coin Image"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <template #selection="{ item }">
              <v-list-item-avatar>
                <v-img :src="item.img_thumb" alt="Coin Image"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-autocomplete>
          <p> Você possui: {{ wallet.amountFirstCoin || 0 }} </p>
        </v-col>
        <v-col>
          <v-autocomplete v-model="selectedCoin.second" :items="secondCoinList" label="Escolha uma Moeda" item-text="name"
            item-value="id" @change="getInfoCoin(selectedCoin.second)" solo-inverted :disabled="!selectedCoin.first">
          </v-autocomplete>
        </v-col>
      </v-row>
      <v-form>
        <v-container>
          <v-row>
            <v-col>
              <!-- Campo para inserir quantidade de moeda -->
              <v-text-field v-model="amount.first" :label="`Amount: ${this.infoFirstCoin.name}`" type="number"
                :disabled="!selectedCoin.second" @input="calcValueSecondCoin"></v-text-field>
            </v-col>
            <v-col>
              <!-- Campo para exibir o resultado convertido -->
              <v-text-field v-model="amount.second" :label="`Amount: ${this.infoSecondCoin.name}`"
                disabled></v-text-field>

            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-btn @click="validateCoin()">
        Trocar
      </v-btn>
      <v-btn @click="retornaListaPrincipal()">
        Voltar
      </v-btn>
      <v-dialog v-model="alertConfirmar" persistent width="512">
        <v-card>
          <v-card-title>
            <span class="text-h5">Atenção!</span>
          </v-card-title>
          <v-card-text>
            <v-container>{{ "Deseja confirmar esta transação ?" }} </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="tonal" color="danger" @click="cancelTransaction()"> NÃO </v-btn>
            <v-btn color="warning" variant="text" @click="changeCoin()"> SIM </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>
  
<script>
import axios from 'axios';


export default {
  name: "TransactionComponent",
  data() {
    return {
      dataUser: {},
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
      },
      wallet: {
        amountFirstCoin: "",
        amountSecondCoin: "",
        walletIdFirst: "",
        walletIdSecond: "",
        walletExist: false
      },
      alertConfirmar: false
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
    getInfoCoin(id_coin) {
      axios.get(`https://api.coingecko.com/api/v3/coins/${id_coin}`)
        .then((response) => {

          if (id_coin == this.selectedCoin.first) {
            this.infoFirstCoin.id = response.data.id;
            this.infoFirstCoin.name = response.data.name;
            this.infoFirstCoin.symbol = response.data.symbol;
            this.infoFirstCoin.current_price_brl = response.data.market_data.current_price.brl;
            this.infoFirstCoin.img_thumb = response.data.image.thumb;
            this.infoFirstCoin.img_small = response.data.image.small;
            this.infoFirstCoin.img_large = response.data.image.large;
            this.getWallet(this.selectedCoin.first);
          } else {
            this.infoSecondCoin.id = response.data.id;
            this.infoSecondCoin.name = response.data.name;
            this.infoSecondCoin.symbol = response.data.symbol;
            this.infoSecondCoin.current_price_brl = response.data.market_data.current_price.brl;
            this.infoSecondCoin.img_thumb = response.data.image.thumb;
            this.infoSecondCoin.img_small = response.data.image.small;
            this.infoSecondCoin.img_large = response.data.image.large;

            this.getWallet(this.selectedCoin.second);
          }

          this.calcValueSecondCoin();

        }).catch(error => console.error('Erro ao retornar registro:', error))

    },
    openAlert() {
      this.alertConfirmar = true;
    },
    cancelTransaction() {
      this.alertConfirmar = false;
    },
    getWallet(coin) {

      let walletInfo = "";

      if (coin == this.selectedCoin.first) {

        this.wallet.amountFirstCoin = 0;
      } else {
        this.wallet.amountSecondCoin = 0;
        this.wallet.walletExist = false;
      }


      axios.get(`https://localhost:7112/api/wallet/user/${this.dataUser.id}/${coin}`)
        .then((response) => {

          walletInfo = response.data[0];

          if (coin == this.selectedCoin.first) {
            this.wallet.amountFirstCoin = walletInfo.amount;
            this.wallet.walletIdFirst = walletInfo.id;
          } else {
            this.wallet.amountSecondCoin = walletInfo.amount;
            this.wallet.walletIdSecond = walletInfo.id;

            if (walletInfo || walletInfo) {

              this.wallet.walletExist = true;

            }
          }
        })
        .catch(error => console.error('Erro ao retornar registro:', error))
    },

    calcValueSecondCoin() {
      this.amount.second = (this.amount.first) * (this.infoFirstCoin.current_price_brl / this.infoSecondCoin.current_price_brl);
    },
    validateCoin() {

      /////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////// VALIDAÇÕES ///////////////////////////////
      /////////////////////////////////////////////////////////////////////////////

      let currentValidate = true;

      if (!this.selectedCoin.first || !this.selectedCoin.second) {
        this.$toast.open({
          message: 'Selecione as duas moedas',
          type: 'error',
        });
        currentValidate = false;
        return;
      }


      if (!this.infoFirstCoin.current_price_brl || !this.infoSecondCoin.current_price_brl) {
        this.$toast.open({
          message: 'Informações de preço indisponíveis',
          type: 'error',
        });
        currentValidate = false;
        return;
      }


      if (!this.amount.first || this.amount.first <= 0) {
        this.$toast.open({
          message: 'Informe uma quantidade válida',
          type: 'error',
        });
        currentValidate = false;
        return;
      }


      if (this.amount.first > this.wallet.amountFirstCoin) {
        this.$toast.open({
          message: 'Você não possui moedas suficientes!',
          type: 'error',
        });
        currentValidate = false;
        return;
      }


      if (currentValidate) {
        this.openAlert()
      }


    },
    changeCoin() {

      const walletFirstCoinCalc = this.wallet.amountFirstCoin - this.amount.first;

      let requestBody = {
        id: this.wallet.walletIdFirst,
        id_user: this.dataUser.id,
        id_key_coin: this.selectedCoin.first,
        amount: walletFirstCoinCalc,
        name: this.infoFirstCoin.name,
        url_img_wallet: this.infoFirstCoin.img_thumb
      }
      axios.put(`https://localhost:7112/api/wallet/${this.wallet.walletIdFirst}`, requestBody)
        .then(() => {
          this.$toast.open({
            message: 'Transação realizada com sucesso!',
            type: 'success',
          });
        })
        .catch(error => console.error('Erro ao retornar registro:', error))

      if (this.wallet.walletExist) {

        const walletSecondCoinCalc = this.wallet.amountSecondCoin + this.amount.second;

        let requestBody = {
          id: this.wallet.walletIdSecond,
          id_user: this.dataUser.id,
          id_key_coin: this.selectedCoin.second,
          amount: walletSecondCoinCalc,
          name: this.infoSecondCoin.name,
          url_img_wallet: this.infoSecondCoin.img_thumb
        }
        axios.put(`https://localhost:7112/api/wallet/${this.wallet.walletIdSecond}`, requestBody)
          .then(() => {

            this.$toast.open({
              message: 'Transação realizada com sucesso!',
              type: 'success',
            });
          })
          .catch(error => console.error('Erro ao retornar registro:', error))
      } else {
        const walletSecondCoinCalc = this.amount.second;
        let requestBody = {
          id_user: this.dataUser.id,
          id_key_coin: this.selectedCoin.second,
          amount: walletSecondCoinCalc,
          name: this.infoSecondCoin.name,
          url_img_wallet: this.infoSecondCoin.img_thumb
        }
        axios.post(`https://localhost:7112/api/wallet`, requestBody)
          .then(() => {
            this.$toast.open({
              message: 'Transação realizada com sucesso!',
              type: 'success',
            });
          })
          .catch(error => console.error('Erro ao retornar registro:', error))
      }

      setTimeout(() => {
        this.alertConfirmar = false;
        //location.reload();
      }, 1000);
    },
    retornaListaPrincipal() {
      this.$router.push({ path: "/transactionMain" }, () => { });
    }
  },
  beforeMount() {
    this.getIdFirstCoin();
    this.getIdSecondCoin();
    this.dataUser = JSON.parse(localStorage.getItem("dataUser"));
  }
};
</script>
  
<style scoped></style>
  