"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_global = require("../../../common/global.js");
const utils_emitter = require("../../../utils/emitter.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "checkInPop",
  setup(__props) {
    const close = () => {
      utils_emitter.emitter.emit("closeCheckIn");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(common_global.KnowledgeChallengeImgUrl) + "component/dg.png",
        b: common_vendor.o(close),
        c: common_vendor.unref(common_global.KnowledgeChallengeImgUrl) + "component/cha.png"
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fc3aab15"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/GreeChallenge/component/checkInPop.vue"]]);
wx.createComponent(Component);
