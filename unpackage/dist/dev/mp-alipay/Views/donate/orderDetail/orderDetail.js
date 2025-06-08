"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_global = require("../../../common/global.js");
const store_user = require("../../../store/user.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "orderDetail",
  setup(__props) {
    const userStore = store_user.userInfoStore();
    const firstTextColor = common_vendor.ref("#000");
    const secondTextColor = common_vendor.ref("#989898");
    const thirdTextColor = common_vendor.ref("#989898");
    const offset = common_vendor.ref(18.75);
    const recycleId = common_vendor.ref(1);
    const transfer = (val) => {
      if (val == 1) {
        recycleId.value = val;
        firstTextColor.value = "#000";
        secondTextColor.value = "#989898";
        thirdTextColor.value = "#989898";
        offset.value = 18.75;
        recycleList.value = originalRecycleList.value;
      } else if (val == 2) {
        recycleId.value = val;
        secondTextColor.value = "#000";
        firstTextColor.value = "#989898";
        thirdTextColor.value = "#989898";
        offset.value = 270;
        recycleList.value = originalRecycleList.value.filter((item) => item.isAccess == 0);
      } else {
        recycleId.value = val;
        thirdTextColor.value = "#000";
        firstTextColor.value = "#989898";
        secondTextColor.value = "#989898";
        offset.value = 515;
        recycleList.value = originalRecycleList.value.filter((item) => item.isAccess == 1);
      }
    };
    const recycleList = common_vendor.ref([]);
    const originalRecycleList = common_vendor.ref([]);
    const queryAllRecycleRecord = async () => {
      const res = await common_vendor.index.request({
        url: common_global.DomainName + "/recycle/queryAllRecycleRecord",
        method: "GET",
        data: {
          userId: userStore.user.id
        }
      });
      originalRecycleList.value = res.data.data;
      recycleList.value = originalRecycleList.value;
    };
    common_vendor.onMounted(() => {
      queryAllRecycleRecord();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => transfer(1)),
        b: firstTextColor.value,
        c: common_vendor.o(($event) => transfer(2)),
        d: secondTextColor.value,
        e: common_vendor.o(($event) => transfer(3)),
        f: thirdTextColor.value,
        g: offset.value + "rpx",
        h: common_vendor.f(recycleList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.id.toString().padStart(6, 0)),
            b: common_vendor.t(item.type == 0 ? "旧衣回收" : "书籍回收"),
            c: common_vendor.t(item.weight),
            d: common_vendor.t(item.cycleDate),
            e: common_vendor.t(item.region.split("/").join("") + " " + item.detailAddress),
            f: common_vendor.t(item.cycleReward),
            g: index
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9e283bfb"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/donate/orderDetail/orderDetail.vue"]]);
my.createPage(MiniProgramPage);
