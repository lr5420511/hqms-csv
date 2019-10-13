<template>
    <div class="view-learn">
        <div class="view-learn-prefix">使用这个系统需要首先阅读以下教程</div>
        <ser-learns :learns="$store.getters.learns"
        ></ser-learns>
    </div>
</template>

<script>
import ServiceLearns from '../components/services/service-learns.vue';
import { LEARN_PATH } from '../config';

export default {
    components: {
        'ser-learns': ServiceLearns
    },
    created: async function() {
        if(this.$store.getters.learns.length) return;
        let res;
        try {
            res = await fetch(LEARN_PATH);
            res = await res.json();
        } catch(err) {
            const forecastable = [SyntaxError, TypeError].some(cur => err instanceof cur);
            if(!forecastable) throw err;
            return console.log(err);
        }
        this.$store.commit('fillLearns', { learns: res });
    }
};
</script>

<style lang="less" scoped>
@import url(../assets/less/variables.less);
@import url(../assets/less/mixins/flex-mx.less);

.view-learn {
    .flex-mx();
    &-prefix {
        padding: 0.125rem;
        line-height: @v-unit-height;
        font-weight: bold;
    }
}
</style>