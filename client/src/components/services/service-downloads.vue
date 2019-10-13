<template>
    <div class="service-downloads">
        <com-document v-for="(cur, i) in downloads"
                      :key="cur.id"
                      :documentName="cur.filename"
                      :downloadCount="cur.downloadCount"
                      :source="cur.source"
                      @emitDocumentClose="closeDownload(cur, i)"
                      @emitDocumentDownload="enterDownload(cur, i)"
        ></com-document>
    </div>
</template>

<script>
import CommonDocument from '../commons/common-document.vue';

export default {
    components: {
        'com-document': CommonDocument
    },
    props: {
        downloads: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        closeDownload: function(cur, i) {
            this.$emit('emitCloseDownload', cur, i, this);
        },
        enterDownload: function(cur, i) {
            this.$emit('emitEnterDownload', cur, i, this);
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../../assets/less/variables.less);
@import url(../../assets/less/mixins/flex-mx.less);

.service-downloads {
    .flex-mx();
}
</style>