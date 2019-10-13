<template>
    <div class="common-group">
        <ul class="common-group-wrap"
            ref="group">
            <li class="common-group-item"
                v-for="(cur, i) in items"
                :key="cur.id"
                :style="{
                    color: value === i ? focusColor : textColor,
                    width: `${blockWidth}rem`
                }"
                @click.stop="itemClick(i, cur)">
                <i :class="`iconfont icon-${cur.icon}`"
                   v-if="hasIcon"
                ></i><br v-if="hasIcon"/>{{ cur.text }}
            </li>
            <li class="common-group-block"
                ref="block"
                :style="{
                    width: `${blockWidth}rem`,
                    height: `${blockHeight}px`,
                    'border-top-color': /^(both|top)$/i.test(cursor) ? focusColor : 'transparent',
                    'border-bottom-color': /^(both|bottom)$/i.test(cursor) ? focusColor : 'transparent',
                    left: `${blockPosition.left}px`,
                    top: `${blockPosition.top}px`
                }"
            ></li>
        </ul>
    </div>
</template>

<script>
import '../../assets/icons/iconfont.css';
import { FOCUS_COLOR } from '../../config';
import { elementCss } from '../../utils/utils';

export default {
    props: {
        blockWidth: {
            type: Number,
            default: 5,
            validator: val => val > 0
        },
        hasIcon: {
            type: Boolean,
            default: false
        },
        cursor: {
            type: String,
            default: 'both', // both, top or bottom
            validator: val => /^(both|top|bottom)$/i.test(val)
        },
        value: {
            type: Number,
            default: 0,
            validator: val => val >= 0
        },
        items: {
            type: Array,
            default: () => [
                { id: 1, text: ' COMMON-GROUP-ITEM1 ' },
                { id: 2, text: 'COMMON-GROUP-ITEM2' }
            ],
            validator: val => val.length > 1
        }
    },
    data: () => ({
        itemHeight: 0,
        cursorHeight: 0,
        focusColor: FOCUS_COLOR,
        textColor: null,
        current: null
    }),
    computed: {
        blockHeight: cur => cur.itemHeight - cur.cursorHeight * 2,
        blockPosition: cur => {
            cur = cur.current;
            return {
                left: cur ? cur.offsetLeft : 0,
                top: cur ? cur.offsetTop : 0
            };
        }
    },
    mounted: function() {
        const { group, block } = this.$refs,
            disableItem = group.children[this.value ? 0 : 1];
        this.itemHeight = ['paddingTop', 'paddingBottom', 'height'].reduce((res, prop) =>
            res + elementCss(disableItem, prop), 0
        );
        this.cursorHeight = elementCss(block, 'borderTopWidth');
        this.textColor = elementCss(disableItem, 'color', val => val);
        const cur = this.current = group.children[Math.min(this.items.length - 1, this.value)];
        cur.click();
    },
    methods: {
        itemClick: function(val, item) {
            this.$emit('input', val, item, this);
        }
    },
    watch: {
        value: function(val) {
            this.current = this.$refs.group.children[Math.min(val, this.items.length - 1)];
        },
        blockWidth: function() {
            const tmp = this.current;
            this.current = null;
            this.$nextTick(() => (this.current = tmp));
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../../assets/less/variables.less);
@import url(../../assets/less/mixins/flex-mx.less);
@import url(../../assets/less/mixins/fill-mx.less);

.common-group {
    .flex-mx();
    &-wrap {
        .fill-mx();
        position: relative;
        list-style: none;
    }
    &-item {
        float: left;
        padding: 0.25rem 0;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
    }
    &-block {
        position: absolute;
        border-top: solid 0.05rem;
        border-bottom: solid 0.05rem;
        transition: left .3s, top .3s;
    }
}
</style>
