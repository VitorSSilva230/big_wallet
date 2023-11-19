<template>
    <v-container class="container-login">
        <v-form class="form-login">
            <div class="logo"> <img src="" alt="logo"> </div>
            <div class="title"> <span>Seja bem-vindo </span> </div>
            <div class="sub-title"> <span>Acesse sua conta e aproveite todos os cursos</span> </div>
            <div class="form-data">
                <div class="email">
                    <v-text-field 
                    label="Email"
                    type="email"
                    hint="Insira um email válido">
                    </v-text-field>
                </div>
                <div class="password">
                    <v-text-field 
                    label="Senha"
                    type="password"
                    hint="Mínimo 8 caracteres">
                    </v-text-field>
                </div>
            </div>
            <div class="click-data">
                <div class="connect"><span></span></div>
                <div class="forgot-password"><span></span></div>
            </div>
            <div class="buttons">
                <div class="login"><v-btn type="submit">Entrar</v-btn></div>
                <div class="signup"><v-btn type="submit">Cadastrar-se</v-btn></div>
            </div>
            <div>
                <div><span>Ou, acesse com:</span></div>
                <div>
                    <span class="another-login">Gooogle</span>
                    <span class="another-login">GitHub</span>
                    <span class="another-login">Facebook</span>
                </div>
            </div>
        </v-form>
        <div class="img-login"> <img src="../../img/fundo_login.png" alt=""> </div>
    </v-container>
</template>

<script>
export default {
    name: 'LoginComponent',
  data() {
    return {
      // Seus dados aqui
    };
  },
  methods: {
    // Seus métodos aqui
  },
  // Outras opções como computed, props, etc.
};
</script>