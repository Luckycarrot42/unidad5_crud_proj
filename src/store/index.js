import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    patients: [],
    patient: undefined
  },
  mutations: {
    SET_PATIENTS(state, patients){
      state.patients = patients
    },
    SET_PATIENT(state, patient){
      state.patient = patient
    }
  },
  actions: {
    setPatients({commit}) {
      Axios.get('https://us-central1-crudproject-d4b3f.cloudfunctions.net/api/patients/')
      .then((response) => {
        commit('SET_PATIENTS', response.data)
      })
    },
    setPatient({commit}, id) {
      Axios.get(`https://us-central1-crudproject-d4b3f.cloudfunctions.net/api/patients/${id}`)
      .then((response) => {
        commit('SET_PATIENT', response.data) //commit llama a mutaciones
      })
    },
    submitPatient({dispatch}, patient) {
      Axios.post('https://us-central1-crudproject-d4b3f.cloudfunctions.net/api/patients/', patient)
      .then(() => {
        dispatch('setPatients') //dispatch llama a otras acciones
      })
    },
    deletePatient({dispatch}, id) {
      Axios.delete(`https://us-central1-crudproject-d4b3f.cloudfunctions.net/api/patients/${id}`)
      .then(() => {
        dispatch('setPatients') //dispatch llama a otras acciones
      })
    },
    updatePatient({dispatch}, patient) {
      Axios.put(`https://us-central1-crudproject-d4b3f.cloudfunctions.net/api/patients/${patient.id}`, patient.data)
      .then(() => {
        dispatch('setPatients') //dispatch llama a otras acciones
      })
    }
  },
  modules: {
  }
})
