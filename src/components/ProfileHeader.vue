<template>
  <header class="profile-header">
    <div class="user-avatar">
      <img :src="$store.state.dataOfAuthor.avatar" alt="" />
    </div>
    <div class="user-info">
      <span class="user-nickname">{{ $store.state.dataOfAuthor.name }}</span>
      <div class="user-subscribers">
        <span><font color="#DA2222">232301</font> subscribers</span>
      </div>
    </div>
    <div class="user-action">
      <div
        class="user-settings"
        @click="$router.push({ path: '/Settings' }).catch(() => {})"
      >
        <span class="material-icons-outlined">settings</span>
      </div>
      <div
        class="user-btn"
        @click="$router.push({ path: '/AddVideo' }).catch(() => {})"
      >
        Add video
      </div>
    </div>
  </header>
</template>

<script>
import { firebase } from "../plugins/firebase";

export default {
  name: "AppHeader",

  data: () => ({
    urlVideo: ""
  }),

  methods: {
    addVideo() {
      let post = {
        urlVideo: this.urlVideo
      };
      firebase
        .database()
        .ref("users/testUser/userVideo/")
        .push(post);
    }
  },
  watch: {
    "$route.params": async function() {
      await this.$store.dispatch(
        "getIdAuthor",
        this.$router.history.current.params.id
      );
    }
  },
  async mounted() {
    await this.$store.dispatch(
      "getIdAuthor",
      this.$router.history.current.params.id
    );
  }
};
</script>

<style>
.profile-header {
  position: relative;
  width: 80%;
  height: 230px;
  border-bottom: solid 2px #000;
  display: flex;
  align-items: center;
}
.user-avatar {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  width: 150px;
  height: 150px;
  margin: 40px;
  cursor: pointer;
}
.user-avatar > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.user-nickname {
  font-size: 36px;
}
.user-subscribers {
  font-size: 20px;
  display: flex;
  justify-content: center;
  border: solid 1px #000;
  border-radius: 4px;
}
.user-action {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
}
.user-btn {
  background-color: #008baa;
  font-size: 36px;
  color: #fff;
  border: solid 1px #000;
  border-radius: 7px;
  padding: 5px 15px;
  margin-right: 40px;
  cursor: pointer;
}
.user-settings {
  color: #505050;
  border: solid 2px #000;
  border-radius: 7px;
  margin: 25px;
  padding: 5px;
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.user-settings:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.user-settings:active {
  background-color: rgba(0, 0, 0, 0.075);
}
</style>
