/**
 * Created by jszh on 2018/12/29.
 */

const RegExpr = {
    /**
     * 校验手机号
     * @param mobile
     * @returns {boolean}
     */
    checkMobile: mobile => /^[1][0-9]{10}$/.test(mobile),

    /**
     * 校验纯数字
     * @param num
     * @returns {boolean}
     */
    checkNum: num => /^[0-9]+$/.test(num),

    /**
     * 校验用户名：1-20位字符，首字符为字母
     * @param str
     * @returns {RegExp}
     */
    checkUserName: str => /^[a-zA-Z]{1,20}$/.test(str),

    /**
     * 校验密码：6-20位，数字、字母、下划线
     * @param str
     * @returns {boolean}
     */
    checkPwd: str => /^(\\w){6,20}$/.test(str),

    /**
     * 校验正整数 + 0
     * @param num
     * @returns {boolean}
     */
    checkPositiveInteger: num => /^[0-9]*[1-9][0-9]*$/.test(num)


};

export {RegExpr}
