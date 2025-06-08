"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_global = require("../../../common/global.js");
const store_user = require("../../../store/user.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const userStore = store_user.userInfoStore();
    common_vendor.ref([null, null]);
    common_vendor.ref(709);
    common_vendor.ref(true);
    const transfer = (val) => {
      arr.value.forEach((item, index) => {
        if (val == index)
          item.isShow = !item.isShow;
      });
    };
    const title = common_vendor.ref("");
    const nextTitle = common_vendor.ref("本周打卡次数");
    const typeId = common_vendor.ref(0);
    const arr = common_vendor.ref([]);
    const cntArr = common_vendor.ref([]);
    common_vendor.onLoad((options) => {
      typeId.value = options.id;
      if (typeId.value == 1)
        title.value = "今日骑行时间 (分)";
      else if (typeId.value == 2)
        title.value = "今日骑行公里数 (km)";
      else if (typeId.value == 5)
        title.value = "今日充电度数 (kW·h)";
    });
    common_vendor.onMounted(async () => {
      console.log(typeId.value);
      const res = await common_vendor.index.request({
        url: common_global.DomainName + "/challenge/selectById/" + typeId.value,
        method: "GET"
      });
      arr.value = res.data.data;
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
      console.log(arr.value);
      const response = await common_vendor.index.request({
        url: common_global.DomainName + "/challenge/selectCntEveryWeek",
        data: {
          userId: userStore.user.id
        }
      });
      console.log(response.data.data);
      cntArr.value = response.data.data;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(arr.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.type),
            b: item.photo,
            c: common_vendor.t(item.submitData),
            d: common_vendor.t(item.reward),
            e: common_vendor.t(item.isAccess),
            f: common_vendor.t(item.submitTime),
            g: common_vendor.o(($event) => transfer(index)),
            h: item.photo,
            i: common_vendor.t(item.id),
            j: common_vendor.t(item.type),
            k: common_vendor.t(item.submitTime)
          }, typeId.value == 1 || typeId.value == 2 || typeId.value == 5 ? {
            l: common_vendor.t(title.value),
            m: common_vendor.t(item.submitData)
          } : {}, typeId.value == 1 || typeId.value == 2 || typeId.value == 5 ? {} : {}, typeId.value != 1 && typeId.value != 2 && typeId.value != 5 ? {
            n: common_vendor.t(nextTitle.value),
            o: common_vendor.t(cntArr.value[typeId.value - 1])
          } : {}, typeId.value != 1 && typeId.value != 2 && typeId.value != 5 ? {} : {}, {
            p: common_vendor.t(item.reward),
            q: common_vendor.t(item.isAccess),
            r: item.isShow,
            s: index
          });
        }),
        b: common_vendor.t(nextTitle.value),
        c: common_vendor.t(cntArr.value[typeId.value - 1]),
        d: typeId.value != 1 && typeId.value != 2 && typeId.value != 5,
        e: common_vendor.t(title.value),
        f: typeId.value == 1 || typeId.value == 2 || typeId.value == 5,
        g: common_vendor.unref(common_global.GreenChallenageImgUrl) + "detail/sjt.png",
        h: typeId.value == 1 || typeId.value == 2 || typeId.value == 5,
        i: typeId.value == 1 || typeId.value == 2 || typeId.value == 5,
        j: typeId.value != 1 && typeId.value != 2 && typeId.value != 5,
        k: typeId.value != 1 && typeId.value != 2 && typeId.value != 5
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-62016820"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/GreenTravel/detail/detail.vue"]]);
my.createPage(MiniProgramPage);
