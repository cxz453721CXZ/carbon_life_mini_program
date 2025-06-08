"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_global = require("../../../common/global.js");
const utils_emitter = require("../../../utils/emitter.js");
if (!Math) {
  (bikeVue + electrocarVue)();
}
const bikeVue = () => "../component/bike.js";
const electrocarVue = () => "../component/electrocar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "bicycle",
  setup(__props) {
    const isShow = common_vendor.ref(true);
    const offset = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      utils_emitter.emitter.on("focus", () => {
        focus();
      });
      utils_emitter.emitter.on("blur", () => {
        blur();
      });
    });
    const focus = () => {
      offset.value = -80;
    };
    const blur = () => {
      offset.value = 0;
    };
    const bike = () => {
      isShow.value = true;
    };
    const electrocar = () => {
      isShow.value = false;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(common_global.GreenChallenageImgUrl) + "bicycle/bicycle.png",
        b: common_vendor.unref(common_global.GreenChallenageImgUrl) + "bicycle/electrocar.png",
        c: isShow.value,
        d: !isShow.value,
        e: common_vendor.o(bike),
        f: offset.value + "rpx",
        g: !isShow.value,
        h: common_vendor.o(electrocar),
        i: offset.value + "rpx",
        j: isShow.value,
        k: offset.value + "rpx"
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-28f2f4ee"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/GreenTravel/bicycle/bicycle.vue"]]);
my.createPage(MiniProgramPage);
