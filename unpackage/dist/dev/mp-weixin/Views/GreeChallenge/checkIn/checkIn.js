"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_global = require("../../../common/global.js");
const utils_emitter = require("../../../utils/emitter.js");
const Views_GreeChallenge_checkIn_sign = require("./sign.js");
const store_user = require("../../../store/user.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (checkInPopVue + _easycom_uni_popup)();
}
const checkInPopVue = () => "../component/checkInPop.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "checkIn",
  setup(__props) {
    const userStore = store_user.userInfoStore();
    const continueSign = common_vendor.ref(0);
    const totalSign = common_vendor.ref(0);
    const color = common_vendor.ref("#fff");
    const backgroundColor = common_vendor.ref("#00725b");
    const signTitle = common_vendor.ref("签到");
    const items = common_vendor.ref(Views_GreeChallenge_checkIn_sign.data);
    const checkIn = common_vendor.ref(null);
    const flag1 = common_vendor.ref(true);
    const flag2 = common_vendor.ref(true);
    const title1 = common_vendor.ref("去答题");
    const title2 = common_vendor.ref("去答题");
    const isSign = common_vendor.ref(false);
    const add = async () => {
      const res3 = await common_vendor.index.request({
        url: common_global.DomainName + "/knowledge/selectSignDayCnt",
        method: "GET",
        data: {
          userId: userStore.user.id
        }
      });
      totalSign.value = res3.data.data;
      const res4 = await common_vendor.index.request({
        url: common_global.DomainName + "/knowledge/selectConSignDayCnt",
        method: "GET",
        data: {
          userId: userStore.user.id
        }
      });
      continueSign.value = res4.data.data;
    };
    const init = () => {
      backgroundColor.value = "#e0f2da";
      color.value = "#195511";
      signTitle.value = "已签到";
      isSign.value = true;
      var f = 0;
      for (var i = 0; i < items.value.length; i++) {
        if (!items.value[i].isSign) {
          items.value[i].isSign = true;
          items.value[i].backgroundColor = "#D9F1D1";
          f = 1;
          break;
        }
      }
      if (!f) {
        for (var i = 0; i < items.value.length; i++) {
          if (i == 0) {
            items.value[i].isSign = true;
            items.value[i].backgroundColor = "#D9F1D1";
          } else {
            items.value[i].isSign = false;
            items.value[i].backgroundColor = "#f9f9f7";
          }
        }
        console.log(items.value);
      }
      items.value.map((item) => item.isSign);
    };
    common_vendor.onMounted(async () => {
      utils_emitter.emitter.on("endDeal1", () => {
        title1.value = "已作答";
        flag1.value = false;
      });
      utils_emitter.emitter.on("endDeal2", () => {
        title2.value = "已作答";
        flag2.value = false;
      });
      const res = await common_vendor.index.request({
        url: common_global.DomainName + "/knowledge/selectIsSign",
        method: "POST",
        data: {
          signDate: getDate(),
          userId: userStore.user.id
        }
      });
      if (res.data.data) {
        backgroundColor.value = "#e0f2da";
        color.value = "#195511";
        signTitle.value = "已签到";
        isSign.value = true;
      } else {
        backgroundColor.value = "#00725b";
        color.value = "#fff";
        signTitle.value = "签到";
      }
      const res2 = await common_vendor.index.request({
        url: common_global.DomainName + "/knowledge/selectSixDaySign",
        method: "GET",
        data: {
          userId: userStore.user.id
        }
      });
      const tem = res2.data.msg;
      for (var i = 0; i < tem.length; i++) {
        if (tem[i] == "1") {
          items.value[i].isSign = true;
          items.value[i].backgroundColor = "#D9F1D1";
        }
      }
      add();
      const response1 = await common_vendor.index.request({
        url: common_global.DomainName + "/knowledge/selectIsSubmitQuestion",
        method: "GET",
        data: {
          typeId: 1,
          userId: userStore.user.id
        }
      });
      flag1.value = !response1.data.data;
      if (!flag1.value)
        title1.value = "已作答";
      const response2 = await common_vendor.index.request({
        url: common_global.DomainName + "/knowledge/selectIsSubmitQuestion",
        method: "GET",
        data: {
          typeId: 2,
          userId: userStore.user.id
        }
      });
      flag2.value = !response2.data.data;
      if (!flag2.value)
        title2.value = "已作答";
    });
    const openCheckIn = async () => {
      if (isSign.value)
        return;
      init();
      var tempStr = "";
      const temp = items.value.map((item) => item.isSign);
      for (var i = 0; i < temp.length; i++) {
        if (temp[i])
          tempStr += "1";
        else
          tempStr += "0";
      }
      const res = await common_vendor.index.request({
        url: common_global.DomainName + "/knowledge/daySign",
        method: "POST",
        data: {
          signDate: getDate(),
          userId: userStore.user.id,
          signRecord: tempStr
        }
      });
      console.log(res);
      add();
      checkIn.value.open();
      utils_emitter.emitter.on("closeCheckIn", () => {
        closeCheckIn();
      });
    };
    const closeCheckIn = () => {
      checkIn.value.close();
    };
    const jumpToQuestion = (val) => {
      if (val == 1) {
        if (!flag1.value)
          return;
      } else {
        if (!flag2.value)
          return;
      }
      common_vendor.index.navigateTo({
        url: "../questionnaires/questionnaires?id=" + val
      });
    };
    const share = () => {
    };
    const getDate = () => {
      let now = /* @__PURE__ */ new Date();
      let year = now.getFullYear();
      let month = (now.getMonth() + 1).toString().padStart(2, 0);
      let date = now.getDate().toString().padStart(2, 0);
      return year + "-" + month + "-" + date;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(share),
        b: common_vendor.unref(common_global.KnowledgeChallengeImgUrl) + "checkIn/sl.png",
        c: common_vendor.t(continueSign.value),
        d: common_vendor.t(totalSign.value),
        e: common_vendor.t(signTitle.value),
        f: color.value,
        g: backgroundColor.value,
        h: common_vendor.o(openCheckIn),
        i: common_vendor.f(items.value, (item, index, i0) => {
          return common_vendor.e({
            a: !item.isSign
          }, !item.isSign ? {
            b: item.imgSrc
          } : {}, {
            c: item.isSign
          }, item.isSign ? {
            d: common_vendor.unref(common_global.KnowledgeChallengeImgUrl) + "checkIn/dg.png"
          } : {}, {
            e: item.backgroundColor,
            f: common_vendor.t(item.name),
            g: index
          });
        }),
        j: common_vendor.t(title1.value),
        k: common_vendor.o(($event) => jumpToQuestion(1)),
        l: common_vendor.t(title2.value),
        m: common_vendor.o(($event) => jumpToQuestion(2)),
        n: common_vendor.unref(common_global.KnowledgeChallengeImgUrl) + "checkIn/jf2.png",
        o: common_vendor.unref(common_global.KnowledgeChallengeImgUrl) + "checkIn/fx.png",
        p: common_vendor.sr(checkIn, "4d03c047-0", {
          "k": "checkIn"
        }),
        q: common_vendor.p({
          type: "dialog"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4d03c047"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/GreeChallenge/checkIn/checkIn.vue"]]);
wx.createPage(MiniProgramPage);
