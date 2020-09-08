<template>
  <div class="about">
    <div class="container">
      <h1>Ingreso de Pacientes</h1>
      <hr>
      <form-comp @edit-patient='patientUpdater' :currentPatient="currentPatient"></form-comp>
      <h3>Pacientes Ingresados</h3>
      <ul>
        <li v-for="patient in patients" :key="patient.id">
          <div>
            {{ patient.data.name }} - {{ patient.data.email }}
            <button @click="deletePatient(patient.id)" class="btn btn-danger">Borrar</button>
            <button @click="setCurrentPatient(patient)" class="btn btn-info">Editar</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import FormComp from '../components/FormComp'

export default {
  data () {
    return {
      currentPatient: {
        data: {
          name: '',
          price: 0,
          picture: '',
        },
        id: undefined
      }
    }
  },
  components: {
    FormComp
  },
  computed: {
    ...mapState(['patients'])
  },
  methods: {
    ...mapActions(['setPatients', 'deletePatient', 'updatePatient']),
    setCurrentPatient(patient){
      this.currentPatient = patient
    },
    patientUpdater(patient){
      const newPatient = {
        data: {
          name: patient.data.name,
          email: patient.data.email,
        },
        id: patient.id
      }
      this.updatePatient(newPatient)
    },
  },
  created() {
    this.setPatients() //carga lista existente al crear la página
  }
}
</script>

<style scoped>
  ul li{
    list-style-type: none;
  }
</style>
