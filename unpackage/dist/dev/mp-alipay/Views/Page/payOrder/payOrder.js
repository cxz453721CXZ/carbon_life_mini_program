"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_global = require("../../../common/global.js");
const utils_emitter = require("../../../utils/emitter.js");
const store_user = require("../../../store/user.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (addressVue + _easycom_uni_popup + changeVue + popupVue + cPopupVue + changeSuccessVue)();
}
const addressVue = () => "../component/address.js";
const popupVue = () => "../component/popup.js";
const changeVue = () => "../component/change.js";
const cPopupVue = () => "../component/cPopup.js";
const changeSuccessVue = () => "../component/changeSuccess.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "payOrder",
  setup(__props) {
    const userStore = store_user.userInfoStore();
    const good = common_vendor.ref([]);
    const changePrice = common_vendor.ref(0);
    const changeCnt = common_vendor.ref(1);
    const tempAddress = common_vendor.ref("请输入/选择地址");
    const realAddress = common_vendor.ref("");
    const addId = common_vendor.ref(0);
    common_vendor.onLoad((options) => {
      good.value = JSON.parse(options.good);
      changePrice.value = good.value.price;
      console.log(good.value);
    });
    const getDefaultAddress = async () => {
      const res = await common_vendor.index.request({
        url: common_global.DomainName + "/change/queryUserDefaultAddress",
        method: "GET",
        data: {
          id: userStore.user.id
        }
      });
      if (res.data.data != null) {
        addId.value = res.data.data.id;
        realAddress.value = (res.data.data.region + " " + res.data.data.detailAddress).split("/").join("");
        tempAddress.value = (res.data.data.region + " " + res.data.data.detailAddress).split("/").join("");
        if (tempAddress.value.length > 14)
          tempAddress.value = tempAddress.value.slice(0, 14) + "...";
      }
    };
    const pointsChangeGoods = async () => {
      if (tempAddress.value == "请输入/选择地址") {
        common_vendor.index.showToast({
          title: "请选择地址",
          icon: "fail"
        });
        return;
      }
      const res = await common_vendor.index.request({
        url: common_global.DomainName + "/change/pointsChangeGoods",
        method: "POST",
        data: {
          orderDate: getDate(),
          goodId: good.value.id,
          addressId: addId.value,
          quantity: changeCnt.value,
          userId: userStore.user.id
        }
      });
      console.log(res);
      if (res.data.code == "200") {
        successPop();
      } else {
        common_vendor.index.showToast({
          title: "积分不足",
          icon: "fail"
        });
      }
    };
    common_vendor.onMounted(() => {
      utils_emitter.emitter.on("open", () => {
        open();
      });
      utils_emitter.emitter.on("close", () => {
        close();
      });
      utils_emitter.emitter.on("pop", () => {
        pop();
      });
      utils_emitter.emitter.on("cClose", (obj) => {
        cClose(obj);
      });
      utils_emitter.emitter.on("cPopClose", () => {
        cPopClose();
      });
      utils_emitter.emitter.on("successPop", () => {
        successPop();
      });
      utils_emitter.emitter.on("popClose", () => {
        popClose();
      });
      utils_emitter.emitter.on("cPop", () => {
        cPop();
      });
      utils_emitter.emitter.on("changeGoods", () => {
        pointsChangeGoods();
      });
      utils_emitter.emitter.on("addId", (val) => {
        addId.value = val;
      });
      utils_emitter.emitter.on("addAddressOrder", (val) => {
        realAddress.value = val;
        tempAddress.value = val;
        if (tempAddress.value.length > 14)
          tempAddress.value = tempAddress.value.slice(0, 14) + "...";
      });
      getDefaultAddress();
    });
    const jumpToAddress = () => {
      open();
    };
    const popup = common_vendor.ref(null);
    const open = () => {
      popup.value.open("bottom");
    };
    const close = () => {
      popup.value.close();
    };
    const jumpToChange = () => {
      cOpen();
    };
    const change = common_vendor.ref(null);
    const cOpen = () => {
      change.value.open("bottom");
    };
    const cClose = (obj) => {
      if (obj.confirm) {
        changePrice.value = obj.cnt * good.value.price;
        changeCnt.value = obj.cnt;
      }
      change.value.close();
    };
    const alertDialog = common_vendor.ref(null);
    const cAlertDialog = common_vendor.ref(null);
    const success = common_vendor.ref(null);
    const successPop = () => {
      success.value.open();
    };
    const pop = () => {
      alertDialog.value.open();
    };
    const popClose = () => {
      alertDialog.value.close();
    };
    const cPop = () => {
      cAlertDialog.value.open();
    };
    const cPopClose = () => {
      cAlertDialog.value.close();
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
        a: good.value.url,
        b: common_vendor.t(good.value.price),
        c: common_vendor.t(good.value.name),
        d: common_vendor.t(good.value.type),
        e: common_vendor.t(good.value.sales),
        f: common_vendor.t(good.value.name),
        g: common_vendor.t(changeCnt.value),
        h: common_vendor.unref(common_global.PointsMallImgUrl) + "payOrder/yjt.png",
        i: common_vendor.o(jumpToChange),
        j: common_vendor.t(tempAddress.value),
        k: common_vendor.unref(common_global.PointsMallImgUrl) + "payOrder/yjt.png",
        l: common_vendor.o(jumpToAddress),
        m: common_vendor.t(good.value.detail),
        n: good.value.url,
        o: common_vendor.t(changePrice.value),
        p: common_vendor.o(cPop),
        q: () => ({
          r: popup,
          k: "popup"
        }),
        r: common_vendor.o(change.value),
        s: common_vendor.p({
          ["background-color"]: "#fff"
        }),
        t: common_vendor.p({
          good: good.value
        }),
        v: () => ({
          r: change,
          k: "change"
        }),
        w: common_vendor.o(change.value),
        x: common_vendor.p({
          ["background-color"]: "#fff"
        }),
        y: () => ({
          r: alertDialog,
          k: "alertDialog"
        }),
        z: common_vendor.p({
          type: "dialog"
        }),
        A: common_vendor.p({
          changePrice: changePrice.value
        }),
        B: () => ({
          r: cAlertDialog,
          k: "cAlertDialog"
        }),
        C: common_vendor.p({
          type: "dialog"
        }),
        D: () => ({
          r: success,
          k: "success"
        }),
        E: common_vendor.p({
          type: "dialog"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a0cae330"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/Page/payOrder/payOrder.vue"]]);
my.createPage(MiniProgramPage);
