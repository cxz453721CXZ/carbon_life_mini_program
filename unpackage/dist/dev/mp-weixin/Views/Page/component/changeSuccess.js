"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_global = require("../../../common/global.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "changeSuccess",
  setup(__props) {
    const jumpToDetail = () => {
      common_vendor.index.navigateTo({
        url: "../orderDetail/orderDetail"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(common_global.PointsMallImgUrl) + "component/success.png",
        b: common_vendor.o(jumpToDetail)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1247c55f"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/Page/component/changeSuccess.vue"]]);
wx.createComponent(Component);
