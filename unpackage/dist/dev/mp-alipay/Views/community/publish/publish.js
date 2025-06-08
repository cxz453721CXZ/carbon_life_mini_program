"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_global = require("../../../common/global.js");
const store_user = require("../../../store/user.js");
if (!Array) {
  const _easycom_uni_file_picker32 = common_vendor.resolveComponent("uni-file-picker3");
  _easycom_uni_file_picker32();
}
const _easycom_uni_file_picker3 = () => "../../../uni_modules/uni-file-picker3/components/uni-file-picker3/uni-file-picker3.js";
if (!Math) {
  _easycom_uni_file_picker3();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "publish",
  setup(__props) {
    const userStore = store_user.userInfoStore();
    const focus = () => {
    };
    const blur = () => {
    };
    const title = common_vendor.ref("");
    const content = common_vendor.ref("");
    common_vendor.ref("");
    const tempFile = common_vendor.ref("");
    const returnUrl = common_vendor.ref("");
    const select = (e) => {
      tempFile.value = e.tempFilePaths[0];
    };
    const del = () => {
      console.log(tempFile.value);
      tempFile.value = "";
    };
    const mainTiltle = ["#绿色出行", "#低碳生活", "#公益活动"];
    const arr = common_vendor.ref([false, false, false]);
    const transfer = (val) => {
      arr.value[val] = !arr.value[val];
      if (arr.value[val]) {
        content.value += mainTiltle[val];
      } else {
        content.value = content.value.replace(mainTiltle[val], "");
      }
    };
    const publish = async () => {
      if (title.value == "") {
        common_vendor.index.showToast({
          title: "请输入标题",
          icon: "fail"
        });
        return;
      } else if (content.value == "") {
        common_vendor.index.showToast({
          title: "请输入内容",
          icon: "fail"
        });
        return;
      } else if (tempFile.value == "") {
        common_vendor.index.showToast({
          title: "请上传图片",
          icon: "fail"
        });
        return;
      }
      const res = await common_vendor.index.uploadFile({
        url: common_global.DomainName + "/file/upload",
        filePath: tempFile.value,
        name: "file"
      });
      returnUrl.value = res.data;
      const response = await common_vendor.index.request({
        url: common_global.DomainName + "/community/publish",
        method: "POST",
        data: {
          title: title.value,
          content: content.value,
          url: returnUrl.value,
          upvote: 0,
          pls: 0,
          userId: userStore.user.id,
          pubDate: getDate(),
          transfer: 0
        }
      });
      console.log(response);
      common_vendor.index.showToast({
        title: "发布成功",
        icon: "success"
      });
      routerJump("Views/community/index/index");
    };
    const routerJump = (val) => {
      let pages = getCurrentPages();
      var num = pages.length;
      var backnum = num;
      for (var i = 0; i < num; i++) {
        console.log(pages[i].route);
        if (pages[i].route == val) {
          backnum = num - i - 1;
        }
      }
      common_vendor.index.navigateBack({
        delta: backnum
        //返回的页面数，如果 delta 大于现有页面数，则返回到首页。
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
        a: common_vendor.o(select),
        b: common_vendor.o(del),
        c: common_vendor.p({
          limit: 1,
          ["auto-upload"]: false
        }),
        d: title.value,
        e: common_vendor.o(($event) => title.value = $event.detail.value),
        f: common_vendor.o(focus),
        g: common_vendor.o(blur),
        h: content.value,
        i: common_vendor.o(($event) => content.value = $event.detail.value),
        j: common_vendor.unref(common_global.CommunityImgUrl) + "publish/jhao.png",
        k: common_vendor.o(($event) => transfer(0)),
        l: common_vendor.unref(common_global.CommunityImgUrl) + "publish/jhao.png",
        m: common_vendor.o(($event) => transfer(1)),
        n: common_vendor.unref(common_global.CommunityImgUrl) + "publish/jhao.png",
        o: common_vendor.o(($event) => transfer(2)),
        p: common_vendor.o(publish)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-70e803c9"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/community/publish/publish.vue"]]);
my.createPage(MiniProgramPage);
