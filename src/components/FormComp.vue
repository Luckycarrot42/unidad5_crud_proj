<template>
  <div>
    <h3>Ingresar paciente al registro</h3>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Nombre</label>
        <input v-model="currentPatient.data.name" type="text" class="form-control">
      </div>
      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input v-model="currentPatient.data.email" type="email" class="form-control">
      </div>
      <button class="btn btn-primary">{{ currentPatient.id ? 'Editar' : 'Crear' }}</button> 
    </form>  
  </div>  
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'form-comp',
  props: {
    currentPatient:{
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions(['submitPatient']),
    submitForm() {
      if(this.currentPatient.id) { //si existe id, editamos
        this.$emit('edit-patient', this.currentPatient) 
      }else{ //si no, creamos nuevo paciente
        this.createPatient() 
      }
      this.cleanCurrentPatient()
    },
    createPatient() {
      const patient = {
        name: this.currentPatient.data.name,
        email: this.currentPatient.data.email,
      }
      this.submitPatient(patient)  //metodo del store que realiza comunicacion con  
    },
    cleanCurrentPatient() {
      this.currentPatient.data.name = '',
      this.currentPatient.data.email = ''
      }
  }
}
</script>

<style>

</style>