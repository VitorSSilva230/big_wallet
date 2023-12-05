<template>
  <v-app>
    <!-- Menu Lateral -->
    <v-navigation-drawer v-if="showDrawer" app :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer">
      <!-- Conteúdo do menu lateral aqui -->
      <v-list>
        <v-list-item>
          <v-list-item-icon>
            <img src="../src/components/style/img/icon_profile.png" alt="">
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ dataUser.name }}</v-list-item-title>
            <v-list-item-subtitle>{{dataUser.email}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <!-- Adicione mais itens conforme necessário -->
      </v-list>
      <v-list dense nav>
        <router-link to="/dashboard" tag="li" style="list-style: none;">
          <v-list-item link>
            <v-list-item-icon>
              <img src="../src/components/style/img/icon_dashboard.png" alt="">
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>DashBoard</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link to="/wallet" tag="li" style="list-style: none;">
          <v-list-item link>
            <v-list-item-icon>
              <img src="../src/components/style/img/icon_wallet.png" alt="">
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>My Wallet</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link to="/transactionMain" tag="li" style="list-style: none;">
          <v-list-item link>
            <v-list-item-icon>
              <img src="../src/components/style/img/icon_swap.png" alt="">
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>SWAP</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        
        <router-link to="/" tag="li" style="list-style: none;">
          <v-list-item link>
            <v-list-item-icon>
              <img src="../src/components/style/img/icon_transactions.png" alt="">
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Transactions</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <v-list-item></v-list-item>
        <v-list-item></v-list-item>
        <v-list-item></v-list-item>
        <v-list-item></v-list-item>
        <v-list-item></v-list-item>
        <v-list-item></v-list-item>

        <v-list-item @click="logout()">
          <v-list-item-icon>
            <img src="../src/components/style/img/icon_logout.png" alt="">
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>


    </v-navigation-drawer>

    <!-- Conteúdo Principal -->
    <v-app-bar v-if="showAppBar" app>
      <!-- Ícone para expandir/retrair menu lateral em telas pequenas -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"> <img src="../src/components/style/img/icon_drawer.png"
          alt=""></v-app-bar-nav-icon>

      <!-- Título do Aplicativo -->
      <v-toolbar-title>Crie uma carteira de criptomoedas do seu jeito - Big Wallet Simulate</v-toolbar-title>

    </v-app-bar>

    <!-- Conteúdo da Página -->
    <v-main>
      <v-container fluid>
        <!-- Conteúdo da sua página aqui -->
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>


<script>

export default {
  name: 'App',
  components: {
  }, data() {
    return {
      drawer: null,
      dataUser: {}
    }
  },
  computed: {
    showDrawer() {
      // Exibir menu lateral apenas quando não estiver na tela de login ou cadastro
      return !['/login', '/cadastro'].includes(this.$route.path);
    },
    showAppBar() {
      // Exibir barra superior apenas quando não estiver na tela de login ou cadastro
      return !['/login', '/cadastro'].includes(this.$route.path);
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ path: "/login" }, () => { });
      
    }
  },
  beforeMount() {
    this.dataUser = JSON.parse(localStorage.getItem("dataUser"));
  }
};
</script>
