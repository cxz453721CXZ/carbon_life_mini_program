"use strict";
const common_vendor = require("../../common/vendor.js");
const common_global = require("../../common/global.js");
const store_user = require("../../store/user.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "myMine",
  setup(__props) {
    const userStore = store_user.userInfoStore();
    const avatar = common_vendor.ref(common_global.MyImgUrl + "avatar.png");
    const name = common_vendor.ref("登录");
    const points = common_vendor.ref(0);
    const rank = common_vendor.ref(0);
    const develop = () => {
      common_vendor.index.showToast({
        title: "正在开发中",
        icon: "exception"
      });
    };
    common_vendor.onMounted(async () => {
      const response = await common_vendor.index.request({
        url: common_global.DomainName + "/test/session",
        method: "GET"
      });
      console.log(response);
      userStore.user = response.data.data;
      avatar.value = userStore.user.avatar;
      name.value = userStore.user.name;
      points.value = userStore.user.points;
      const res2 = await common_vendor.index.request({
        url: common_global.DomainName + "/knowledge/selectUserPointsRank",
        method: "GET",
        data: {
          userId: userStore.user.id
        }
      });
      rank.value = res2.data.data;
      dealDate();
    });
    const login = async () => {
      const auth = await my.getAuthCode({
        scopes: "auth_user"
      });
      const res = await common_vendor.index.request({
        url: common_global.DomainName + "/test/auth",
        data: {
          authCode: auth.authCode
        }
      });
      const openId = res.data.openId;
      const response = await common_vendor.index.request({
        url: common_global.DomainName + "/test/selectUserByOpenId",
        data: {
          openId
        }
      });
      console.log("===============>", response);
      userStore.user = response.data.data;
      avatar.value = userStore.user.avatar;
      name.value = userStore.user.name;
      points.value = userStore.user.points;
      const res2 = await common_vendor.index.request({
        url: common_global.DomainName + "/knowledge/selectUserPointsRank",
        method: "GET",
        data: {
          userId: userStore.user.id
        }
      });
      rank.value = res2.data.data;
      dealDate();
    };
    const dealDate = async () => {
      const res = await common_vendor.index.request({
        url: common_global.DomainName + "/user/updateDate",
        method: "GET",
        data: {
          currentTime: getDate(),
          id: userStore.user.id
        }
      });
      console.log(res.data);
    };
    const getDate = () => {
      let now = /* @__PURE__ */ new Date();
      let year = now.getFullYear();
      let month = (now.getMonth() + 1).toString().padStart(2, 0);
      let date = now.getDate().toString().padStart(2, 0);
      return year + "-" + month + "-" + date;
    };
    const jumpToOrderDetail = () => {
      if (userStore.user.id == "000000") {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "fail"
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: "../Page/orderDetail/orderDetail"
      });
    };
    const jumpToRecycle = () => {
      if (userStore.user.id == "000000") {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "fail"
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: "../donate/orderDetail/orderDetail"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(login),
        b: avatar.value,
        c: common_vendor.t(name.value),
        d: common_vendor.o(login),
        e: common_vendor.unref(common_global.MyImgUrl) + "jf.png",
        f: common_vendor.t(points.value),
        g: common_vendor.unref(common_global.MyImgUrl) + "pm.png",
        h: common_vendor.t(rank.value),
        i: common_vendor.unref(common_global.MyImgUrl) + "dd.png",
        j: common_vendor.unref(common_global.MyImgUrl) + "yjt.png",
        k: common_vendor.o(jumpToOrderDetail),
        l: common_vendor.unref(common_global.MyImgUrl) + "dz.png",
        m: common_vendor.unref(common_global.MyImgUrl) + "yjt.png",
        n: common_vendor.o(develop),
        o: common_vendor.unref(common_global.MyImgUrl) + "act.png",
        p: common_vendor.unref(common_global.MyImgUrl) + "yjt.png",
        q: common_vendor.o(develop),
        r: common_vendor.unref(common_global.MyImgUrl) + "hs.png",
        s: common_vendor.unref(common_global.MyImgUrl) + "yjt.png",
        t: common_vendor.o(jumpToRecycle)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/mine/myMine.vue"]]);
my.createPage(MiniProgramPage);
