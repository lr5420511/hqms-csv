<template>
    <com-multiple :realHeight="textHeight"
                  :preview="tip"
                  :initFocus="focusable"
                  :value="value"
                  @input="directiveChanged"
                  @emitEnterDown="commitEnter"
    ></com-multiple>
</template>

<script>
import CommonMultiple from '../commons/common-multiple.vue';

export default {
    components: {
        'com-multiple': CommonMultiple
    },
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    data: () => ({
        textHeight: 1,
        tip: '键入指令后，按下Enter键提交',
        focusable: true
    }),
    methods: {
        directiveChanged: function(value) {
            this.$emit('input', value, this);
        },
        commitEnter: function(value) {
            this.$emit('emitDirectiveEnter', value, this);
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../../assets/less/variables.less);
</style>