app.constant("regexRuleConst", {
    "postcode": /^[1-9][0-9]{5}$/, //邮政编码
    "idcard": /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, //身份证号码验证表达式
    "chCode": /[^\u4e00-\u9fa5\s+]/ig, //所有字符必须为中文字符
    "enCode": /^[a-zA-Z\s]+$/, // 所有的英文字符
    "mobile": /^1[3-9][0-9]\d{8}$/, //验证手机号码/^1[3|4|5|8][0-9]\d{4,8}$/
    "empty": /^\s+|\s+$/ig, // 移除字符串空字符串
    "url": /^https?:\/\//,
    "captchaInput": /^.{4}$/, //TOP 图片验证码的验证表达式
    "otpInput": /^\d{6}$/
});