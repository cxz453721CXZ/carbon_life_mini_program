"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_global = require("../../../common/global.js");
const utils_emitter = require("../../../utils/emitter.js");
const store_user = require("../../../store/user.js");
const Views_GreeChallenge_questionnaires_question = require("./question.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (questionPopVue + _easycom_uni_popup)();
}
const questionPopVue = () => "../component/questionPop.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "questionnaires",
  setup(__props) {
    const userStore = store_user.userInfoStore();
    const typeId = common_vendor.ref(0);
    common_vendor.onLoad((options) => {
      typeId.value = options.id;
    });
    common_vendor.ref([null, null, null, null, null]);
    common_vendor.ref([null, null, null, null, null]);
    const advice = common_vendor.ref("");
    const singleAnswer = common_vendor.ref([]);
    const checkBoxAnswer = common_vendor.ref([]);
    const question = common_vendor.ref(null);
    const questionOpen = () => {
      question.value.open();
    };
    const questionClose = () => {
      question.value.close();
    };
    const submit = async () => {
      const temp = [];
      var total = [];
      checkBoxAnswer.value.map((item, index) => {
        var tempStr = "";
        item.forEach((it) => {
          tempStr += it;
        });
        temp[index] = tempStr;
      });
      total = singleAnswer.value.concat(temp);
      const answer = total.join(",");
      console.log(answer);
      var cnt = 0;
      for (var i = 0; i < total.length; i++) {
        if (total[i] != "")
          cnt++;
      }
      if (cnt < 10) {
        common_vendor.index.showToast({
          title: "请答完所有题"
        });
      } else {
        const res = await common_vendor.index.request({
          url: common_global.DomainName + "/knowledge/submitQuestion",
          method: "POST",
          data: {
            answer,
            advice: advice.value,
            typeId: typeId.value,
            userId: userStore.user.id,
            submitDate: getDate()
          }
        });
        console.log(res);
        if (typeId.value == 1)
          utils_emitter.emitter.emit("endDeal1");
        else
          utils_emitter.emitter.emit("endDeal2");
        questionOpen();
        utils_emitter.emitter.on("questionClose", () => {
          questionClose();
        });
      }
    };
    const onchange = (e, val) => {
      singleAnswer.value[val] = e.detail.value;
      console.log(singleAnswer.value);
    };
    const checkBoxChange = (e, val) => {
      checkBoxAnswer.value[val] = e.detail.value;
      console.log(checkBoxAnswer.value);
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
        a: common_vendor.f(common_vendor.unref(Views_GreeChallenge_questionnaires_question.singleData), (item, index, i0) => {
          return {
            a: common_vendor.t(item.qid),
            b: common_vendor.t(item.title),
            c: common_vendor.f(item.options, (it, idx, i1) => {
              return {
                a: it.value,
                b: common_vendor.t(it.text),
                c: common_vendor.n(idx != 0 ? "mt-27" : "")
              };
            }),
            d: common_vendor.o(($event) => onchange($event, index)),
            e: index
          };
        }),
        b: common_vendor.f(common_vendor.unref(Views_GreeChallenge_questionnaires_question.checkBoxData), (item, index, i0) => {
          return {
            a: common_vendor.t(item.qid),
            b: common_vendor.t(item.title),
            c: common_vendor.f(item.options, (it, idx, i1) => {
              return {
                a: it.value,
                b: common_vendor.t(it.text),
                c: common_vendor.n(idx != 0 ? "mt-27" : "")
              };
            }),
            d: common_vendor.o(($event) => checkBoxChange($event, index)),
            e: index
          };
        }),
        c: advice.value,
        d: common_vendor.o(($event) => advice.value = $event.detail.value),
        e: common_vendor.o(submit),
        f: () => ({
          r: question,
          k: "question"
        }),
        g: common_vendor.p({
          type: "dialog",
          ["is-mask-click"]: false
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eb60e920"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/GreeChallenge/questionnaires/questionnaires.vue"]]);
my.createPage(MiniProgramPage);
