<template>
    <com-group :blockWidth="tabWidth"
               :hasIcon="iconify"
               :cursor="cursorMode"
               :items="tabs"
               v-model="currentIndex"
               @input="tabClick"
    ></com-group>
</template>

<script>
import CommonGroup from '../commons/common-group.vue';

export default {
    components: {
        'com-group': CommonGroup
    },
    props: {
        tabWidth: {
            type: Number,
            default: 3,
            validator: val => val > 0
        }
    },
    data: () => ({
        iconify: true,
        cursorMode: 'bottom',
        tabs: [
            { id: 1, icon: 'csv', text: ' 下载CSV文件 ' },
            { id: 2, icon: 'learn', text: ' 教 程 ' }
        ],
        currentIndex: 0
    }),
    methods: {
        tabClick: function(_, cur) {
            this.$emit('menuMove', cur, this);
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../../assets/less/variables.less);
</style>