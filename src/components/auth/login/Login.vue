<template class="template">
    <v-container class="container">
        <v-row>
            <v-col cols="12" md="6">
                <v-form class="container-login">
                    <img class="logo-img" src="../../style/img/wallet-logo.png" alt="logo"> 
                    <div class="title"> <span>Bem-vindo a BIG Wallet </span> </div>
                    <div class="sub-title"> <span>Simule em tempo real transações de criptomoedas famosas no mercado</span>
                    </div>
                    <div class="form-data">
                        <div class="cpf">
                            <v-text-field v-model="usuario.cpf" v-mask="'###.###.###-##'" label="CPF" type="text">
                            </v-text-field>
                        </div>
                        <div class="password">
                            <v-text-field v-model="usuario.password" label="Senha" type="password">
                            </v-text-field>
                        </div>
                    </div>
                    <div class="click-data">
                        <div class="connect"><span></span></div>
                        <div class="forgot-password"><span></span></div>
                    </div>
                    <div class="buttons">
                        <div class="login btn"><v-btn type="submit" block @click="navigateToDashboard()">Entrar</v-btn>
                        </div>
                        <div class="signup btn"><v-btn type="submit" block
                                @click="navigateToCadastro()">Cadastrar-se</v-btn>
                        </div>
                    </div>
                    <div>
                        <!-- <div><span>Ou, acesse com:</span></div>
                        <div>
                            <span class="another-login">Gooogle</span>
                            <span class="another-login">GitHub</span>
                            <span class="another-login">Facebook</span>
                        </div> -->
                    </div>
                </v-form>
            </v-col>

            <v-col class="side-right" cols="12" md="6">
                <img class="wallet-img" src="../../style/img/wallet.png" alt="">
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LoginComponent',
    data() {
        return {
            usuario: {
                cpf: "",
                password: ""
            },
            dataCurrentUser: {
                userCpf: "",
                userPassword: ""
            }
        };
    },
    methods: {
        async navigateToCadastro() {
            this.$router.push({ path: "/cadastro" }, () => { });
        },
        async getUserData() {

            const cpfUserNoMASK = this.usuario.cpf.replace(/[^\d]/g, '');

            await axios.get(`https://localhost:7112/api/user/cpf/${cpfUserNoMASK}`)
                .then((response) => {

                    const dataUser = response.data;

                    this.dataCurrentUser.userCpf = dataUser.cpf;
                    this.dataCurrentUser.userPassword = dataUser.password;

                    localStorage.setItem("dataUser", JSON.stringify(dataUser));

                    console.log(dataUser);
                })
                .catch((error) => {
                    this.$toast.open({
                        message: 'Usuário não encontrado!',
                        type: 'error',
                    });
                    console.error('Usuário não encontrado!', error);
                }

                );
        },

        async navigateToDashboard() {
            await this.getUserData();
            const cpf = this.usuario.cpf.replace(/\D/g, '');
            this.usuario.cpf = cpf;

            if (this.usuario.cpf == this.dataCurrentUser.userCpf && this.usuario.password == this.dataCurrentUser.userPassword) {

                this.$toast.open({
                    message: 'Entrou!',
                    type: 'success',
                });

                this.$router.push({ path: "/dashboard" }, () => { });

            } else {
                this.$toast.open({
                    message: 'Errouuuu!',
                    type: 'error',
                });
            }
        }
    },
};
</script>

<style></style>