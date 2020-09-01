<template>
  <div class="container mt-50">
    <p>
      Aquí podrás chatear con otra de las personas que use la red social,
      solo tienes que elegir con quién quieres hablar
    </p>
    <hr />
    <div class="columns">
      <div class="column is-6 is-offset-1">
        <h3 class="title is-3">Chat virtual</h3>
        <hr />
        <form @submit.prevent="enviarMensaje">
          <div class="field">
            <label class="label">Mensaje:</label>
            <div class="control">
              <textarea v-model="mensaje" name="mensaje" id="mensaje" cols="30" rows="10"></textarea>
            </div>
          </div>
          <button type="submit" class="button is-primary">Enviar Mensaje</button>
        </form>
      </div>
      <div class="column is-6">
        <h3 class="title is-3">Mensajes</h3>
        <hr />
        <div>
          <ul>
            <li v-for="(mensaje, i) in mensajes" :key="i">
              <span
                contenteditable="true"
                @blur="editarMensaje($event, mensaje.key)"
              >{{mensaje.mensaje}}</span>
              <small>
                <i>({{mensaje.username}})</i>
                <i>({{mensaje.pais}})</i>
              </small>
              <button class="button is-danger" @click="eliminarMensaje(mensaje.key)">X</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  created() {
    var user = firebase.auth().currentUser;
    const db = firebase.database();
    if (user) {
      this.username = user.displayName;
    }
    this.recibirDatos(this.username);
    db.ref("/chats").on("value", (snapshot) => {
      var msgs = snapshot.val();
      this.cargarMensajes(msgs)
    });
  },
  data() {
    return {
      mensaje: null,
      username: "",
      pais: "",
      mensajes: [],
    };
  },
  methods: {
    recibirDatos(key) {
      firebase.database().ref("usuarios/"+ key).on("value", snapshot => {
        var user = snapshot.val();
        this.pais = user.pais;
      })
    },
    cargarMensajes(mensajes) {
      this.mensajes = [];
      for (let key in mensajes) {
        this.mensajes.push({
          mensaje: mensajes[key].mensaje,
          username: mensajes[key].username,
          pais: mensajes[key].pais,
          key: key,
        });
      }
    },
    enviarMensaje() {
      const db = firebase.database();
      db.ref("/chats")
        .push({
          mensaje: this.mensaje,
          username: this.username,
          pais: this.pais
        })
        .then((data) => {
          this.mensaje = "";
          console.log(data.key);
        });
    },
    editarMensaje(mensaje, key) {
      const db = firebase.database();
      db.ref("/chats/" + key).update({
        mensaje: mensaje.target.innerHTML,
      });
    },
    eliminarMensaje(key) {
      const db = firebase.database();
      if (confirm("¿Seguro?")) db.ref("/chats/" + key).remove();
    },
  },
};
</script>