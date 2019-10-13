<template>
    <div class="common-multiple"
         :style="{
             height: `${realHeight}rem`
         }">
        <textarea class="common-multiple-text"
                  :placeholder="preview"
                  :value="value"
                  @input="valueChanged"
                  @keydown.stop.enter="enterDown"
        ></textarea>
    </div>
</template>

<script>
export default {
    props: {
        realHeight: {
            type: Number,
            default: 2,
            validator: val => val > 0
        },
        initFocus: {
            type: Boolean,
            default: false
        },
        preview: {
            type: String,
            default: 'COMMON-MULTIPLE-PREVIEW:',
            validator: val => val.length > 0
        },
        value: {
            type: String,
            default: ''
        }
    },
    mounted: function() {
        this.initFocus && (this.$el.firstElementChild.focus());
    },
    methods: {
        valueChanged: function(ev) {
            const { value } = ev.target;
            this.$emit('input', value.replace(/\r?\n/g, ''), this);
        },
        enterDown: function() {
            this.$emit('emitEnterDown', this.value, this);
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../../assets/less/variables.less);
@import url(../../assets/less/mixins/fill-mx.less);

.common-multiple {
    padding: 0.1rem;
    &-text {
        .fill-mx();
        padding: 0;
        line-height: @v-unit-height;
        border: none;
        outline: none;
        resize: none;
        overflow: hidden;
        font-family: consolas, @v-font-family;
        font-size: @v-font-size;
        color: extract(@v-colors, 3);
        background-color: transparent;
    }
}
</style>