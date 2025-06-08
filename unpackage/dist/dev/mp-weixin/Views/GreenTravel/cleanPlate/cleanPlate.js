"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_global = require("../../../common/global.js");
const store_greenChallenge = require("../../../store/greenChallenge.js");
const store_user = require("../../../store/user.js");
if (!Array) {
  const _easycom_uni_file_picker22 = common_vendor.resolveComponent("uni-file-picker2");
  _easycom_uni_file_picker22();
}
const _easycom_uni_file_picker2 = () => "../../../uni_modules/uni-file-picker2/components/uni-file-picker2/uni-file-picker2.js";
if (!Math) {
  _easycom_uni_file_picker2();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "cleanPlate",
  setup(__props) {
    const gcStore = store_greenChallenge.gc();
    const userStore = store_user.userInfoStore();
    const tempFile = common_vendor.ref("");
    const select = (e) => {
      tempFile.value = e.tempFilePaths[0];
    };
    const del = () => {
      console.log(tempFile.value);
      tempFile.value = "";
    };
    const jump = () => {
      common_vendor.index.navigateTo({
        url: "../detail/detail?id=6"
      });
    };
    const returnUrl = common_vendor.ref(null);
    const obj = common_vendor.ref({
      id: "",
      type: "光盘行动",
      typeId: 6,
      photo: "",
      submitTime: "",
      submitData: 0,
      reward: 3,
      isAccess: 0,
      userId: userStore.user.id,
      subCnt: 0
    });
    const submit = async () => {
      const flag = await gcStore.checkCount(getDate(), 6, 3, userStore.user.id);
      if (!flag)
        return;
      if (tempFile.value != "") {
        common_vendor.index.uploadFile({
          url: common_global.DomainName + "/file/upload",
          filePath: tempFile.value,
          name: "file",
          success: async (res) => {
            returnUrl.value = res.data;
            console.log(returnUrl.value);
            const time = getDate();
            obj.value.submitTime = time;
            obj.value.photo = returnUrl.value;
            const response = await common_vendor.index.request({
              url: common_global.DomainName + "/challenge/insertBike",
              method: "POST",
              data: {
                ...obj.value
              }
            });
            console.log(response);
            common_vendor.index.showToast({
              title: "上传成功",
              icon: "success"
            });
          }
        });
      } else if (tempFile.value == "") {
        common_vendor.index.showToast({
          title: "请上传图片",
          icon: "fail"
        });
      }
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
        a: common_vendor.unref(common_global.GreenChallenageImgUrl) + "cleanPlate/gpxd.png",
        b: common_vendor.o(select),
        c: common_vendor.o(del),
        d: common_vendor.p({
          limit: 1,
          ["auto-upload"]: false
        }),
        e: common_vendor.unref(common_global.GreenChallenageImgUrl) + "cleanPlate/gp.png",
        f: common_vendor.o(submit),
        g: common_vendor.o(jump)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2d7b4380"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/GreenTravel/cleanPlate/cleanPlate.vue"]]);
wx.createPage(MiniProgramPage);
