<template>
    <div class="common-document"
         @click.stop="documentClick">
        <div class="common-document-ladder">
            <i class="iconfont icon-document"></i>
            {{ documentName }}（已下载{{ downloadCount }}次）
            <i class="iconfont icon-close common-document-operator"
               @click.stop="documentClose"
            ></i>
        </div>
        <div class="common-document-ladder"
             @click.stop=""> <!--在这里阻止事件冒泡-->
            已缓存{{ recordCount }}条记录待处理
            <com-csv-downloader class="common-document-operator"
                                v-if="downloadable"
                                :data="source"
                                :name="documentName">
                <i class="iconfont icon-download"
                   ref="download"
                   @click="documentDownload"
                ></i>
            </com-csv-downloader>
        </div>
    </div>
</template>

<script>
import CommonCsvDownloader from 'vue-json-csv';
import '../../assets/icons/iconfont.css';

export default {
    components: {
        'com-csv-downloader': CommonCsvDownloader
    },
    props: {
        documentName: {
            type: String,
            default: 'COMMON-DOCUMENT-NAME',
            validator: val => val.length > 0
        },
        downloadCount: {
            type: Number,
            default: 0,
            validator: val => val >= 0 && Math.floor(val) === val
        },
        autoDownload: {
            type: Boolean,
            default: true
        },
        source: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        recordCount: cur => cur.source.length,
        downloadable: cur => Boolean(cur.source.length)
    },
    methods: {
        documentClick: function() {
            this.$emit('emitDocumentClick', this);
        },
        documentClose: function() {
            this.$emit('emitDocumentClose', this);
        },
        documentDownload: function() {
            this.$emit('emitDocumentDownload', this);
        }
    },
    watch: {
        source: function(val) {
            val.length && this.autoDownload && (
                this.$nextTick(() => this.$refs.download.click())
            );
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../../assets/less/variables.less);

.common-document {
    padding: 0.1rem;
    border-top: @v-line-style 1px extract(@v-colors, 4);
    &-ladder {
        line-height: @v-unit-height;
        i {
            font-size: @v-font-size;
        }
    }
    &-operator {
        float: right;
        font-weight: bold;
    }
    &-operator:hover {
        color: extract(@v-colors, 1);
    }
}
</style>