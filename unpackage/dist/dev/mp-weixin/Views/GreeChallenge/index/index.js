"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_global = require("../../../common/global.js");
const store_user = require("../../../store/user.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const userStore = store_user.userInfoStore();
    const todayAllPoints = common_vendor.ref(0);
    const name = common_vendor.ref("");
    const init = async () => {
      const res2 = await common_vendor.index.request({
        url: common_global.DomainName + "/knowledge/initAllUserTodayPoints",
        method: "GET",
        data: {
          todayDate: getDate()
        }
      });
      console.log(res2);
      updateUserTodayPoints();
    };
    common_vendor.onMounted(() => {
      init();
    });
    common_vendor.onShow(() => {
      updateUserTodayPoints();
    });
    const updateUserTodayPoints = async () => {
      if (userStore.user.id == "000000")
        name.value = "碳用户";
      else
        name.value = userStore.user.name;
      const res = await common_vendor.index.request({
        url: common_global.DomainName + "/knowledge/selectUserTodayPoints",
        method: "GET",
        data: {
          userId: userStore.user.id,
          answerDate: getDate()
        }
      });
      todayAllPoints.value = res.data.data;
      const response = await common_vendor.index.request({
        url: common_global.DomainName + "/knowledge/registerUserTodayPoints",
        method: "POST",
        data: {
          todayTime: getDate(),
          todayPoints: todayAllPoints.value,
          userId: userStore.user.id
        }
      });
      console.log(response);
    };
    const startChallenge = () => {
      common_vendor.index.navigateTo({
        url: "../answerGain/answerGain?id=0"
      });
    };
    const pointsRank = () => {
      common_vendor.index.navigateTo({
        url: "../personRank/personRank"
      });
    };
    const jumpToCheckIn = () => {
      common_vendor.index.navigateTo({
        url: "../checkIn/checkIn"
      });
    };
    const jumpToInfo = () => {
      common_vendor.index.navigateTo({
        url: "../information/information"
      });
    };
    const jumpToTopic = () => {
      common_vendor.index.navigateTo({
        url: "../topicClass/topicClass"
      });
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
        a: common_vendor.unref(common_global.KnowledgeChallengeImgUrl) + "index/logo.png",
        b: common_vendor.t(name.value),
        c: common_vendor.t(todayAllPoints.value),
        d: common_vendor.unref(common_global.KnowledgeChallengeImgUrl) + "index/challenge.png",
        e: common_vendor.unref(common_global.KnowledgeChallengeImgUrl) + "index/yjt.png",
        f: common_vendor.o(startChallenge),
        g: common_vendor.unref(common_global.KnowledgeChallengeImgUrl) + "index/rank.png",
        h: common_vendor.o(pointsRank),
        i: common_vendor.unref(common_global.KnowledgeChallengeImgUrl) + "index/qd.png",
        j: common_vendor.o(jumpToCheckIn),
        k: common_vendor.unref(common_global.KnowledgeChallengeImgUrl) + "index/wj.png",
        l: common_vendor.o(jumpToCheckIn),
        m: common_vendor.unref(common_global.KnowledgeChallengeImgUrl) + "index/zs.png",
        n: common_vendor.o(jumpToTopic),
        o: common_vendor.unref(common_global.KnowledgeChallengeImgUrl) + "index/zx.png",
        p: common_vendor.o(jumpToInfo)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-af5197b0"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/GreeChallenge/index/index.vue"]]);
wx.createPage(MiniProgramPage);
