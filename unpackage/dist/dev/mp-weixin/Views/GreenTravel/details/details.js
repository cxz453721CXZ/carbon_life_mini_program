"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_global = require("../../../common/global.js");
const store_user = require("../../../store/user.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "details",
  setup(__props) {
    const userStore = store_user.userInfoStore();
    common_vendor.ref([null, null]);
    common_vendor.ref(709);
    common_vendor.ref(true);
    const nextTitle = common_vendor.ref("本周打卡次数");
    const transfer = (val) => {
      arr.value.forEach((item, index) => {
        if (val == index)
          item.isShow = !item.isShow;
      });
    };
    const title = common_vendor.ref("");
    const typeId = common_vendor.ref(0);
    const arr = common_vendor.ref([]);
    const nextArr = common_vendor.ref([]);
    const cntArr = common_vendor.ref([]);
    common_vendor.onLoad((options) => {
      typeId.value = options.id;
      if (typeId.value == 1)
        title.value = "今日骑行时间";
      else if (typeId.value == 2)
        title.value = "今日骑行公里数";
      else if (typeId.value == 5)
        title.value = "今日充电度数";
    });
    common_vendor.onMounted(async () => {
      const res = await common_vendor.index.request({
        url: common_global.DomainName + "/challenge/selectById/" + typeId.value,
        method: "GET"
      });
      arr.value = res.data.data;
      const temp = arr.value.map((item) => item.id);
      const response = await common_vendor.index.request({
        url: common_global.DomainName + "/challenge/selectNext",
        method: "GET",
        data: {
          ids: temp
        }
      });
      nextArr.value = response.data.data;
      arr.value.forEach((item) => {
        item.isShow = false;
        item.id = item.id.toString().padStart(6, 0);
        if (item.isAccess == 0) {
          item.isAccess = "待审核";
        } else if (item.isAccess == 1) {
          item.isAccess = "审核通过";
        } else {
          item.isAccess = "审核不通过";
        }
      });
      const response2 = await common_vendor.index.request({
        url: common_global.DomainName + "/challenge/selectCntEveryWeek",
        data: {
          userId: userStore.user.id
        }
      });
      console.log(response2.data.data);
      cntArr.value = response2.data.data;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(arr.value, (item, index, i0) => {
          var _a;
          return {
            a: common_vendor.t(item.type),
            b: item.photo,
            c: common_vendor.t(item.reward),
            d: common_vendor.t(item.isAccess),
            e: common_vendor.t(item.submitTime),
            f: common_vendor.o(($event) => transfer(index), index),
            g: item.photo,
            h: (_a = nextArr.value[index]) == null ? void 0 : _a.photo,
            i: common_vendor.t(item.id),
            j: common_vendor.t(item.type),
            k: common_vendor.t(item.submitTime),
            l: common_vendor.t(item.reward),
            m: common_vendor.t(item.isAccess),
            n: item.isShow,
            o: index
          };
        }),
        b: common_vendor.t(nextTitle.value),
        c: common_vendor.t(cntArr.value[typeId.value - 1]),
        d: common_vendor.unref(common_global.GreenChallenageImgUrl) + "detail/sjt.png",
        e: common_vendor.t(nextTitle.value),
        f: common_vendor.t(cntArr.value[typeId.value - 1])
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5d0277ef"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/GreenTravel/details/details.vue"]]);
wx.createPage(MiniProgramPage);
