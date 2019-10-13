export default {
    state: {
        _learns: []
    },
    getters: {
        learns: cur => cur._learns
    },
    mutations: {
        fillLearns: function(cur, options) {
            const [len, learns] = [cur._learns.length, options.learns || []];
            cur._learns.splice(0, len, ...learns);
        }
    }
};