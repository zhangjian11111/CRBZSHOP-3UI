var BASE = {
    /**
     * @description api请求基础路径
     */
    API_DEV: {

      common: "http://127.0.0.1:9111",
      buyer: "http://127.0.0.1:9111",
      seller: "http://127.0.0.1:9111",
      manager: "http://127.0.0.1:9111"

      // common: "https://yqswgjz.mynatapp.cc",
      // buyer: "https://yqswgjz.mynatapp.cc",
      // seller: "https://yqswgjz.mynatapp.cc",
      // manager: "https://yqswgjz.mynatapp.cc"


    },
    API_PROD: {
      // common: "https://yqswgjz.mynatapp.cc",
      // buyer: "https://yqswgjz.mynatapp.cc",
      // seller: "https://yqswgjz.mynatapp.cc",
      // manager: "https://yqswgjz.mynatapp.cc"

      common: "https://common-api.qgxbm.com",
      buyer: "https://buyer-api.qgxbm.com",
      seller: "https://seller-api.qgxbm.com",
      manager: "https://admin-api.qgxbm.com"
    },
    /**
     * @description // 跳转买家端地址 pc端
     */
    // PC_URL: "https://www.qgxbm.com",
    PC_URL: "https://www.qgxbm.com",
    /**
     * @description  // 跳转买家端地址 wap端
     */
    WAP_URL: "https://www.qgxbm.com",
    /**
     *  @description api请求基础路径前缀
     */
    PREFIX: "/manager"
  };
