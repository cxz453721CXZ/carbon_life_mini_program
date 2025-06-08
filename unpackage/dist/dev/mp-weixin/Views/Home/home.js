"use strict";
const common_vendor = require("../../common/vendor.js");
const store_user = require("../../store/user.js");
const common_global = require("../../common/global.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "home",
  setup(__props) {
    const userStore = store_user.userInfoStore();
    function jump(value) {
      if (value == "/Views/GreeChallenge/index/index") {
        if (userStore.user.id == "000000") {
          common_vendor.index.showToast({
            title: "请先登录",
            icon: "fail"
          });
          return;
        }
      }
      if (value == "/Views/GreenTravel/index/index") {
        if (userStore.user.id == "000000") {
          common_vendor.index.showToast({
            title: "请先登录",
            icon: "fail"
          });
          return;
        }
      }
      if (value == "/Views/Page/pointsMall/pointsMall") {
        if (userStore.user.id == "000000") {
          common_vendor.index.showToast({
            title: "请先登录",
            icon: "fail"
          });
          return;
        }
      }
      if (value == "/Views/donate/index/index") {
        if (userStore.user.id == "000000") {
          common_vendor.index.showToast({
            title: "请先登录",
            icon: "fail"
          });
          return;
        }
      }
      common_vendor.index.navigateTo({
        url: value
      });
    }
    const images = common_vendor.ref([
      {
        name: "知识挑战",
        img: common_global.HomeImgUrl + "kownledgetz.png",
        path: "/Views/GreeChallenge/index/index"
      },
      {
        name: "积分商城",
        img: common_global.HomeImgUrl + "pointsMall.png",
        path: "/Views/Page/pointsMall/pointsMall"
      },
      {
        name: "绿色挑战",
        img: common_global.HomeImgUrl + "lvsetz.png",
        path: "/Views/GreenTravel/index/index"
      },
      {
        name: "碳行者",
        img: common_global.HomeImgUrl + "carboner.png",
        path: "/Views/GreenTravel/index/index"
      },
      {
        name: "爱心捐赠",
        img: common_global.HomeImgUrl + "juanzeng.png",
        path: "/Views/donate/index/index"
      }
    ]);
    const essay = common_vendor.reactive([
      {
        img: common_global.HomeImgUrl + "zx1.png",
        title: "废纸如何进行回收再利用？"
      },
      {
        img: common_global.HomeImgUrl + "zx2.png",
        title: "环保创意风车在优化生态环境层面有哪些实际意义？"
      },
      {
        img: common_global.HomeImgUrl + "zx3.png",
        title: "新型环保机器人通过检测空气含氧量维持树木生长"
      },
      {
        img: common_global.HomeImgUrl + "zx4.png",
        title: "如何构建生态环保社区？"
      }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(common_global.HomeImgUrl) + "banner1.png",
        b: common_vendor.unref(common_global.HomeImgUrl) + "banner2.png",
        c: common_vendor.unref(common_global.HomeImgUrl) + "banner3.png",
        d: common_vendor.f(images.value, (item, k0, i0) => {
          return {
            a: item.img,
            b: common_vendor.o(($event) => jump(item.path)),
            c: common_vendor.t(item.name)
          };
        }),
        e: common_vendor.f(essay, (item, k0, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.title)
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/Home/home.vue"]]);
wx.createPage(MiniProgramPage);
