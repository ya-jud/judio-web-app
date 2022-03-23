import Vue from "vue";
import Vuex from "vuex";
import { firebase } from "../plugins/firebase";

import getDataOfVideo from "./modules/getDataOfVideo";
import getDataOfAuthor from "./modules/getDataOfAuthor";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isOpenDialogWindow: false,
    user: {
      uid: "",
      name: "",
      email: "Anon",
      photoURL:
        "https://firebasestorage.googleapis.com/v0/b/judio-10aa1.appspot.com/o/users%2Favatars%2Fdefault-avatar.jpg?alt=media&token=bb03c08d-8e99-492a-b0c9-2fab89fef8f3"
    },
    video: {
      id: "",
      url: "",
      title: "",
      description: "",
      preview:
        "https://firebasestorage.googleapis.com/v0/b/judio-10aa1.appspot.com/o/videos%2Fpreviews%2Fdefault-preview.jpg?alt=media&token=c2b3b050-e1c9-4c6c-84cc-27f1bf8bd209",
      tags: []
    },
    Logged: false,
    navbarIsActive: false,
    localVideo: {
      urlVideo: "",
      fileVideo: "",
      videoIsActive: false
    },
    localPreview: {
      urlImage:
        "https://firebasestorage.googleapis.com/v0/b/judio-10aa1.appspot.com/o/videos%2Fpreviews%2Fdefault-preview.jpg?alt=media&token=c2b3b050-e1c9-4c6c-84cc-27f1bf8bd209",
      fileImage: "",
      imageIsActive: false
    },
    id: ""
  },
  mutations: {
    setOpenDialogWindow(state, i) {
      state.isOpenDialogWindow = i;
    },
    setUser(state, i) {
      state.user = i;
    },
    setLogged(state, i) {
      state.Logged = i;
    },
    setNavbarIsActive(state, i) {
      state.navbarIsActive = i;
    },
    uplVideo(state, i) {
      state.video.url = i;
    },
    uplImage(state, i) {
      state.video.preview = i;
    },
    setVideo(state, i) {
      state.localVideo.urlVideo = i.url;
      state.localVideo.fileVideo = i.file;
      state.localVideo.videoIsActive = i.active;
    },
    setPreview(state, i) {
      state.localPreview.urlImage = i.url;
      state.localPreview.fileImage = i.file;
      state.localPreview.imageIsActive = i.active;
    },
    setIngoVideo(state, i) {
      (state.video.title = i.title),
        (state.video.description = i.description),
        (state.video.tags = i.tags);
    },
    setIdVideo(state, i) {
      state.id = i;
    }
  },
  actions: {
    async setIdVideo(id, i) {
      await id.commit("setIdVideo", i);
    },
    setInfoVideo(info, i) {
      info.commit("setIngoVideo", i);
    },
    setVideo(video, i) {
      video.commit("setVideo", i);
    },
    setPreview(preview, i) {
      preview.commit("setPreview", i);
    },
    setOpenDialogWindow(isOpenDialogWindow, i) {
      isOpenDialogWindow.commit("setOpenDialogWindow", i);
    },
    async setUser(user, i) {
      await user.commit("setUser", i);
    },
    setLogged(Logged, i) {
      Logged.commit("setLogged", i);
    },
    setNavbarIsActive(setNavbarIsActive, i) {
      setNavbarIsActive.commit("setNavbarIsActive", i);
    },
    async uploadVideo(uplFile, i) {
      var storageRef = firebase.storage();
      try {
        await storageRef
          .ref()
          .child("videos/" + i.video.name)
          .put(i.video);
        if (this.state.video.preview != this.state.localPreview.urlImage) {
          await storageRef
            .ref()
            .child("videos/previews/" + i.image.name)
            .put(i.image);
        }
        // await j.on("state_changed", (snapshot) => { //не знаю как сделать прогрессбар, ибо он возвращает промис, из-за чего ломается загрузка
        //   const progress =
        //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //   console.log("Upload is " + progress + "% done");
        // });
        let urlV = await storageRef
          .ref()
          .child("videos/" + i.video.name)
          .getDownloadURL();
        uplFile.commit("uplVideo", urlV);
        let urlI = await storageRef
          .ref()
          .child("videos/previews/" + i.image.name)
          .getDownloadURL();
        uplFile.commit("uplImage", urlI);
      } catch (error) {
        console.log(error);
      }
    },
    async addObj(state, i) {
      await this.dispatch("uploadVideo", i);
      await firebase
        .firestore()
        .collection("videos")
        .add({
          uid: this.state.user.uid,
          url: this.state.video.url,
          title: this.state.video.title,
          description: this.state.video.description,
          preview: this.state.video.preview,
          tags: this.state.video.tags
        })
        .then(doc => {
          this.dispatch("setIdVideo", doc.id);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  modules: {
    dataOfVideo: getDataOfVideo,
    dataOfAuthor: getDataOfAuthor
  }
});
