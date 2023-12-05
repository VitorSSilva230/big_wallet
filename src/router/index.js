import Vue from 'vue';
import Router from 'vue-router';

// Importe os componentes para cada rota
import Login from '../components/auth/login/Login.vue';
import Cadastro from '../components/auth/cadastro/Cadastro.vue';
import Dashboard from '../components/views/dashboard/Dashboard.vue';
import Transaction from '../components/views/transaction/Transaction.vue';
import Profile from "../components/views/profile/Profile.vue";
import Menu from "../components/views/menu/Menu.vue";
import Wallet from "../components/views/wallet/Wallet.vue";
import History from "../components/views/transactionHistory/History.vue";
import TransactionMain from "../components/views/transaction/transactionMain.vue";


// Use o Vue Router
Vue.use(Router);

// Defina as rotas
const routes = [
  
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: Cadastro,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/transaction',
    name: 'transaction',
    component: Transaction,
  },
  {
    path:'profile',
    name: 'profile',
    component: Profile,
  },
  {
    path:'/menu',
    name: 'menu',
    component: Menu,
  },
  {
    path:'/wallet',
    name:'wallet',
    component: Wallet,
  },
  {
    path:'/history',
    name:'history',
    component: History,
  },
  {
    path:'/transactionMain',
    name:'transactionMain',
    component: TransactionMain,
  }
];

// Crie uma instância do router
const router = new Router({
  routes,
});

// Exporte a instância do router
export default router;
