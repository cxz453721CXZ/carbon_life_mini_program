"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_global = require("../../../common/global.js");
const store_user = require("../../../store/user.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const userStore = store_user.userInfoStore();
    const weekArr = common_vendor.ref([0, 0, 0, 0, 0, 0]);
    const totalArr = common_vendor.ref([0, 0, 0, 0, 0, 0]);
    const standard = [21, 28, 7, 21, 7, 7];
    const dw = common_vendor.ref(2.1);
    common_vendor.ref({});
    const dealEvent = async () => {
      const res = await common_vendor.index.request({
        url: common_global.DomainName + "/challenge/selectAllCntByWeek",
        data: {
          userId: userStore.user.id
        }
      });
      weekArr.value = res.data.data;
      console.log(weekArr.value);
      const response = await common_vendor.index.request({
        url: common_global.DomainName + "/challenge/selectAllCnt",
        data: {
          userId: userStore.user.id
        }
      });
      totalArr.value = response.data.data;
    };
    common_vendor.onMounted(() => {
      dealEvent();
    });
    common_vendor.onShow(() => {
      dealEvent();
    });
    const items = common_vendor.ref([
      {
        name: "共享单车",
        src: common_global.GreenChallenageImgUrl + "index/gxdc.png"
      },
      {
        name: "公交地铁",
        src: common_global.GreenChallenageImgUrl + "index/subway.png"
      },
      {
        name: "新能源",
        src: common_global.GreenChallenageImgUrl + "index/xny.png"
      }
    ]);
    const items_1 = common_vendor.ref([
      {
        name: "光盘行动",
        src: common_global.GreenChallenageImgUrl + "index/gpxd.png"
      },
      {
        name: "垃圾回收",
        src: common_global.GreenChallenageImgUrl + "index/ljhs.png"
      },
      {
        name: "循环利用",
        src: common_global.GreenChallenageImgUrl + "index/recycle.png"
      }
    ]);
    const items_2 = common_vendor.ref([null, null, null]);
    const items_3 = common_vendor.ref([null, null, null, null]);
    const jump = (val) => {
      if (val == 0) {
        common_vendor.index.navigateTo({
          url: "../bicycle/bicycle"
        });
      } else if (val == 1) {
        common_vendor.index.navigateTo({
          url: "../subway/subway"
        });
      } else if (val == 2) {
        common_vendor.index.navigateTo({
          url: "../newEnergy/newEnergy"
        });
      } else if (val == 3) {
        common_vendor.index.navigateTo({
          url: "../cleanPlate/cleanPlate"
        });
      } else if (val == 4) {
        common_vendor.index.navigateTo({
          url: "../garbageSorting/garbageSorting"
        });
      } else {
        common_vendor.index.navigateTo({
          url: "../recycle/recycle"
        });
      }
    };
    const jumpToDetail = () => {
      common_vendor.index.navigateTo({
        url: "../activity/activity"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(common_global.GreenChallenageImgUrl) + "index/lvsetz.png",
        b: common_vendor.f(items.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(totalArr.value[index]),
            c: common_vendor.t((weekArr.value[index] / standard[index] * 100).toFixed(0)),
            d: weekArr.value[index] / standard[index] * 100 * dw.value + "rpx",
            e: weekArr.value[index] / standard[index] * 100 * dw.value + "rpx",
            f: (1 - weekArr.value[index] / standard[index]) * 100 * dw.value + "rpx",
            g: weekArr.value[index] / standard[index] * 100 * dw.value + 46.15 + "rpx",
            h: item.src,
            i: index,
            j: common_vendor.o(($event) => jump(index), index)
          };
        }),
        c: common_vendor.f(items_1.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(totalArr.value[index + 3]),
            c: common_vendor.t((weekArr.value[index + 3] / standard[index + 3] * 100).toFixed(0)),
            d: weekArr.value[index + 3] / standard[index + 3] * 100 * dw.value + "rpx",
            e: weekArr.value[index + 3] / standard[index + 3] * 100 * dw.value + "rpx",
            f: (1 - weekArr.value[index + 3] / standard[index + 3]) * 100 * dw.value + "rpx",
            g: weekArr.value[index + 3] / standard[index + 3] * 100 * dw.value + 46.15 + "rpx",
            h: item.src,
            i: index,
            j: common_vendor.o(($event) => jump(index + 3), index)
          };
        }),
        d: common_vendor.f(items_2.value, (item, index, i0) => {
          return {
            a: index,
            b: common_vendor.o(jumpToDetail, index)
          };
        }),
        e: common_vendor.unref(common_global.GreenChallenageImgUrl) + "index/huodong1.png",
        f: common_vendor.unref(common_global.GreenChallenageImgUrl) + "index/liulanliang.png",
        g: common_vendor.f(items_3.value, (item, index, i0) => {
          return {
            a: index
          };
        }),
        h: common_vendor.unref(common_global.GreenChallenageImgUrl) + "index/huodong2.png",
        i: common_vendor.unref(common_global.GreenChallenageImgUrl) + "index/liulanliang.png"
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e2e3dd3b"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/GreenTravel/index/index.vue"]]);
wx.createPage(MiniProgramPage);
