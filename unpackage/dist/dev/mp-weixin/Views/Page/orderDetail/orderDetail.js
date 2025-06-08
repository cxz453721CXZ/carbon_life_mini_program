"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_global = require("../../../common/global.js");
const store_user = require("../../../store/user.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "orderDetail",
  setup(__props) {
    const userStore = store_user.userInfoStore();
    const orderList = common_vendor.ref([]);
    const addressList = common_vendor.ref([]);
    common_vendor.onMounted(async () => {
      const res = await common_vendor.index.request({
        url: common_global.DomainName + "/change/queryUserOrders",
        method: "GET",
        data: {
          id: userStore.user.id
        }
      });
      orderList.value = res.data.data;
      for (var i = 0; i < orderList.value.length; i++) {
        addressList.value[i] = (orderList.value[i].region + " " + orderList.value[i].detailAddress).split("/").join("");
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(orderList.value, (item, index, i0) => {
          return {
            a: item.url,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.type),
            d: common_vendor.t(item.price),
            e: common_vendor.t(item.cnt),
            f: common_vendor.t(item.price * item.cnt),
            g: common_vendor.t(item.consignee),
            h: common_vendor.t(item.phone),
            i: common_vendor.t(addressList.value[index]),
            j: common_vendor.t(item.orderDate),
            k: index
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-68aae894"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/Page/orderDetail/orderDetail.vue"]]);
wx.createPage(MiniProgramPage);
