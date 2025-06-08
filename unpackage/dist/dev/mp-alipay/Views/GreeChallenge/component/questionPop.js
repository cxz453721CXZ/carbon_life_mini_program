"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_global = require("../../../common/global.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "questionPop",
  setup(__props) {
    const close = () => {
      routerJump("Views/GreeChallenge/checkIn/checkIn");
    };
    const routerJump = (val) => {
      let pages = getCurrentPages();
      var num = pages.length;
      var backnum = num;
      for (var i = 0; i < num; i++) {
        console.log(pages[i].route);
        if (pages[i].route == val) {
          backnum = num - i - 1;
        }
      }
      common_vendor.index.navigateBack({
        delta: backnum
        //返回的页面数，如果 delta 大于现有页面数，则返回到首页。
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(common_global.KnowledgeChallengeImgUrl) + "component/wenjuan.png",
        b: common_vendor.unref(common_global.KnowledgeChallengeImgUrl) + "component/jf.png",
        c: common_vendor.o(close),
        d: common_vendor.unref(common_global.KnowledgeChallengeImgUrl) + "component/cha.png"
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a8127eee"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/GreeChallenge/component/questionPop.vue"]]);
my.createComponent(Component);
