"use strict";
const common_vendor = require("../common/vendor.js");
const common_global = require("../common/global.js");
const userInfoStore = common_vendor.defineStore("userInfo", {
  state: () => {
    return {
      user: {
        id: "000000",
        name: "登录",
        avatar: null,
        points: 0
      }
    };
  },
  actions: {
    updateUserInfo: async () => {
      const res = await common_vendor.index.request({
        url: common_global.DomainName + "/user/updateUser"
      });
      console.log(res);
    }
  }
});
exports.userInfoStore = userInfoStore;
