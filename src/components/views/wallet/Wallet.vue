<template>
    <v-container>
        <v-row>
            <v-col>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Moeda</th>
                                <th>Quantidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in wallet" :key="item.id">
                                <td></td>
                                <td class="coin-name-img">
                                    <img :src="item.url_img_wallet">
                                    <b>{{ item.name }}</b>
                                </td>
                                <td class="coin-amount">{{ item.amount }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    name: 'WalletComponent',
    data() {
        return {
            dataUser: {},
            wallet: [],
        };
    },
    methods: {
        
        async getWallet() {
            console.log(this.dataUser.id);
            axios.get(`https://localhost:7112/api/wallet/user/${this.dataUser.id}`)
                .then((response) => {
                    
                    this.wallet = response.data;
                    console.log(this.wallet);
                })
                .catch((error) => {
                    this.$toast.open({
                        message: 'Wallet not found!',
                        type: 'error',
                    });
                    console.error('Wallet not found!', error);
                });
        }
    },
    beforeMount() {
        this.dataUser = JSON.parse(localStorage.getItem("dataUser"));
        this.getWallet();
    }
};
</script>

<style></style>