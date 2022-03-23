<template>
  <div class="nav-blackout">
    <div
      class="blackout"
      v-if="$store.state.navbarIsActive == true"
      type="button"
      @click="$store.dispatch('setNavbarIsActive', false)"
    ></div>
    <nav class="navbar" :class="{ activeNavbar: $store.state.navbarIsActive }">
      <div
        class="nav-buttons"
        :class="{ activeIcons: $store.state.navbarIsActive }"
      >
        <ButtonComponent
          v-for="info in dataOfButton"
          :key="info.index"
          :class="info.class"
          @click.native="info.method"
        >
          <span slot="icon" class="material-icons-outlined">{{
            info.icon
          }}</span>
          <span slot="text">{{ info.text }}</span>
        </ButtonComponent>
        <div
          class="info-for-anon"
          v-show="$store.state.navbarIsActive"
          v-if="$store.state.Logged == false"
        >
          <div class="text-block">
            To get more features, you need to create a new one or log into your
            account.
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import ButtonComponent from "./Button-component";
import { firebase } from "../plugins/firebase";

export default {
  name: "Navbar",
  components: {
    ButtonComponent
  },
  methods: {
    async outAccount() {
      await firebase
        .auth()
        .signOut()
        .then(() => {
          let userInfo = {
            email: "Anon",
            userId: ""
          };
          this.$store.dispatch("setUser", userInfo);
          this.$store.dispatch("setListVideo", []);
          this.$store.dispatch("setLogged", false);
          this.$router.push({ path: "/Home" });
        })
        .catch(error => {
          console.log(error);
        });
    },
    actionNavbar() {
      return "width: 370";
    }
  },
  computed: {
    dataOfButton: {
      get() {
        if (this.$store.state.Logged) {
          return [
            {
              class: "menu-btn",
              icon: "menu",
              text: "Menu",
              method: () => {
                this.$store.dispatch(
                  "setNavbarIsActive",
                  !this.$store.state.navbarIsActive
                );
              }
            },
            {
              class: "avatar-btn",
              icon: "account_circle",
              text: "Your profile",
              method: () => {
                const uid = this.$store.state.user.uid;
                //(this.$router.history.current.params.id) ?
                this.$router.push({ path: "/Profile/" + uid }).catch(() => {});
                // : ""
                this.$store.dispatch("setNavbarIsActive", false);
              }
            },
            {
              class: "home-btn",
              icon: "home",
              text: "Home",
              method: () => {
                this.$router.push({ path: "/Home" }).catch(() => {});
                this.$store.dispatch("setNavbarIsActive", false);
              }
            },
            {
              class: "messenger-btn",
              icon: "chat",
              text: "Messenger",
              method: () => {
                this.$router.push({ path: "/Messenger" }).catch(() => {});
                this.$store.dispatch("setNavbarIsActive", false);
              }
            },
            {
              class: "settings-btn",
              icon: "settings",
              text: "Settings",
              method: () => {
                this.$router.push({ path: "/Settings" }).catch(() => {});
                this.$store.dispatch("setNavbarIsActive", false);
              }
            },
            {
              class: "statistics-btn",
              icon: "assessment",
              text: "Statistics",
              method: () => {
                this.$router.push({ path: "/Statistics" }).catch(() => {});
                this.$store.dispatch("setNavbarIsActive", false);
              }
            },
            {
              class: "new-video-btn",
              icon: "add_circle",
              text: "Add video",
              method: () => {
                this.$router.push({ path: "/AddVideo" }).catch(() => {});
                this.$store.dispatch("setNavbarIsActive", false);
              }
            },
            {
              class: "exit-btn",
              icon: "logout",
              text: "Exit",
              method: this.outAccount
            }
          ];
        }
        if (!this.$store.state.Logged) {
          return [
            {
              class: "menu-btn",
              icon: "menu",
              text: "Menu",
              method: () => {
                this.$store.dispatch(
                  "setNavbarIsActive",
                  !this.$store.state.navbarIsActive
                );
              }
            },
            {
              class: "avatar-btn",
              icon: "account_circle",
              text: this.$store.state.user.email,
              method: () => {
                this.$store.dispatch("setOpenDialogWindow", "login");
              }
            },
            {
              class: "home-btn",
              icon: "home",
              text: "Home",
              method: () => {
                this.$router.push({ path: "/Home" }).catch(() => {});
                this.$store.dispatch("setNavbarIsActive", false);
              }
            },
            {
              class: "user-add-btn",
              icon: "person_add_alt",
              text: "Registration",
              method: () => {
                this.$store.dispatch("setOpenDialogWindow", "regist");
              }
            },
            {
              class: "sign-in-btn",
              icon: "login",
              text: "Login",
              method: () => {
                this.$store.dispatch("setOpenDialogWindow", "login");
              }
            }
          ];
        }
      }
    }
  }
};
</script>

<style>
@import "~material-icons/iconfont/material-icons.css";

.blackout {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.075);
  width: 100%;
  height: 100%;
  z-index: 200;
}
.navbar {
  background-color: white;
  position: fixed;
  left: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 90px;
  height: 100%;
  border-right: 1px solid #505050;
  z-index: 200;
  transition: all 0.15s ease-in-out;
}
.activeNavbar {
  width: 370px;
  transition: all 0.15s ease-in-out;
}
.nav-buttons {
  position: relative;
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.material-icons-outlined {
  color: #505050;
  font-size: 40px;
}
.menu-btn {
  border-bottom: 1px solid #505050;
  display: flex;
  align-items: center;
  font-weight: 600;
}
.sign-in-btn,
.exit-btn {
  position: absolute;
  border-top: 1px solid #505050;
  display: flex;
  bottom: 0;
  font-weight: 600;
}
.info-for-anon {
  animation: infoAction 0.2s;
  background-color: white;
  font-size: 24px;
  width: 100%;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
}
@keyframes infoAction {
  0% {
    opacity: 0;
    transform: translate(-400px);
  }
  50% {
    opacity: 0;
    transform: translate(-200px);
  }
  100% {
    opacity: 1;
  }
}
.text-block {
  background-color: #f0f0f0;
  padding: 20px;
  width: 240px;
  height: 150px;
  color: #505050;
  text-align: center;
  letter-spacing: 2px;
  line-height: 30px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
}
.activeIcons {
  align-items: flex-start;
}
a {
  text-decoration: none;
  color: black;
}
</style>
