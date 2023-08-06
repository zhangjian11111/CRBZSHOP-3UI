module.exports = {
  title: "西部手工牛肉面", //配置显示在浏览器标签的title
  /**
   * 高德地图申请链接
   * https://lbs.amap.com/api/javascript-api/guide/abc/prepare
   * 添加成功后，可获取到key值和安全密钥jscode（自2021年12月02日升级，升级之后所申请的 key 必须配备安全密钥 jscode 一起使用)
   */
  //FIXME 请检查当前高德key创建的日期，如果2021年12月02日之前申请的 无需填写安全密钥
  aMapSecurityJsCode:"0e74d5d3f1cdf049f6129e7f6f02b496", // 高德web端js申请的安全密钥
  aMapKey: "680dd24a763ecab260932ec8099b5c10", //高德web端js申请的api key
  website: "https://www.qgxbm.com", //官网地址
  enableCDN: true, //生产环境 是否启用cdn加载 vue等js
  port: 10003, //端口
  inputMaxLength: "2000",//全局输入框默认最大输入长度字符串
  mainColor:"#ff5c58", //主题色
  setting: {
    isUseTabsRouter: true, //多标签Tab页模式
  },
};
