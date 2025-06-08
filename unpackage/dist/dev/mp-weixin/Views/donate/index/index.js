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
  (addressVue + _easycom_uni_popup + popupVue)();
}
const addressVue = () => "../component/address.js";
const popupVue = () => "../component/popup.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const userStore = store_user.userInfoStore();
    const appointmentTime = common_vendor.ref("请输入预约时间");
    const weightArr = ["10kg", "10-20kg", "20-50kg", "50kg以上"];
    const tempWeight = common_vendor.ref("");
    const tempWeightId = common_vendor.ref(-1);
    common_vendor.onMounted(() => {
      utils_emitter.emitter.on("close", () => {
        popup.value.close();
      });
      utils_emitter.emitter.on("pop", () => {
        alertDialog.value.open();
      });
      utils_emitter.emitter.on("popClose", () => {
        alertDialog.value.close();
      });
      utils_emitter.emitter.on("addAddressOrder", (val) => {
        tempAddress.value = val;
      });
      utils_emitter.emitter.on("addId", (val) => {
        addId.value = val;
      });
      utils_emitter.emitter.on("appointmentTime", (val) => {
        appointmentTime.value = val;
        console.log(appointmentTime.value);
      });
      checkDefaultAddressIsExist();
      getDefaultAddress();
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
      }
    };
    const addId = common_vendor.ref(0);
    const tempAddress = common_vendor.ref("请填写回收地址信息");
    const checkDefaultAddressIsExist = async () => {
      const res = await common_vendor.index.request({
        url: common_global.DomainName + "/change/queryUserDefaultAddress",
        method: "GET",
        data: {
          id: userStore.user.id
        }
      });
      console.log(res);
      if (res.data.data != null) {
        tempAddress.value = (res.data.data.region + " " + res.data.data.detailAddress).split("/").join("");
      }
    };
    const clothes = [
      { name: "四季衣物", url: common_global.DonateImgUrl + "index/1.png" },
      { name: "帽子围巾", url: common_global.DonateImgUrl + "index/2.png" },
      { name: "床单被罩", url: common_global.DonateImgUrl + "index/3.png" },
      { name: "闲置旧包", url: common_global.DonateImgUrl + "index/4.png" },
      { name: "毛绒玩具", url: common_global.DonateImgUrl + "index/5.png" }
    ];
    const books = [
      { name: "文学小说", url: common_global.DonateImgUrl + "component/1.png" },
      { name: "人文社科", url: common_global.DonateImgUrl + "component/2.png" },
      { name: "生活艺术", url: common_global.DonateImgUrl + "component/3.png" },
      { name: "科学科普", url: common_global.DonateImgUrl + "component/4.png" },
      { name: "童书绘本", url: common_global.DonateImgUrl + "component/5.png" }
    ];
    const arr = common_vendor.ref(clothes);
    const fc = common_vendor.ref("#00ba9c");
    const sc = common_vendor.ref("#000");
    const mlObj = common_vendor.ref({
      marginLeft: 14.91 + "rpx"
      // marginLeft: 440.54 + 'rpx'
    });
    const tempFirstBook = common_vendor.ref(common_global.DonateImgUrl + "index/yf.png");
    const tempSecondBook = common_vendor.ref(common_global.DonateImgUrl + "index/yf2.png");
    const tempTextTip = common_vendor.ref("请选择衣物重量");
    const typeId = common_vendor.ref(0);
    const transfer = (val) => {
      if (val == 1) {
        typeId.value = val;
        fc.value = "#00ba9c";
        sc.value = "#000";
        mlObj.value.marginLeft = 14.91 + "rpx";
        arr.value = clothes;
        tempFirstBook.value = common_global.DonateImgUrl + "index/yf.png";
        tempSecondBook.value = common_global.DonateImgUrl + "index/yf2.png";
        tempTextTip.value = "请选择衣物重量";
      } else {
        typeId.value = val;
        sc.value = "#00ba9c";
        fc.value = "#000";
        mlObj.value.marginLeft = 440.54 + "rpx";
        arr.value = books;
        tempFirstBook.value = common_global.DonateImgUrl + "index/book2.png";
        tempSecondBook.value = common_global.DonateImgUrl + "index/book1.png";
        tempTextTip.value = "请选择书籍重量";
      }
    };
    const initState = common_vendor.ref([
      { isChecked: false, borderColor: "#E3E3E3" },
      { isChecked: false, borderColor: "#E3E3E3" },
      { isChecked: false, borderColor: "#E3E3E3" },
      { isChecked: false, borderColor: "#E3E3E3" }
    ]);
    const realPoints = common_vendor.ref(0);
    const points = common_vendor.ref("0");
    const changeState = (val) => {
      tempWeight.value = weightArr[val];
      tempWeightId.value = val;
      for (var i = 0; i < 4; i++) {
        if (i == val) {
          initState.value[i].isChecked = true;
          initState.value[i].borderColor = "#00ba9c";
        } else {
          initState.value[i].isChecked = false;
          initState.value[i].borderColor = "#E3E3E3";
        }
        if (val == 0) {
          points.value = "150";
          realPoints.value = 150;
        } else if (val == 1) {
          points.value = "300";
          realPoints.value = 300;
        } else if (val == 2) {
          points.value = "750";
          realPoints.value = 750;
        } else {
          points.value = "750以上";
          realPoints.value = 750;
        }
      }
    };
    const jumpToTime = () => {
      common_vendor.index.navigateTo({
        url: "../selectPeriod/selectPeriod"
      });
    };
    const popup = common_vendor.ref(null);
    const alertDialog = common_vendor.ref(null);
    const addAddress = () => {
      popup.value.open("bottom");
    };
    const jumpToDetail = async () => {
      console.log(typeId.value, 11111);
      if (tempWeightId.value == -1) {
        common_vendor.index.showToast({
          title: "请选择重量",
          icon: "fail"
        });
        return;
      }
      if (appointmentTime.value == "请输入预约时间") {
        common_vendor.index.showToast({
          title: "请输入预约时间",
          icon: "fail"
        });
        return;
      }
      const res = await common_vendor.index.request({
        url: common_global.DomainName + "/recycle/insertRecycleRecord",
        method: "POST",
        data: {
          type: typeId.value,
          weight: tempWeight.value,
          cycleAddressId: addId.value,
          cycleDate: appointmentTime.value,
          cycleReward: realPoints.value,
          userId: userStore.user.id,
          isAccess: 0
        }
      });
      console.log(res);
      common_vendor.index.showToast({
        title: "提交成功",
        icon: "success"
      });
      setTimeout(() => {
        common_vendor.index.navigateTo({
          url: "../orderDetail/orderDetail"
        });
      }, 1e3);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: tempFirstBook.value,
        b: common_vendor.o(($event) => transfer(1)),
        c: fc.value,
        d: common_vendor.o(($event) => transfer(2)),
        e: sc.value,
        f: common_vendor.s(mlObj.value),
        g: common_vendor.unref(common_global.DonateImgUrl) + "index/lb.png",
        h: arr.value[0].url,
        i: common_vendor.t(arr.value[0].name),
        j: arr.value[1].url,
        k: common_vendor.t(arr.value[1].name),
        l: arr.value[2].url,
        m: common_vendor.t(arr.value[2].name),
        n: arr.value[3].url,
        o: common_vendor.t(arr.value[3].name),
        p: arr.value[4].url,
        q: common_vendor.t(arr.value[4].name),
        r: common_vendor.unref(common_global.DonateImgUrl) + "index/hs.png",
        s: common_vendor.unref(common_global.DonateImgUrl) + "index/up.png",
        t: common_vendor.unref(common_global.DonateImgUrl) + "index/down.png",
        v: common_vendor.unref(common_global.DonateImgUrl) + "index/up.png",
        w: common_vendor.unref(common_global.DonateImgUrl) + "index/up.png",
        x: common_vendor.unref(common_global.DonateImgUrl) + "index/down.png",
        y: common_vendor.unref(common_global.DonateImgUrl) + "index/down.png",
        z: tempSecondBook.value,
        A: common_vendor.t(tempTextTip.value),
        B: initState.value[0].borderColor,
        C: common_vendor.o(($event) => changeState(0)),
        D: initState.value[0].isChecked
      }, initState.value[0].isChecked ? {
        E: common_vendor.unref(common_global.DonateImgUrl) + "index/dg.png"
      } : {}, {
        F: initState.value[1].borderColor,
        G: common_vendor.o(($event) => changeState(1)),
        H: initState.value[1].isChecked
      }, initState.value[1].isChecked ? {
        I: common_vendor.unref(common_global.DonateImgUrl) + "index/dg.png"
      } : {}, {
        J: initState.value[2].borderColor,
        K: common_vendor.o(($event) => changeState(2)),
        L: initState.value[2].isChecked
      }, initState.value[2].isChecked ? {
        M: common_vendor.unref(common_global.DonateImgUrl) + "index/dg.png"
      } : {}, {
        N: initState.value[3].borderColor,
        O: common_vendor.o(($event) => changeState(3)),
        P: initState.value[3].isChecked
      }, initState.value[3].isChecked ? {
        Q: common_vendor.unref(common_global.DonateImgUrl) + "index/dg.png"
      } : {}, {
        R: common_vendor.t(points.value),
        S: common_vendor.unref(common_global.DonateImgUrl) + "index/dw.png",
        T: common_vendor.t(tempAddress.value),
        U: common_vendor.unref(common_global.DonateImgUrl) + "index/yjt.png",
        V: common_vendor.o(addAddress),
        W: common_vendor.t(appointmentTime.value),
        X: common_vendor.unref(common_global.DonateImgUrl) + "index/yjt.png",
        Y: common_vendor.o(jumpToTime),
        Z: common_vendor.o(jumpToDetail),
        aa: common_vendor.sr(popup, "1d292155-0", {
          "k": "popup"
        }),
        ab: common_vendor.p({
          ["background-color"]: "#fff"
        }),
        ac: common_vendor.sr(alertDialog, "1d292155-2", {
          "k": "alertDialog"
        }),
        ad: common_vendor.p({
          type: "dialog"
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1d292155"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/donate/index/index.vue"]]);
wx.createPage(MiniProgramPage);
