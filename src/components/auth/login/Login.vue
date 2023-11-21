<template>
    <v-container class="container-login">
        <v-form class="form-login">
            <div class="logo"> <img src="" alt="logo"> </div>
            <div class="title"> <span>Wellcome to Big Wallet </span> </div>
            <div class="sub-title"> <span>Simule em tempo real transações de criptomoedas famosas no mercado</span> </div>
            <div class="form-data">
                <div class="cpf">
                    <v-text-field 
                    v-model="usuario.cpf"
                    v-mask="'###.###.###-##'"
                    label="CPF"
                    type="text">
                    </v-text-field>
                </div>
                <div class="password">
                    <v-text-field 
                    v-model="usuario.password"
                    label="Senha"
                    type="password">
                    </v-text-field>
                </div>
            </div>
            <div class="click-data">
                <div class="connect"><span></span></div>
                <div class="forgot-password"><span></span></div>
            </div>
            <div class="buttons">
                <div class="login"><v-btn type="submit" block  @click="navigateToDashboard()">Entrar</v-btn></div>
                <div class="signup">
                    <v-btn type="submit"  @click="navigateToCadastro()">Cadastrar-se</v-btn>
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
        <div class="img-login"> </div>
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
        await axios.get(`https://localhost:7112/api/user/cpf/${this.usuario.cpf}`)
                .then((response) => {

                    const dataUser = response.data;
                    
                    this.dataCurrentUser.userCpf = dataUser.cpf;
                    this.dataCurrentUser.userPassword= dataUser.password ;

                    localStorage.setItem("dataUser", JSON.stringify(dataUser));

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
      await  this.getUserData();

        if(this.usuario.cpf == this.dataCurrentUser.userCpf && this.usuario.password == this.dataCurrentUser.userPassword) {
            
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