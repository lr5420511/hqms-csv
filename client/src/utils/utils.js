// 获取元素的某个css属性值
export const elementCss = function(el, prop, callback = val => parseFloat(val)) {
    const val = getComputedStyle(el)[prop];
    return callback(val);
};