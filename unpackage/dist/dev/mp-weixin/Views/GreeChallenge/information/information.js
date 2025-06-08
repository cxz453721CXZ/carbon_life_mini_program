"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_global = require("../../../common/global.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "information",
  setup(__props) {
    const items = common_vendor.ref([null, null, null, null]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(items.value, (item, index, i0) => {
          return {
            a: index
          };
        }),
        b: common_vendor.unref(common_global.KnowledgeChallengeImgUrl) + "information/banner.png"
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8394f898"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/GreeChallenge/information/information.vue"]]);
wx.createPage(MiniProgramPage);
