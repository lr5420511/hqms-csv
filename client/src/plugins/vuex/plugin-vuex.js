import Vue from 'vue';
import Vuex from 'vuex';

import storeCsvs from './modules/store-csvs';
import storeDirective from './modules/store-directive';
import storeLearns from './modules/store-learns';
// import store modules to here!

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        csvs: storeCsvs,
        directive: storeDirective,
        learns: storeLearns
    }
});