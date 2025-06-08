"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const common_global = require("../../../common/global.js");
const utils_emitter = require("../../../utils/emitter.js");
const Views_GreeChallenge_answerGain_my = require("./my.js");
const Views_GreeChallenge_answerGain_question = require("./question.js");
const store_user = require("../../../store/user.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (dtPopVue + _easycom_uni_popup)();
}
const dtPopVue = () => "../component/dtPop.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "answerGain",
  setup(__props) {
    const userStore = store_user.userInfoStore();
    const answer = common_vendor.ref(null);
    common_vendor.ref([null, null, null, null]);
    const isShow = common_vendor.ref(false);
    const obj = common_vendor.ref({ height: "100%" });
    const q = common_vendor.ref(Views_GreeChallenge_answerGain_question.questions);
    common_vendor.ref(40);
    const btnText = common_vendor.ref("确定");
    const opacity = common_vendor.ref(0.3);
    const trueShow = common_vendor.ref([false, false, false, false]);
    const falseShow = common_vendor.ref([false, false, false, false]);
    const back = ["", "linear-gradient(81.7deg, #a5fdef4d -21.1%, #82d5fb4d 107%)", "linear-gradient(90deg, #c8f7e5 0%, #c8f7e5 100%)", "linear-gradient(90deg, #ffebea 0%, #ffebea 100%)"];
    const flag = common_vendor.ref(false);
    const toDayAnswerCnt = common_vendor.ref(0);
    const totalArr = common_vendor.ref([]);
    const typeId = common_vendor.ref(0);
    const restrictCnt = common_vendor.ref(0);
    common_vendor.onLoad((options) => {
      typeId.value = options.id;
      if (typeId.value == 0)
        restrictCnt.value = 2;
      else
        restrictCnt.value = 1;
    });
    common_vendor.onMounted(async () => {
      const res = await common_vendor.index.request({
        url: common_global.DomainName + "/knowledge/answerDayTimes",
        method: "GET",
        data: {
          userId: userStore.user.id,
          answerDate: getDate(),
          typeId: typeId.value
        }
      });
      toDayAnswerCnt.value = res.data.data;
      if (typeId.value == 0) {
        if (toDayAnswerCnt.value == 0) {
          totalArr.value = Views_GreeChallenge_answerGain_my.array;
        } else {
          totalArr.value = Views_GreeChallenge_answerGain_my.newArray;
        }
      } else {
        totalArr.value = JSON.parse(JSON.stringify(Views_GreeChallenge_answerGain_my.othArray));
      }
      init();
    });
    const correctCnt = common_vendor.ref(0);
    const init = () => {
      flag.value = totalArr.value[idx.value].flag;
      btnText.value = totalArr.value[idx.value].btnText;
      trueShow.value = totalArr.value[idx.value].trueShow;
      falseShow.value = totalArr.value[idx.value].falseShow;
      isShow.value = totalArr.value[idx.value].isShow;
      obj.value.height = totalArr.value[idx.value].height;
      obj.value.paddingBottom = totalArr.value[idx.value].paddingBottom;
      opacity.value = totalArr.value[idx.value].opacity;
      for (var i = 0; i < 4; i++) {
        Views_GreeChallenge_answerGain_question.questions[idx.value].options[i].isSelected = false;
        Views_GreeChallenge_answerGain_question.questions[idx.value].options[i].bgc = totalArr.value[idx.value].bgc[i];
      }
    };
    const save = () => {
      totalArr.value[idx.value].flag = flag.value;
      totalArr.value[idx.value].btnText = btnText.value, totalArr.value[idx.value].trueShow = trueShow.value;
      totalArr.value[idx.value].falseShow = falseShow.value;
      totalArr.value[idx.value].isShow = isShow.value;
      totalArr.value[idx.value].height = obj.value.height;
      totalArr.value[idx.value].paddingBottom = obj.value.paddingBottom;
      totalArr.value[idx.value].opacity = opacity.value;
      for (var i = 0; i < 4; i++) {
        totalArr.value[idx.value].bgc[i] = Views_GreeChallenge_answerGain_question.questions[idx.value].options[i].bgc;
      }
    };
    const ansArr = common_vendor.ref([]);
    const next = async () => {
      if (toDayAnswerCnt.value >= restrictCnt.value && idx.value == 4) {
        common_vendor.index.showToast({
          title: "今日答题次数已上限",
          icon: "exception"
        });
        return;
      }
      if (idx.value == 4 && flag.value) {
        await common_vendor.index.request({
          url: common_global.DomainName + "/knowledge/submitAnswerRecord",
          method: "POST",
          data: {
            answerDate: getDate(),
            correctCnt: correctCnt.value,
            typeId: typeId.value,
            userId: userStore.user.id
          }
        });
        const res2 = await common_vendor.index.request({
          url: common_global.DomainName + "/knowledge/answerCorrectCnt",
          method: "GET",
          data: {
            answerDate: getDate(),
            userId: userStore.user.id
          }
        });
        ansArr.value = res2.data.data;
        ansOpen();
        utils_emitter.emitter.on("ansClose", () => {
          ansClose();
        });
        return;
      }
      if (flag.value) {
        if (idx.value < 4) {
          idx.value++;
          init();
        }
        return;
      }
      if (opacity.value == 0.3)
        return;
      btnText.value = "下一题";
      if (idx.value == 4 && !flag.value) {
        btnText.value = "完成";
      }
      var temp = 0;
      for (var i = 0; i < 4; i++) {
        if (q.value[idx.value].options[i].isSelected)
          temp = i;
      }
      var zq = q.value[idx.value].zq;
      if (temp == zq) {
        correctCnt.value++;
        q.value[idx.value].options[temp].bgc = back[2];
        trueShow.value[temp] = true;
      } else {
        q.value[idx.value].options[temp].bgc = back[3];
        falseShow.value[temp] = true;
      }
      dealAnswer();
      flag.value = true;
      save();
    };
    const front = () => {
      if (idx.value > 0) {
        idx.value--;
        init();
      }
    };
    const transfer = (val) => {
      if (flag.value)
        return;
      if (!q.value[idx.value].options[val].isSelected) {
        opacity.value = 1;
        q.value[idx.value].options[val].isSelected = true;
        q.value[idx.value].options[val].bgc = back[1];
        for (var i = 0; i < 4; i++) {
          if (i != val) {
            q.value[idx.value].options[i].isSelected = false;
            q.value[idx.value].options[i].bgc = back[0];
          }
        }
      } else {
        opacity.value = 0.3;
        q.value[idx.value].options[val].isSelected = false;
        q.value[idx.value].options[val].bgc = back[0];
      }
    };
    const dealAnswer = () => {
      isShow.value = !isShow.value;
      if (isShow.value) {
        obj.value.height = "1308rpx";
        var temp1 = Views_GreeChallenge_answerGain_question.questions[idx.value].anwerDescription.length;
        var temp2 = Views_GreeChallenge_answerGain_question.questions[idx.value].title.length;
        var temp3 = 0;
        for (var i = 0; i < 4; i++) {
          var k = Views_GreeChallenge_answerGain_question.questions[idx.value].options[i].text.length / 18;
          if (k >= 1)
            temp3 += k;
        }
        if (temp1 / 20 >= 1)
          temp1 = temp1 / 20 * 50;
        if (temp2 / 18 >= 1)
          temp2 = temp2 / 18 * 40;
        if (temp3 == 0)
          temp3 = 2;
        temp3 = temp3 * 40;
        obj.value.paddingBottom = temp1 + temp2 + temp3 + 50 + "rpx";
      } else {
        obj.value.height = "100%";
        obj.value.paddingBottom = "40rpx";
      }
    };
    const idx = common_vendor.ref(0);
    const ansOpen = () => {
      answer.value.open();
    };
    const ansClose = () => {
      answer.value.close();
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
        a: common_vendor.unref(common_global.KnowledgeChallengeImgUrl) + "answerGain/background.png",
        b: common_vendor.unref(common_global.KnowledgeChallengeImgUrl) + "answerGain/logo.png",
        c: common_vendor.t(q.value[idx.value].qid),
        d: common_vendor.t(q.value[idx.value].title),
        e: common_vendor.f(q.value[idx.value].options, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.text),
            b: trueShow.value[index]
          }, trueShow.value[index] ? {
            c: common_assets._imports_0
          } : {}, {
            d: falseShow.value[index]
          }, falseShow.value[index] ? {
            e: common_assets._imports_1
          } : {}, {
            f: common_vendor.o(($event) => transfer(index)),
            g: index,
            h: item.bgc
          });
        }),
        f: common_vendor.t(common_vendor.unref(Views_GreeChallenge_answerGain_question.questions)[idx.value].correctResponse),
        g: common_vendor.t(common_vendor.unref(Views_GreeChallenge_answerGain_question.questions)[idx.value].anwerDescription),
        h: isShow.value,
        i: common_vendor.o(front),
        j: common_vendor.t(btnText.value),
        k: common_vendor.o(next),
        l: opacity.value,
        m: common_vendor.s(obj.value),
        n: common_vendor.p({
          ansArr: ansArr.value,
          typeId: typeId.value
        }),
        o: () => ({
          r: answer,
          k: "answer"
        }),
        p: common_vendor.p({
          type: "dialog",
          ["is-mask-click"]: false
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cc925d87"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/GreeChallenge/answerGain/answerGain.vue"]]);
my.createPage(MiniProgramPage);
