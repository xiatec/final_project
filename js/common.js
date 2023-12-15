/**
 * 获取单个dom元素
 * @param {String} element - 元素类型
 * @returns DomElement 返回获取到的 元素
 */
let getDom = (element) => document.querySelector(element);

/**
 * 获取所有dom元素
 * @param {String} element - 元素类型
 * @returns DomElement 返回获取到的元素
 */
let getDoms = (element) => document.querySelectorAll(element);

/**
 * 获取Dom元素并监听事件
 * @param {string} elemnt - 元素类型
 * @param {sting} event - 事件类型
 * @param {*} cb  - 事件处理函数
 */
let getDomAndListener = (elemnt, event, cb) => {
  getDom(elemnt).addEventListener(event, cb);
};
