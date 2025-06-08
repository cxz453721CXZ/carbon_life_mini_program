"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_global = require("../../../common/global.js");
const utils_emitter = require("../../../utils/emitter.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "change",
  props: ["good"],
  setup(__props) {
    const props = __props;
    const cnt = common_vendor.ref(1);
    const totalPrice = common_vendor.ref(props.good.price);
    const close = () => {
      utils_emitter.emitter.emit("cClose", {
        confirm: false,
        cnt: 0
      });
    };
    const change = () => {
      utils_emitter.emitter.emit("cClose", {
        confirm: true,
        cnt: cnt.value
      });
    };
    const sub = () => {
      if (cnt.value > 1) {
        cnt.value--;
        totalPrice.value = cnt.value * props.good.price;
      }
    };
    const add = () => {
      if (cnt.value < props.good.stock) {
        cnt.value++;
        totalPrice.value = cnt.value * props.good.price;
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(totalPrice.value),
        b: common_vendor.o(close),
        c: common_vendor.unref(common_global.PointsMallImgUrl) + "component/cha.png",
        d: common_vendor.t(__props.good.name),
        e: common_vendor.t(cnt.value),
        f: common_vendor.o(sub),
        g: common_vendor.unref(common_global.PointsMallImgUrl) + "component/sub.png",
        h: common_vendor.t(cnt.value),
        i: common_vendor.o(add),
        j: common_vendor.unref(common_global.PointsMallImgUrl) + "component/add.png",
        k: common_vendor.o(change)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-31ed5752"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/Page/component/change.vue"]]);
my.createComponent(Component);
