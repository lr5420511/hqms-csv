<template>
    <div class="layout-main">
        <div class="layout-main-navigator">
            <slot name="nav"></slot>
        </div>
        <div class="layout-main-context">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import url(../../assets/less/variables.less);
@import url(../../assets/less/mixins/flex-mx.less);

.layout-main {
    .flex-mx();
    &-navigator {
        .flex-mx();
    }
    &-context {
        .flex-mx();
    }
}
</style>