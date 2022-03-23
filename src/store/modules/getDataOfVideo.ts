import { firebase } from "../../plugins/firebase";
import store from "../index";

export default {
  state: {
    listVideos: [],
    listUserVideos: []
  },
  mutations: {
    setListVideos(state, i) {
      state.listVideos = i;
    },
    setListUserVideos(state, i) {
      state.listUserVideos = i;
    },
    clearListUserVideo(state, i) {
      state.listUserVideos = i;
    }
  },
  actions: {
    setListVideo(list, i) {
      list.commit("clearListUserVideo", i);
    },
    async getDataOfVideos(list) {
      const videos = [];
      await firebase
        .firestore()
        .collection("videos")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            const items = {
              id: doc.id,
              uid: doc.data().uid,
              title: doc.data().title,
              description: doc.data().description,
              url: doc.data().url,
              preview: doc.data().preview
            };
            videos.push(items);
            list.commit("setListVideos", videos);
          });
        });
    },
    async getUserVideo(list, i) {
      const videos = [];
      await firebase
        .firestore()
        .collection("videos")
        .where("uid", "==", i)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            const items = {
              id: doc.id,
              uid: doc.data().uid,
              title: doc.data().title,
              description: doc.data().description,
              url: doc.data().url,
              preview: doc.data().preview
            };
            videos.push(items);
            list.commit("setListUserVideos", videos);
          });
        });
    }
  }
};
