/**
 * 
 * @param {*} date 日期
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  /*   console.log( [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')); */
  return [year, month, day].map(formatNumber).join('-')
}
/**
 * 
 * @param {*} date  日期
 */
const formatTime1 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 
 * @param {*} fn 
 * @param {*} gapTime 
 */
function throttle(fn, gapTime = 300) {
  let _lastTime = null; //触发的时间
  return function () {
    let _nowTime = +new Date(); //第一次函数return即触发的时间
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments);
      _lastTime = _nowTime; //赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
}
/**
 * 防抖函数
 * @param {*} func 
 * @param {*} wait  
 */
function debounce(func, wait) {
  let timer;
  return function() {
    let context = this; // 这边的 this 指向谁?
    let args = arguments; // arguments中存着e

    if (timer) clearTimeout(timer);

    let callNow = !timer;

    timer = setTimeout(() => {
      timer = null;
    }, wait)

    if (callNow) func.apply(context, args);
  }
}
/**
 * 
 * @param {*} phoneNo  手机号
 */
function formatTel(phoneNo) {
  var tel = String(phoneNo);
  var dh = tel.substr(0, 3) + "******" + tel.substr(8);
  return dh;
}
module.exports = {
  formatTime,
  formatTime1,
  throttle,
  debounce,
  formatTel
}