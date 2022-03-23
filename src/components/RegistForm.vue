<template>
  <div class="close">
    <div
      class="blackout-form"
      type="button"
      @click="$store.dispatch('setOpenDialogWindow', false)"
    ></div>
    <div class="regist">
      <div class="textRegist">
        Registration
      </div>
      <div class="userInput">
        <input v-model="user.name" placeholder="Your name" />
        <input type="email" v-model="user.email" placeholder="Email" v-focus />
        <input type="password" v-model="user.password" placeholder="Password" />
        <input
          type="password"
          v-model="user.repeatPassword"
          placeholder="Repeat password"
        />
      </div>
      <div class="btnUser">
        <div
          @click="$store.dispatch('setOpenDialogWindow', false)"
          class="btnForm"
        >
          Close
        </div>
        <div class="btnForm" @click="CreateNewAccount">Registration</div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase } from "../plugins/firebase";

export default {
  name: "regist",

  data: () => ({
    user: {
      email: "",
      name: "",
      password: "",
      repeatPassword: ""
    }
  }),

  methods: {
    CreateNewAccount() {
      if (this.user.password == this.user.repeatPassword) {
        const authFB = firebase.auth();
        authFB
          .createUserWithEmailAndPassword(this.user.email, this.user.password)
          .then(async res => {
            await authFB.currentUser.updateProfile({
              photoURL:
                "https://firebasestorage.googleapis.com/v0/b/judio-10aa1.appspot.com/o/users%2Favatars%2Fdefault-avatar.jpg?alt=media&token=bb03c08d-8e99-492a-b0c9-2fab89fef8f3",
              displayName: this.user.name
            });
            firebase
              .firestore()
              .collection("users")
              .add({
                email: res.user.email,
                name: res.user.displayName,
                uid: res.user.uid,
                photoURL: res.user.photoURL
              });
            this.$store.dispatch("setUser", {
              email: res.user.email,
              name: res.user.displayName,
              uid: res.user.uid,
              photoURL: res.user.photoURL
            });
            this.$store.dispatch("setOpenDialogWindow", false);
            this.$store.dispatch("setLogged", true);
            this.$router
              .push({ path: "/Profile/" + res.user.uid })
              .catch(() => {});
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        console.log("error! пароли не совпадают");
      }
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
.regist {
  position: fixed;
  background-color: #fff;
  width: 560px;
  height: 440px;
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
.textRegist {
  position: absolute;
  font-size: 24px;
  top: 30px;
  left: 50px;
}
.textRegist::after {
  content: "";
  position: absolute;
  left: -20px;
  top: -30px;
  width: 500px;
  height: 70px;
  border-bottom: 2px solid #505050;
}
.userInput {
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.btnUser {
  position: absolute;
  bottom: 10px;
  right: 15px;
  cursor: pointer;
  display: flex;
}
.btnForm {
  padding: 10px;
  font-size: 24px;
  margin: 10px;
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
