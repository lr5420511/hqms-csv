<template>
    <lay-main>
        <template slot="nav">
            <ser-menu @menuMove="toRoute"></ser-menu>
        </template>
        <router-view></router-view>
    </lay-main>
</template>

<script>
import LayoutMain from '../components/layouts/layout-main.vue';
import ServiceMenu from '../components/services/service-menu.vue';

export default {
    components: {
        'lay-main': LayoutMain,
        'ser-menu': ServiceMenu
    },
    methods: {
        toRoute: function(cur) {
            switch(cur.id) {
                case 1: { this.$router.push('/main/csv'); }; break;
                case 2: { this.$router.push('/main/learn'); }; break;
            }
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../assets/less/variables.less);
</style>