import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import {mutations} from "./mutations";
import {getters} from "./getters";
import {initialState} from "../types";
import {actions} from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return initialState()
  },
  mutations,
  getters,
  actions,
  modules: {}
});
