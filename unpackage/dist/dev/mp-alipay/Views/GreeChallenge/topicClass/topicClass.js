"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_global = require("../../../common/global.js");
const store_user = require("../../../store/user.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "topicClass",
  setup(__props) {
    const userStore = store_user.userInfoStore();
    const startChallenge = (val) => {
      if (val == 0) {
        common_vendor.index.navigateTo({
          url: "../answerGain/answerGain?id=0"
        });
        return;
      }
      if (toDayAnswerTypeCnt.value[val - 1] == 0) {
        common_vendor.index.navigateTo({
          url: "../answerGain/answerGain?id=" + val
        });
      } else {
        common_vendor.index.showToast({
          title: "今日答题次数已上限",
          icon: "exception"
        });
      }
    };
    const ansArr = common_vendor.ref([]);
    const typeCnt = common_vendor.ref([]);
    const totalCnt = common_vendor.ref([]);
    const toDayAnswerTypeCnt = common_vendor.ref([]);
    const init = async () => {
      const res = await common_vendor.index.request({
        url: common_global.DomainName + "/knowledge/answerCorrectCnt",
        method: "GET",
        data: {
          answerDate: getDate(),
          userId: userStore.user.id
        }
      });
      ansArr.value = res.data.data;
      const response = await common_vendor.index.request({
        url: common_global.DomainName + "/knowledge/answerTypeCnt",
        method: "GET",
        data: {
          answerDate: getDate(),
          userId: userStore.user.id
        }
      });
      typeCnt.value = response.data.data.arr1;
      totalCnt.value = response.data.data.arr2;
      const res3 = await common_vendor.index.request({
        url: common_global.DomainName + "/knowledge/selectTodayTypeAnswerCnt",
        method: "GET",
        data: {
          userId: userStore.user.id,
          answerDate: getDate()
        }
      });
      toDayAnswerTypeCnt.value = res3.data.data;
    };
    common_vendor.onMounted(() => {
      init();
    });
    common_vendor.onShow(() => {
      init();
    });
    const getDate = () => {
      let now = /* @__PURE__ */ new Date();
      let year = now.getFullYear();
      let month = (now.getMonth() + 1).toString().padStart(2, 0);
      let date = now.getDate().toString().padStart(2, 0);
      return year + "-" + month + "-" + date;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(ansArr.value[0]),
        b: common_vendor.t(ansArr.value[1]),
        c: common_vendor.t(ansArr.value[2]),
        d: common_vendor.o(($event) => startChallenge(0)),
        e: common_vendor.unref(common_global.KnowledgeChallengeImgUrl) + "topicClass/tzj.png",
        f: common_vendor.t(typeCnt.value[0]),
        g: common_vendor.t(totalCnt.value[0]),
        h: common_vendor.o(($event) => startChallenge(1)),
        i: common_vendor.unref(common_global.KnowledgeChallengeImgUrl) + "topicClass/jnjp.png",
        j: common_vendor.t(typeCnt.value[1]),
        k: common_vendor.t(totalCnt.value[1]),
        l: common_vendor.o(($event) => startChallenge(2)),
        m: common_vendor.unref(common_global.KnowledgeChallengeImgUrl) + "topicClass/dtcx.png",
        n: common_vendor.t(typeCnt.value[2]),
        o: common_vendor.t(totalCnt.value[2]),
        p: common_vendor.o(($event) => startChallenge(3)),
        q: common_vendor.unref(common_global.KnowledgeChallengeImgUrl) + "topicClass/ljhs.png",
        r: common_vendor.t(typeCnt.value[3]),
        s: common_vendor.t(totalCnt.value[3]),
        t: common_vendor.o(($event) => startChallenge(4)),
        v: common_vendor.unref(common_global.KnowledgeChallengeImgUrl) + "topicClass/jmsh.png",
        w: common_vendor.t(typeCnt.value[4]),
        x: common_vendor.t(totalCnt.value[4]),
        y: common_vendor.o(($event) => startChallenge(5)),
        z: common_vendor.unref(common_global.KnowledgeChallengeImgUrl) + "topicClass/gyzt.png",
        A: common_vendor.t(typeCnt.value[5]),
        B: common_vendor.t(totalCnt.value[5]),
        C: common_vendor.o(($event) => startChallenge(6))
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cf974a12"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/GreeChallenge/topicClass/topicClass.vue"]]);
my.createPage(MiniProgramPage);
