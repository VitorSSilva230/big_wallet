
<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card>
                    <v-card-title class="text-h5">Cadastro</v-card-title>
                    <v-card-text>
                        <v-form ref="form" @submit.prevent="registerUser">
                            <v-text-field v-model="usuario.name" label="Nome" required></v-text-field>
                            <v-text-field v-model="usuario.email" label="Email" type="email" required></v-text-field>
                            <v-text-field v-model="usuario.password" label="Senha" type="password" required></v-text-field>
                            <v-text-field v-model="usuario.cpf" label="CPF" v-mask="'###.###.###-##'" required></v-text-field>
                            <v-btn type="submit" color="primary">Cadastrar</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import axios from 'axios';

export default {
    name: "CadastroComponent",
    data: () => ({
        usuario: {
            name: "",
            email: "",
            password: "",
            cpf: "",
            date_registration: "",
            time_registration: "",
        },
        userId: "",
    }),
    methods: {
        async registerUser() {
            console.log(this.usuario);

            const cpf = this.usuario.cpf.replace(/\D/g, '');
            this.usuario.cpf = cpf;

            const dataAtual = new Date().toISOString().split('T')[0];
            this.usuario.date_registration = dataAtual;

            const horaAtual = new Date().toISOString().slice(11, 19);
            this.usuario.time_registration = horaAtual;

          await  axios.post('https://localhost:7112/api/user', this.usuario)
                .then((response) => {

                    console.log('Cadastro realizado com sucesso:', response);

                  this.getIdUsuario()

                })
                .catch(error => console.error('Erro ao cadastrar:', error));
        },

        async getIdUsuario() {
          await  axios.get(`https://localhost:7112/api/user/cpf/${this.usuario.cpf}`)
                .then((response) => {

                    const dataUser = response;
                    this.userId = dataUser.data.id;

                    this.createNewWallet()
                   
                })
                .catch(error => console.error('Erro ao retornar registro:', error));
        },

        async createNewWallet() {

            let requestBody = {
                id_user: 34,
                id_key_coin: "tether",
                amount: 1000
            }

           await axios.post(`https://localhost:7112/api/wallet`, requestBody)
            .then((response) => {

                this.returToLogin();

                this.$toast.open({
                    message: 'Conta criada!',
                    type: 'success',
                });

                console.log('Wallet criada com sucesso:', response);
                
            })
            .catch(error => console.error('Erro ao criar wallet:', error));
        },

        async returToLogin (){
            this.$router.push({ path: "/login" }, () => { });
        }
    },


};
</script>
  
<style scoped>
/* Estilos específicos para o componente, se necessário */
</style>
  