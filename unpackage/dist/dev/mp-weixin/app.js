"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_index = require("./store/index.js");
if (!Math) {
  "./Views/Home/home.js";
  "./Views/GreenTravel/subway/subway.js";
  "./Views/GreenTravel/bicycle/bicycle.js";
  "./Views/GreenTravel/index/index.js";
  "./Views/community/index/index.js";
  "./Views/community/comments/comments.js";
  "./Views/community/publish/publish.js";
  "./Views/GreeChallenge/index/index.js";
  "./Views/GreeChallenge/information/information.js";
  "./Views/GreeChallenge/personRank/personRank.js";
  "./Views/GreeChallenge/checkIn/checkIn.js";
  "./Views/GreeChallenge/questionnaires/questionnaires.js";
  "./Views/GreeChallenge/answerGain/answerGain.js";
  "./Views/Page/pointsMall/pointsMall.js";
  "./Views/mine/myMine.js";
  "./Views/Page/payOrder/payOrder.js";
  "./Views/Page/saveAddress/saveAddress.js";
  "./Views/Page/orderDetail/orderDetail.js";
  "./Views/GreeChallenge/topicClass/topicClass.js";
  "./Views/GreenTravel/newEnergy/newEnergy.js";
  "./Views/GreenTravel/cleanPlate/cleanPlate.js";
  "./Views/GreenTravel/garbageSorting/garbageSorting.js";
  "./Views/GreenTravel/recycle/recycle.js";
  "./Views/GreenTravel/detail/detail.js";
  "./Views/GreenTravel/activity/activity.js";
  "./Views/GreenTravel/details/details.js";
  "./Views/donate/index/index.js";
  "./Views/donate/selectPeriod/selectPeriod.js";
  "./Views/donate/orderDetail/orderDetail.js";
  "./Views/donate/saveAddress/saveAddress.js";
}
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  return {};
}
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(store_index.pinia);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
