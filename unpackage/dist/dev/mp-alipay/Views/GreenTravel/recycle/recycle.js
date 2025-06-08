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
  __name: "recycle",
  setup(__props) {
    const gcStore = store_greenChallenge.gc();
    const userStore = store_user.userInfoStore();
    const tempFile = common_vendor.ref([]);
    const select = (e) => {
      tempFile.value.push(e.tempFilePaths[0]);
    };
    const del = (e) => {
      tempFile.value = tempFile.value.filter((item) => {
        return item !== e.tempFilePath;
      });
    };
    const jump = () => {
      common_vendor.index.navigateTo({
        url: "../details/details?id=8"
      });
    };
    const returnUrl = common_vendor.ref([]);
    const obj = common_vendor.ref({
      id: null,
      type: "循环利用",
      typeId: 8,
      photo: "",
      submitTime: "",
      submitData: 0,
      reward: 2,
      isAccess: 0,
      userId: userStore.user.id,
      subCnt: 0
    });
    const othObj = common_vendor.ref({
      id: null,
      photo: "",
      greenId: 0
    });
    const dealSqlData = async () => {
      const flag = await gcStore.checkCount(getDate(), 8, 1, userStore.user.id);
      if (!flag)
        return;
      const time = getDate();
      obj.value.submitTime = time;
      obj.value.photo = returnUrl.value[0];
      await common_vendor.index.request({
        url: common_global.DomainName + "/challenge/insertBike",
        method: "POST",
        data: {
          ...obj.value
        }
      });
      othObj.value.photo = returnUrl.value[1];
      await common_vendor.index.request({
        url: common_global.DomainName + "/challenge/insertOtherForm",
        method: "POST",
        data: {
          ...othObj.value
        }
      });
      common_vendor.index.showToast({
        title: "上传成功",
        icon: "success"
      });
    };
    const submit = async () => {
      if (tempFile.value.length == 2) {
        for (let i = 0; i < 2; i++) {
          const res = await common_vendor.index.uploadFile({
            url: common_global.DomainName + "/file/upload",
            filePath: tempFile.value[i],
            name: "file"
          });
          returnUrl.value[i] = res.data;
        }
        console.log(returnUrl.value);
        dealSqlData();
      } else {
        common_vendor.index.showToast({
          title: "请上传两张图片",
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
        a: common_vendor.unref(common_global.GreenChallenageImgUrl) + "recycle/xhly.png",
        b: common_vendor.o(select),
        c: common_vendor.o(del),
        d: common_vendor.p({
          limit: 2,
          ["auto-upload"]: false
        }),
        e: common_vendor.unref(common_global.GreenChallenageImgUrl) + "recycle/hs1.png",
        f: common_vendor.unref(common_global.GreenChallenageImgUrl) + "recycle/hs2.png",
        g: common_vendor.o(submit),
        h: common_vendor.o(jump)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-62279aca"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/GreenTravel/recycle/recycle.vue"]]);
my.createPage(MiniProgramPage);
