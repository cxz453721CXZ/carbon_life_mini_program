"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_global = require("../../../common/global.js");
const store_user = require("../../../store/user.js");
const dayTitle = "日榜排名";
const totalTitle = "总榜排名";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "personRank",
  setup(__props) {
    const userStore = store_user.userInfoStore();
    const imgSrc = common_vendor.ref([
      common_global.KnowledgeChallengeImgUrl + "personRank/j.png",
      common_global.KnowledgeChallengeImgUrl + "personRank/y.png",
      common_global.KnowledgeChallengeImgUrl + "personRank/t.png"
    ]);
    const dayObj = common_vendor.ref({ color: "#4fb562" });
    const totalObj = common_vendor.ref({ color: "#7a7a78" });
    const borderObj = common_vendor.ref({ marginLeft: "15rpx" });
    const isTotal = common_vendor.ref(false);
    const dayRank = () => {
      dayObj.value.color = "#4fb562";
      totalObj.value.color = "#7a7a78";
      borderObj.value.marginLeft = "15rpx";
      isTotal.value = false;
      temp.value = todayUsers.value;
      tempRank.value = todayRank.value;
      tempTitle.value = dayTitle;
      userPoints.value = temp.value[tempRank.value - 1].points;
    };
    const totalRank = () => {
      dayObj.value.color = "#7a7a78";
      totalObj.value.color = "#4fb562";
      borderObj.value.marginLeft = "438rpx";
      isTotal.value = true;
      temp.value = users.value;
      tempRank.value = rank.value;
      tempTitle.value = totalTitle;
      userPoints.value = temp.value[tempRank.value - 1].points;
    };
    const users = common_vendor.ref([]);
    const todayUsers = common_vendor.ref([]);
    const rank = common_vendor.ref(0);
    const todayRank = common_vendor.ref(0);
    const temp = common_vendor.ref([]);
    const tempRank = common_vendor.ref(0);
    const tempTitle = common_vendor.ref("");
    const userAvatar = common_vendor.ref("");
    const userPoints = common_vendor.ref(0);
    common_vendor.onMounted(async () => {
      tempTitle.value = dayTitle;
      const res2 = await common_vendor.index.request({
        url: common_global.DomainName + "/knowledge/selectAllUsersTodayPoints",
        method: "GET",
        data: {
          todayDate: getDate()
        }
      });
      todayUsers.value = res2.data.data;
      for (var i = 0; i < todayUsers.value.length; i++) {
        todayUsers.value[i].points = todayUsers.value[i].todayPoints;
      }
      temp.value = todayUsers.value;
      const rankRes2 = await common_vendor.index.request({
        url: common_global.DomainName + "/knowledge/selectUserTodayRank",
        method: "GET",
        data: {
          userId: userStore.user.id,
          todayDate: getDate()
        }
      });
      todayRank.value = rankRes2.data.data;
      tempRank.value = todayRank.value;
      userAvatar.value = temp.value[tempRank.value - 1].avatar;
      userPoints.value = temp.value[tempRank.value - 1].points;
      const res = await common_vendor.index.request({
        url: common_global.DomainName + "/knowledge/selectAllUsers",
        method: "GET"
      });
      users.value = res.data.data;
      const rankRes = await common_vendor.index.request({
        url: common_global.DomainName + "/knowledge/selectUserPointsRank",
        method: "GET",
        data: {
          userId: userStore.user.id
        }
      });
      rank.value = rankRes.data.data;
    });
    const getDate = () => {
      let now = /* @__PURE__ */ new Date();
      let year = now.getFullYear();
      let month = (now.getMonth() + 1).toString().padStart(2, 0);
      let date = now.getDate().toString().padStart(2, 0);
      return year + "-" + month + "-" + date;
    };
    return (_ctx, _cache) => {
      return {
        a: userAvatar.value,
        b: common_vendor.t(tempTitle.value),
        c: common_vendor.t(tempRank.value),
        d: common_vendor.t(userPoints.value),
        e: common_vendor.o(dayRank),
        f: common_vendor.s(dayObj.value),
        g: common_vendor.o(totalRank),
        h: common_vendor.s(totalObj.value),
        i: common_vendor.s(borderObj.value),
        j: common_vendor.t(temp.value.length),
        k: isTotal.value,
        l: common_vendor.f(temp.value, (item, index, i0) => {
          var _a;
          return common_vendor.e({
            a: index <= 2
          }, index <= 2 ? {
            b: (_a = imgSrc.value) == null ? void 0 : _a[index]
          } : {}, {
            c: common_vendor.t((index + 1).toString().padStart(2, 0)),
            d: index > 2,
            e: item.avatar,
            f: common_vendor.t(item.name),
            g: common_vendor.t(item.points),
            h: index
          });
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0ee03ff4"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/GreeChallenge/personRank/personRank.vue"]]);
wx.createPage(MiniProgramPage);
