"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_global = require("../../../common/global.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "dtPop",
  props: ["ansArr", "typeId"],
  setup(__props) {
    const props = __props;
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
    const close = () => {
      const id = props.typeId;
      if (id == 0) {
        routerJump("Views/GreeChallenge/answerGain/answerGain");
      } else {
        routerJump("Views/GreeChallenge/topicClass/topicClass");
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(common_global.KnowledgeChallengeImgUrl) + "component/xx.png",
        b: common_vendor.t(__props.ansArr[0]),
        c: common_vendor.t(__props.ansArr[1]),
        d: common_vendor.t(__props.ansArr[2]),
        e: common_vendor.o(close)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fcb12f07"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/GreeChallenge/component/dtPop.vue"]]);
my.createComponent(Component);
