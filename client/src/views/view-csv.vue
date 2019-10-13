<template>
    <div class="view-csv">
        <ser-directive v-model="curDirective"
                       @emitDirectiveEnter="commitDirective"
        ></ser-directive>
        <ser-downloads :downloads="$store.getters.csvs"
                       @emitCloseDownload="closeCsvDownload"
                       @emitEnterDownload="enterCsvDownload"
        ></ser-downloads>
    </div>
</template>

<script>
import ServiceDirective from '../components/services/service-directive.vue';
import ServiceDownloads from '../components/services/service-downloads.vue';
import { CSV_PATH, CSV_PREFIX } from '../config';

export default {
    components: {
        'ser-directive': ServiceDirective,
        'ser-downloads': ServiceDownloads
    },
    data: () => ({
        curDirective: ''
    }),
    created: function() {
        this.curDirective = this.$store.getters.directive;
    },
    methods: {
        commitDirective: async function(directive) {
            const matchs = directive.trim().match(/^((?:[^\:]+\:[^;]+;)+)(.*)$/);
            if(!matchs) throw new Error(`Commit directive ${directive} is invaild.`);
            const [command, suffix] = matchs.slice(1),
                curCsv = { filename: suffix && `${CSV_PREFIX}${suffix}.csv` };
            this.$store.commit('newCsvDocument', { csv: curCsv });
            let res;
            try {
                res = await fetch([CSV_PATH, encodeURIComponent(command)].join('/'));
                res = await res.json();
            } catch(err) {
                const forecastable = [SyntaxError, TypeError].some(cur => err instanceof cur);
                if(!forecastable) throw err;
                return this.$store.commit('modifyCsvName', {
                    csv: curCsv, filename: err.message
                });
            }
            this.$store.commit(...(res.length ? 
                ['fillCsvSource', { csv: curCsv, source: res }] : 
                ['modifyCsvName', { csv: curCsv, filename: 'Response hqms records is empty, and check your directive is vaild.' }]
            ));
        },
        closeCsvDownload: function(cur) {
            this.$store.commit('removeCsvDocument', {
                csv: cur
            });
        },
        enterCsvDownload: function(cur) {
            this.$store.commit('downloadCsv', {
                csv: cur
            });
        }
    },
    watch: {
        curDirective: function(cur) {
            this.$store.commit('writeDirective', {  
                directive: cur
            });
        }
    }    
};
</script>

<style lang="less" scoped>
@import url(../assets/less/variables.less);
@import url(../assets/less/mixins/flex-mx.less);

.view-csv {
    .flex-mx();
}
</style>