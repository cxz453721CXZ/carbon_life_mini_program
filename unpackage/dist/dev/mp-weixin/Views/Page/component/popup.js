"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_emitter = require("../../../utils/emitter.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "popup",
  setup(__props) {
    const conform = async () => {
      utils_emitter.emitter.emit("delAddress");
      utils_emitter.emitter.emit("popClose");
    };
    const cancel = () => {
      utils_emitter.emitter.emit("popClose");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(cancel),
        b: common_vendor.o(conform)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4a8cade"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/Page/component/popup.vue"]]);
wx.createComponent(Component);
