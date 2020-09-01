<template>
  <div class="container mt-50">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <h3 class="title is-3">Crear una cuenta</h3>
        <hr />
        <form action="#" @submit.prevent="register">
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input class="input" type="text" placeholder="e.g Pedro Perez" v-model="name" />
            </div>
          </div>

          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                class="input"
                type="email"
                placeholder="e.g. pedroperez123@gmail.com"
                v-model="email"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Contraseña</label>
            <div class="control">
              <input class="input" type="password" v-model="password" />
            </div>
          </div>

          <div class="field">
            <label class="label">País</label>
            <div class="select">
              <select v-model="pais">
                <option disabled value>Seleccione un país</option>
                <option v-for="(pais, id) in paises" :key="id">{{pais.name}}</option>
              </select>
            </div>
          </div>

          <button type="submit" class="button is-primary">Registrarme</button>
        </form>

        <div class="notification is-danger mt-10" v-if="error">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      pais: "",
      error: "",
      paises: [],
    };
  },
  created() {
    this.getPaises();
  },
  name: "Register",
  methods: {
    register() {
      this.error = "";
      if (this.name && this.email && this.password && this.pais) {
        firebase
          .database()
          .ref("/usuarios/" + this.name)
          .set({
            username: this.name,
            email: this.email,
            pais: this.pais,
          });
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((user) => {
            //actualizar el usuario
            if (user) {
              user.user
                .updateProfile({
                  displayName: this.name,
                })
                .then(() => {
                  this.name = "";
                  this.email = "";
                  this.password = "";
                  this.pais = "";
                  this.$router.push({ name: "dashboard" });
                })
                .catch((err) => {
                  this.error = err.message;
                });
            }
          })
          .catch((err) => {
            this.error = err.message;
          });
      } else {
        this.error = "Todos los campos son requeridos";
      }
    },
    getPaises() {
      axios
        .get("https://restcountries.eu/rest/v2/all?fields=name")
        .then((respuesta) => {
          this.paises = respuesta.data;
        });
    },
  },
};
</script>
