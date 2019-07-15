/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  if(str) {
    return true
  }
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 验证手机号
 */

export function validPhone(tel) {
  const TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
  return TEL_REGEXP.test(tel)
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 验证邮箱
 */

export function validEmail(str) {
  const MAIL_REGEXP = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return MAIL_REGEXP.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 验证密码
 */

export function validPass(str) {
  const PASS_REGEXP = /^(\w){6,16}$/;
  return PASS_REGEXP.test(str)
}


/**
 * @param {string} str
 * @returns {Boolean}
 * 验证密码
 */

export function validCode(str) {
  const CODE_REGEXP = /^[0-9a-zA-Z]+$/;
  return CODE_REGEXP.test(str)
}