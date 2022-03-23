<template>
  <div id="app">
    <Navbar></Navbar>
    <transition name="openDialogAnimation">
      <AuthForm v-if="$store.state.isOpenDialogWindow == 'login'" />
      <Regist v-if="$store.state.isOpenDialogWindow == 'regist'"></Regist>
    </transition>
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import AuthForm from "./components/AuthForm";
import Regist from "./components/RegistForm";
import { firebase } from "./plugins/firebase";

export default {
  name: "app",
  components: {
    Navbar,
    AuthForm,
    Regist
  },
  methods: {
    getCurrentUser() {
      firebase.auth().onAuthStateChanged(async user => {
        if (user !== null) {
          await this.$store.dispatch("setUser", {
            email: user.email,
            name: user.displayName,
            uid: user.uid,
            photoURL: user.photoURL
          });
          this.$store.dispatch("setLogged", true);
          if (this.$router.history.current.name == "Profile")
            this.$store.dispatch("getUserVideo");
        }
      });
    }
  },
  async mounted() {
    await this.getCurrentUser();
  }
};
</script>

<style>
@font-face {
  font-family: "Roboto Regular";
  font-style: normal;
  font-weight: regular;
  src: url("../public/font/Roboto/Roboto-Regular.ttf");
}

#app {
  font-family: "Roboto Regular";
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
.openDialogAnimation-enter-active {
  transition: all 0.3s ease-in-out;
}
.openDialogAnimation-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.openDialogAnimation-enter,
.openDialogAnimation-leave-to {
  transform: translate3d(10px);
  opacity: 0;
}
::-webkit-scrollbar-button {
  background-repeat: no-repeat;
  width: 5px;
  height: 0px;
}
::-webkit-scrollbar-track {
  background-color: #ecedee;
}
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 0px;
  border-radius: 25px;
  background-color: #009fc2;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #009fc2;
}
::-webkit-resizer {
  background-repeat: no-repeat;
  width: 6px;
  height: 0px;
}
::-webkit-scrollbar {
  width: 6px;
}
</style>
