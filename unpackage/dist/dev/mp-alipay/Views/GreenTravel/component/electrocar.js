"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_global = require("../../../common/global.js");
const utils_emitter = require("../../../utils/emitter.js");
const store_greenChallenge = require("../../../store/greenChallenge.js");
const store_user = require("../../../store/user.js");
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  _easycom_uni_file_picker2();
}
const _easycom_uni_file_picker = () => "../../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
if (!Math) {
  _easycom_uni_file_picker();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "electrocar",
  setup(__props) {
    const gcStore = store_greenChallenge.gc();
    const userStore = store_user.userInfoStore();
    const focus = () => {
      utils_emitter.emitter.emit("focus");
    };
    const blur = () => {
      utils_emitter.emitter.emit("blur");
    };
    const jump = () => {
      common_vendor.index.navigateTo({
        url: "../detail/detail?id=2"
      });
    };
    const text = common_vendor.ref("");
    const tempFile = common_vendor.ref("");
    const select = (e) => {
      tempFile.value = e.tempFilePaths[0];
    };
    const del = () => {
      console.log(tempFile.value);
      tempFile.value = "";
    };
    const returnUrl = common_vendor.ref(null);
    const obj = common_vendor.ref({
      id: "",
      type: "电动车",
      typeId: 2,
      photo: "",
      submitTime: "",
      submitData: 0,
      reward: 2,
      isAccess: 0,
      userId: userStore.user.id,
      subCnt: 0
    });
    const submit = async () => {
      const flag = await gcStore.checkCount(getDate(), 2, 1, userStore.user.id);
      if (!flag)
        return;
      if (tempFile.value != "" && text.value != "") {
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
            obj.value.submitData = Number(text.value);
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
      } else if (text.value == "") {
        common_vendor.index.showToast({
          title: "请输入骑行公里数",
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
        a: common_vendor.o(select),
        b: common_vendor.o(del),
        c: common_vendor.p({
          limit: 1,
          ["auto-upload"]: false
        }),
        d: common_vendor.o(focus),
        e: common_vendor.o(blur),
        f: text.value,
        g: common_vendor.o(($event) => text.value = $event.detail.value),
        h: common_vendor.unref(common_global.GreenChallenageImgUrl) + "component/ddc.jpg",
        i: common_vendor.o(submit),
        j: common_vendor.o(jump)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e270e20f"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/GreenTravel/component/electrocar.vue"]]);
my.createComponent(Component);
