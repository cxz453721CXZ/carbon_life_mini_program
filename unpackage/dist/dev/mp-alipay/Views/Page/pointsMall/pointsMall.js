"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_global = require("../../../common/global.js");
const store_user = require("../../../store/user.js");
const utils_emitter = require("../../../utils/emitter.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "pointsMall",
  setup(__props) {
    const userStore = store_user.userInfoStore();
    const myPoints = common_vendor.ref(0);
    const goodList = common_vendor.ref([]);
    const goodName = common_vendor.ref([]);
    const updateMyPoints = async () => {
      const res = await common_vendor.index.request({
        url: common_global.DomainName + "/change/queryUserPoints",
        method: "GET",
        data: {
          userId: userStore.user.id
        }
      });
      myPoints.value = res.data.data;
    };
    common_vendor.onMounted(async () => {
      updateMyPoints();
      const response = await common_vendor.index.request({
        url: common_global.DomainName + "/change/queryAllGoods",
        method: "GET"
      });
      goodList.value = response.data.data;
      for (var i = 0; i < goodList.value.length; i++) {
        if (goodList.value[i].name.length > 5) {
          goodName.value[i] = goodList.value[i].name.slice(0, 5) + "...";
        } else {
          goodName.value[i] = goodList.value[i].name;
        }
      }
      console.log(goodName.value);
    });
    common_vendor.onShow(() => {
      updateMyPoints();
      utils_emitter.emitter.off("changeGoods");
    });
    const jumpToOrder = (item) => {
      common_vendor.index.navigateTo({
        url: "../payOrder/payOrder?good=" + JSON.stringify(item)
      });
    };
    const jumpToDetail = () => {
      common_vendor.index.navigateTo({
        url: "../orderDetail/orderDetail"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(common_global.PointsMallImgUrl) + "pointsMall/jfsc.png",
        b: common_vendor.unref(common_global.PointsMallImgUrl) + "pointsMall/tip.png",
        c: common_vendor.unref(common_global.PointsMallImgUrl) + "pointsMall/sp.png",
        d: common_vendor.f(goodList.value, (item, index, i0) => {
          return {
            a: item.url,
            b: common_vendor.t(goodName.value[index]),
            c: common_vendor.t(item.price),
            d: common_vendor.o(($event) => jumpToOrder(item)),
            e: index
          };
        }),
        e: common_vendor.t(myPoints.value),
        f: common_vendor.o(jumpToDetail)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/Page/pointsMall/pointsMall.vue"]]);
my.createPage(MiniProgramPage);
