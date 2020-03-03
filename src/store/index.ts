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
    files: File[];
};

export default new Vuex.Store({
    state: {
        globalStatModels: Array<StatModel>(),
        backups: Array<BackupModel>(),
        lot: 0,
        sdMode: true,
        files: [] as File[]
    },
    mutations: {
        setGlobalStatModels(state: state, globalStatModels) {
            state.globalStatModels = globalStatModels;
        },

        setLot(state: state, lot) {
            state.lot = lot;
        },

        toggleSdMode(state: state) {
            state.sdMode = !state.sdMode;
        },

        setFiles(state: state, files) {
            state.files = files;
        }
    },
    actions: {
        calculateStatModels({ commit, state }) {
            Calculate(
                state.files,
                state.globalStatModels,
                state.sdMode
            ).then(models => commit("setGlobalStatModels", models));
        }
    }
});
