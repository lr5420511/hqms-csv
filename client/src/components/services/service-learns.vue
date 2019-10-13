<template>
    <div class="service-learns">
        <com-summary v-for="(cur, i) in learns"
                     :key="i"
                     :icon="cur.icon || ''"
                     :displayTitle="cur.title"
                     :content="cur.content"
        ></com-summary>
    </div>
</template>

<script>
import CommonSummary from '../commons/common-summary.vue';

export default {
    components: {
        'com-summary': CommonSummary
    },
    props: {
        learns: {
            type: Array,
            default: () => []
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../../assets/less/variables.less);
@import url(../../assets/less/mixins/flex-mx.less);

.service-learns {
    .flex-mx();
}
</style>