"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_global = require("../../../common/global.js");
if (!Math) {
  (subwayVue + busVue)();
}
const subwayVue = () => "../component/subway.js";
const busVue = () => "../component/bus.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "subway",
  setup(__props) {
    const isShow = common_vendor.ref(true);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(common_global.GreenChallenageImgUrl) + "subway/dt.png",
        b: common_vendor.unref(common_global.GreenChallenageImgUrl) + "subway/gjc.png",
        c: isShow.value,
        d: !isShow.value,
        e: common_vendor.o(($event) => isShow.value = true),
        f: _ctx.offset + "rpx",
        g: !isShow.value,
        h: common_vendor.o(($event) => isShow.value = false),
        i: _ctx.offset + "rpx",
        j: isShow.value
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-23376505"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/GreenTravel/subway/subway.vue"]]);
my.createPage(MiniProgramPage);
