"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_global = require("../../../common/global.js");
const store_user = require("../../../store/user.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const userStore = store_user.userInfoStore();
    const isShow = common_vendor.ref(false);
    const isNew = common_vendor.ref(true);
    const isHot = common_vendor.ref(false);
    const firTitle = common_vendor.ref(false);
    const secTitle = common_vendor.ref(false);
    const contentText = common_vendor.ref("");
    const newObj = common_vendor.ref({});
    const hotObj = common_vendor.ref({});
    const newTextColor = common_vendor.ref("#fff");
    const hotTextColor = common_vendor.ref("#000");
    const firstColor = common_vendor.ref("#000");
    const secondColor = common_vendor.ref("#000");
    const firstUrl = common_vendor.ref(common_global.CommunityImgUrl + "index/jh2.png");
    const secondUrl = common_vendor.ref(common_global.CommunityImgUrl + "index/jh2.png");
    const upvoteState = [common_global.CommunityImgUrl + "index/dz.png", common_global.CommunityImgUrl + "index/dzs.png"];
    const publishInfo = common_vendor.ref([]);
    common_vendor.onMounted(() => {
      search();
    });
    common_vendor.onShow(() => {
      search();
    });
    const toNew = () => {
      isNew.value = true;
      isHot.value = false;
      newObj.value.backgroundColor = "#20d0c5";
      newTextColor.value = "#fff";
      hotObj.value.backgroundColor = "#e7e6e4";
      hotTextColor.value = "#000";
      search();
    };
    const toHot = () => {
      isNew.value = false;
      isHot.value = true;
      newObj.value.backgroundColor = "#e7e6e4";
      newTextColor.value = "#000";
      hotObj.value.backgroundColor = "#20d0c5";
      hotTextColor.value = "#fff";
      search();
    };
    const toFirst = () => {
      firTitle.value = !firTitle.value;
      if (firTitle.value) {
        firstColor.value = "#20d0c5";
        firstUrl.value = common_global.CommunityImgUrl + "index/jh.png";
      } else {
        firstColor.value = "#000";
        firstUrl.value = common_global.CommunityImgUrl + "index/jh2.png";
      }
      search();
    };
    const toSecond = () => {
      secTitle.value = !secTitle.value;
      if (secTitle.value) {
        secondColor.value = "#20d0c5";
        secondUrl.value = common_global.CommunityImgUrl + "index/jh.png";
      } else {
        secondColor.value = "#000";
        secondUrl.value = common_global.CommunityImgUrl + "index/jh2.png";
      }
      search();
    };
    const search = async () => {
      const res = await common_vendor.index.request({
        url: common_global.DomainName + "/community/filterPublishRecord",
        method: "GET",
        data: {
          isNew: isNew.value,
          isHot: isHot.value,
          firTitle: firTitle.value,
          secTitle: secTitle.value,
          contentText: contentText.value
        }
      });
      publishInfo.value = res.data.data;
      initAllUpvotes();
    };
    const upvoteArr = common_vendor.ref([]);
    const map = [];
    const isUpvoteList = common_vendor.ref([]);
    const initAllUpvotes = async () => {
      const res = await common_vendor.index.request({
        url: common_global.DomainName + "/community/queryAllUpvotePublish",
        method: "GET",
        data: {
          userId: userStore.user.id,
          typeId: 0
        }
      });
      upvoteArr.value = res.data.data;
      for (var i = 0; i < upvoteArr.value.length; i++) {
        if (upvoteArr.value[i])
          map[upvoteArr.value[i]] = 1;
      }
      for (var i = 0; i < publishInfo.value.length; i++) {
        if (map[publishInfo.value[i].id])
          isUpvoteList.value[i] = upvoteState[1];
        else
          isUpvoteList.value[i] = upvoteState[0];
      }
    };
    const upvote = async (upvoteIdVal, typeIdVal) => {
      const res = await common_vendor.index.request({
        url: common_global.DomainName + "/community/upvoteToCommentsOrPublish",
        method: "POST",
        data: {
          upvoteId: upvoteIdVal,
          typeId: typeIdVal,
          userId: userStore.user.id
        }
      });
      console.log(res);
      const isUpvoted = res.data.data;
      if (isUpvoted) {
        search();
      }
    };
    const jump = (item) => {
      common_vendor.index.navigateTo({
        url: "../comments/comments?isFocus=true&isUpvoted=" + map[item.id] + "&obj=" + JSON.stringify(item)
      });
    };
    const focus = () => {
      isShow.value = true;
    };
    const blur = () => {
      isShow.value = false;
    };
    const jumpToPublish = () => {
      if (userStore.user.id == "000000") {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "fail"
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: "../publish/publish"
      });
    };
    const jumpToComments = (item) => {
      common_vendor.index.navigateTo({
        url: "../comments/comments?isFocus=false&isUpvoted=" + map[item.id] + "&obj=" + JSON.stringify(item)
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(common_global.CommunityImgUrl) + "index/search.png",
        b: common_vendor.o(focus),
        c: common_vendor.o(blur),
        d: contentText.value,
        e: common_vendor.o(($event) => contentText.value = $event.detail.value),
        f: common_vendor.unref(common_global.CommunityImgUrl) + "index/fs.png",
        g: common_vendor.o(search),
        h: common_vendor.unref(common_global.CommunityImgUrl) + "index/fs.png",
        i: common_vendor.o(jumpToPublish),
        j: newTextColor.value,
        k: common_vendor.s(newObj.value),
        l: common_vendor.o(toNew),
        m: hotTextColor.value,
        n: common_vendor.s(hotObj.value),
        o: common_vendor.o(toHot),
        p: firstUrl.value,
        q: firstColor.value,
        r: common_vendor.o(toFirst),
        s: secondUrl.value,
        t: secondColor.value,
        v: common_vendor.o(toSecond),
        w: common_vendor.f(publishInfo.value, (item, index, i0) => {
          var _a;
          return {
            a: item.avatar,
            b: common_vendor.t(item.userName),
            c: common_vendor.t(item.pubDate.replace("-", ".").replace("-", ".")),
            d: common_vendor.o(($event) => jumpToComments(item)),
            e: common_vendor.t(item.title),
            f: common_vendor.t(item.content),
            g: item.url,
            h: common_vendor.o(($event) => jumpToComments(item)),
            i: common_vendor.t(item.transfer),
            j: (_a = isUpvoteList.value) == null ? void 0 : _a[index],
            k: common_vendor.t(item.upvote),
            l: common_vendor.o(($event) => upvote(item.id, 0)),
            m: common_vendor.t(item.pls),
            n: common_vendor.o(($event) => jump(item)),
            o: index
          };
        }),
        x: common_vendor.unref(common_global.CommunityImgUrl) + "index/zf.png",
        y: common_vendor.unref(common_global.CommunityImgUrl) + "index/xx.png"
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5ae186ce"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/community/index/index.vue"]]);
my.createPage(MiniProgramPage);
