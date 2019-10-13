<template>
    <div class="common-summary"
         @click.stop="summaryClick">
        <div class="common-summary-title">
            <i :class="`iconfont icon-${icon}`"
               v-if="hasIcon"
            ></i>
            {{ displayTitle }}
        </div>
        <div class="common-summary-context">
        {{ content }}
        </div>
    </div>
</template>

<script>
import '../../assets/icons/iconfont.css';

export default {
    props: {
        icon: {
            type: String,
            default: ''
        },
        displayTitle: {
            type: String,
            default: 'COMMON-SUMMARY-TITLE',
            validator: val => val.length > 0
        },
        content: {
            type: String,
            default: 'COMMON-SUMMARY-CONTEXT',
            validator: val => val.length > 0
        }
    },
    computed: {
        hasIcon: cur => Boolean(cur.icon)
    },
    methods: {
        summaryClick: function() {
            this.$emit('emitSummaryClick', this);
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../../assets/less/variables.less);

.common-summary {
    padding: 0.125rem;
    border-top: @v-line-style 1px extract(@v-colors, 4);
    &-title {
        line-height: @v-unit-height;
        i {
            font-size: @v-font-size;
        }
    }
    &-context {
        line-height: @v-unit-height;
        text-indent: 0.25rem;
    }
}
</style>