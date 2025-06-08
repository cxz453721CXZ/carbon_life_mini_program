"use strict";
const common_vendor = require("../common/vendor.js");
const common_global = require("../common/global.js");
const gc = common_vendor.defineStore("greenChallenge", {
  actions: {
    checkCount: async (time, typeId, cnt, userId) => {
      const res = await common_vendor.index.request({
        url: common_global.DomainName + "/challenge/selectCntByDate",
        method: "GET",
        data: {
          currentDate: time,
          typeId,
          userId
        }
      });
      if (res.data.data >= cnt) {
        common_vendor.index.showToast({
          title: "今日挑战次数已上限",
          icon: "exception"
        });
        return false;
      }
      return true;
    }
  }
});
exports.gc = gc;
