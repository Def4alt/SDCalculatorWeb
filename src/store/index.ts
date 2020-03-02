import Vue from "vue";
import Vuex from "vuex";

import Calculate from "./read";

import { StatModel, BackupModel, ReadModel } from "@/types";

Vue.use(Vuex);

type state = {
    globalStatModels: Array<StatModel>;
    backups: Array<BackupModel>;
    lot: number;
    sdMode: boolean;
};

export default new Vuex.Store({
    state: {
        globalStatModels: Array<StatModel>(),
        backups: Array<BackupModel>(),
        lot: 0,
        sdMode: true
    },
    mutations: {
        setGlobalStatModels(state: state, { globalStatModels }) {
            state.globalStatModels = globalStatModels;
        },

        setLot(state: state, { lot }) {
            state.lot = lot;
        },

        toggleSdMode(state: state) {
            state.sdMode = !state.sdMode;
        }
    },
    actions: {
        calculateStatModels({ commit, state }, files: File[]) {
            Calculate(files, state.globalStatModels, state.sdMode);
        }
    }
});
