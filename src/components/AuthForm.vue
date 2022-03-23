<template>
  <div class="close" @keyup.enter="SignIn">
    <div
      class="blackout-form"
      type="button"
      @click="$store.dispatch('setOpenDialogWindow', false)"
    ></div>
    <div class="auth">
      <div class="text-auth">
        Authorization
      </div>
      <div class="user-input">
        <input type="email" v-model="user.email" placeholder="email" v-focus />
        <input type="password" v-model="user.password" placeholder="password" />
      </div>
      <div
        class="go-to-regist"
        @click="$store.dispatch('setOpenDialogWindow', 'regist')"
      >
        Registration?
      </div>
      <div class="btn-user">
        <div
          @click="$store.dispatch('setOpenDialogWindow', false)"
          class="btn-form"
        >
          Close
        </div>
        <div class="btn-form" @click="SignIn">Login</div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase } from "../plugins/firebase";

export default {
  name: "auth",

  data: () => ({
    user: {
      email: "",
      password: ""
    },
    // email_pattern:
    //   "^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$"
  }),

  methods: {
    SignIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(async res => {
          let userInfo = await {
            email: res.user.email,
            name: res.user.displayName,
            uid: res.user.uid,
            photoURL: res.user.photoURL
          };
          this.$store.dispatch("setUser", userInfo);
          this.$store.dispatch("setOpenDialogWindow", false);
          this.$store.dispatch("setLogged", true);
          this.$router
            .push({ path: "/Profile/" + userInfo.uid })
            .catch(() => {});
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  }
};
</script>

<style>
.close {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1000;
}
.blackout-form {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.075);
  width: 100%;
  height: 100%;
}
.auth {
  position: fixed;
  background-color: #fff;
  width: 560px;
  height: 380px;
  border: 1px solid #505050;
  align-self: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
}
.text-auth {
  position: absolute;
  font-size: 24px;
  top: 30px;
  left: 50px;
}
.text-auth::after {
  content: "";
  position: absolute;
  left: -20px;
  top: -30px;
  width: 500px;
  height: 70px;
  border-bottom: 2px solid #505050;
}
.user-input {
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.go-to-regist {
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 30px 55px;
  font-size: 20px;
  cursor: pointer;
  border-bottom: solid 1px #000;
}
.btn-user {
  position: absolute;
  bottom: 10px;
  right: 15px;
  cursor: pointer;
  display: flex;
}
.btn-form {
  padding: 10px;
  font-size: 24px;
  margin: 10px;
}
.btn-form:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.btn-form:active {
  background-color: rgba(0, 0, 0, 0.075);
}
</style>

<style scoped>
input,
input:active,
input:hover,
input:focus {
  outline: none;
  border-radius: 0;
  border: 0px solid #fff;
  border-bottom: 2px solid #000;
  padding: 10px;
  width: 370px;
  font-size: 24px;
}
</style>
