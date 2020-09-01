<template>
  <div class="container">
    <div class="row">
      <div class="col-12 my-3 pt-3 shadow">
        <img src alt />
        <h1>{{username}}</h1>
        <h3>{{email}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.username = user.displayName;
        this.email = user.email;
      } else {
        this.username = null;
        this.email = null;
      }
    });
  },
  data() {
    return {
      username: "",
      email: "",
    };
  },
};
</script>

<style>
</style>