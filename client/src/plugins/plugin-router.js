import Vue from 'vue';
import VueRouter from 'vue-router';

import ViewMain from '../views/view-main.vue';
import ViewCsv from '../views/view-csv.vue';
import ViewLearn from '../views/view-learn.vue';
// import view components to here!

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            redirect: '/main'
        },
        {
            path: '/main',
            component: ViewMain,
            children: [
                {
                    path: 'csv',
                    component: ViewCsv
                },
                {
                    path: 'learn',
                    component: ViewLearn
                }
            ]
        }
    ]
});