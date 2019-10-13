export default {
    state: {
        _directive: ''
    },
    getters: { 
        directive: cur => cur._directive 
    },
    mutations: {
        writeDirective: function(stat, options) {
            const currentVal = options.directive;
            stat._directive = typeof currentVal === 'string' ? currentVal : '';
        }
    }
};