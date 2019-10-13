export default {
    state: {
        _csvs: []
    },
    getters: {
        csvs: cur => cur._csvs
    },
    mutations: {
        newCsvDocument: function(stat, options) {
            const curCsv = options.csv;
            stat._csvs.unshift(Object.assign(curCsv, {
                id: Date.now(),
                downloadCount: 0,
                source: []
            }, {
                filename: curCsv.filename || 'exports.csv'
            }));
        },
        removeCsvDocument: function(stat, options) {
            const csvs = stat._csvs;
            csvs.splice(csvs.indexOf(options.csv), 1);
        },
        modifyCsvName: function(stat, options) {
            const csvs = stat._csvs,
                cur = csvs[csvs.indexOf(options.csv)];
            cur && (cur.filename = options.filename);
        },
        downloadCsv: function(stat, options) {
            const csvs = stat._csvs,
                cur = csvs[csvs.indexOf(options.csv)];
            cur && (cur.downloadCount++);
        },
        fillCsvSource: function(stat, options) {
            const csvs = stat._csvs,
                cur = csvs[csvs.indexOf(options.csv)];
            cur && (cur.source.splice(0, cur.source.length, ...options.source));
        }
    }
};