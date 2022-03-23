import { firebase } from "../../plugins/firebase";

export default {
  state: {
    uid: "",
    name: "",
    avatar: "",
    sub: ""
  },
  mutations: {
    setAuthorId(state, i) {
      state.uid = i;
    },
    setAuthorInfo(state, i) {
      state.name = i.name;
      state.avatar = i.avatar;
      state.sub = i.sub;
    }
  },
  actions: {
    async getDataOfAuthor(state) {
      let uid = state.state.uid;
      await firebase
        .firestore()
        .collection("users")
        .where("uid", "==", uid)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            const items = {
              name: doc.data().name,
              avatar: doc.data().photoURL,
              sub: "nope" //добавить подписчиков
            };
            state.commit("setAuthorInfo", items);
          });
        });
    },
    getIdAuthor(state, userId) {
      state.commit("setAuthorId", userId);
      this.dispatch("getDataOfAuthor");
    }
  }
};
