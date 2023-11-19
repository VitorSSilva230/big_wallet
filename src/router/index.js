import Vue from 'vue';
import Router from 'vue-router';

// Importe os componentes para cada rota
import Login from '../components/auth/login/Login.vue';
import Cadastro from '../components/auth/cadastro/Cadastro.vue';
import Dashboard from '../components/views/dashboard/Dashboard.vue';
import Transaction from '../components/views/transaction/Transaction.vue';

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
  }
];

// Crie uma instância do router
const router = new Router({
  routes,
});

// Exporte a instância do router
export default router;
