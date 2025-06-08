"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_emitter = require("../../../utils/emitter.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "cPopup",
  props: ["changePrice"],
  setup(__props) {
    const confirm = () => {
      utils_emitter.emitter.emit("changeGoods");
      utils_emitter.emitter.emit("cPopClose");
    };
    const cancel = () => {
      utils_emitter.emitter.emit("cPopClose");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.changePrice),
        b: common_vendor.o(cancel),
        c: common_vendor.o(confirm)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f7671cbe"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/Page/component/cPopup.vue"]]);
my.createComponent(Component);
