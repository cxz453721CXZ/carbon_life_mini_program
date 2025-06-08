"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_global = require("../../../common/global.js");
const store_user = require("../../../store/user.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "comments",
  setup(__props) {
    const userStore = store_user.userInfoStore();
    const styObj = common_vendor.ref({});
    const inputObj = common_vendor.ref({});
    const btnObj = common_vendor.ref({});
    const isShow = common_vendor.ref(true);
    const isFocus = common_vendor.ref(false);
    const firstComments = common_vendor.ref([]);
    const detailObj = common_vendor.ref({});
    const fid = common_vendor.ref(-1);
    const sid = common_vendor.ref(-1);
    const receiver = common_vendor.ref("");
    const AllCommentsCnt = common_vendor.ref(0);
    const upvoteState = [common_global.CommunityImgUrl + "index/dz.png", common_global.CommunityImgUrl + "index/dzs.png"];
    const upvoteSytle = common_vendor.ref("");
    const isUpvoted = common_vendor.ref("");
    const upvoteCnt = common_vendor.ref(0);
    common_vendor.onLoad((options) => {
      console.log(options);
      const temp = JSON.parse(options.isFocus);
      isUpvoted.value = options.isUpvoted;
      if (isUpvoted.value == "1")
        upvoteSytle.value = upvoteState[1];
      else
        upvoteSytle.value = upvoteState[0];
      if (temp) {
        focus();
      }
      detailObj.value = JSON.parse(options.obj);
      upvoteCnt.value = detailObj.value.upvote;
      AllCommentsCnt.value = detailObj.value.pls;
    });
    const upvote = async (upvoteIdVal, typeIdVal) => {
      if (typeIdVal == 0) {
        if (isUpvoted.value == "1")
          return;
      } else {
        if (map[upvoteIdVal] == 1)
          return;
      }
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
      if (typeIdVal == 0) {
        upvoteSytle.value = upvoteState[1];
        upvoteCnt.value++;
      } else {
        deal();
      }
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
          typeId: 1
        }
      });
      upvoteArr.value = res.data.data;
      for (var i = 0; i < upvoteArr.value.length; i++) {
        if (upvoteArr.value[i])
          map[upvoteArr.value[i]] = 1;
      }
      for (var i = 0; i < firstComments.value.length; i++) {
        if (map[firstComments.value[i].fid])
          isUpvoteList.value[i] = upvoteState[1];
        else
          isUpvoteList.value[i] = upvoteState[0];
      }
      console.log(isUpvoteList.value);
    };
    const deal = async () => {
      const res = await common_vendor.index.request({
        url: common_global.DomainName + "/community/selectFirstCommentsByPubId",
        method: "GET",
        data: {
          pubId: detailObj.value.id
        }
      });
      console.log(res.data.data);
      firstComments.value = res.data.data;
      dealCommentsCnt();
      initAllUpvotes();
    };
    common_vendor.onMounted(async () => {
      deal();
    });
    const dealCommentsCnt = () => {
      var cnt = 0;
      for (var i = 0; i < firstComments.value.length; i++) {
        cnt += firstComments.value[i].secondCommentsDetails.length;
      }
      cnt += firstComments.value.length;
      AllCommentsCnt.value = cnt;
      console.log(AllCommentsCnt.value);
    };
    const blur = () => {
      btnObj.value.width = "316.88rpx";
      inputObj.value.width = "240rpx";
      isShow.value = true;
      isFocus.value = false;
    };
    const focus = () => {
      inputObj.value.color = "#000";
      inputObj.value.width = "420rpx";
      btnObj.value.width = "496.88rpx";
      isShow.value = false;
    };
    const setMessage = (val1, val2) => {
      isFocus.value = true;
      fid.value = val1;
      receiver.value = val2;
    };
    const setSecondMessage = (val1, val2, val3) => {
      isFocus.value = true;
      fid.value = val1;
      sid.value = val2;
      receiver.value = val3;
    };
    const plContent = common_vendor.ref("");
    const send = async () => {
      if (userStore.user.id == "000000") {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "fail"
        });
        return;
      }
      const tempContent = plContent.value;
      plContent.value = "";
      if (tempContent == "") {
        common_vendor.index.showToast({
          title: "请输入内容"
        });
        return;
      }
      if (fid.value == -1) {
        const res = await common_vendor.index.request({
          url: common_global.DomainName + "/community/publishFirstComments",
          method: "POST",
          data: {
            plContent: tempContent,
            ipAddress: "未知",
            plDate: getDate(),
            upvote: 0,
            pls: 0,
            pubId: detailObj.value.id,
            userId: userStore.user.id
          }
        });
        console.log(res);
      } else if (fid.value != -1 && sid.value == -1) {
        const res = await common_vendor.index.request({
          url: common_global.DomainName + "/community/publishSecondComments",
          method: "POST",
          data: {
            plContent: tempContent,
            pls: 0,
            ipAddress: "未知",
            fid: fid.value,
            receiver: receiver.value,
            userId: userStore.user.id,
            plDate: getDate()
          }
        });
        console.log(res);
        fid.value = -1;
        receiver.value = "";
      } else {
        const tempObj = {
          plContent: tempContent,
          pls: 0,
          ipAddress: "未知",
          fid: fid.value,
          receiver: receiver.value,
          userId: userStore.user.id,
          plDate: getDate()
        };
        const res = await common_vendor.index.request({
          url: common_global.DomainName + "/community/answerSecondComments?sid=" + sid.value,
          method: "POST",
          data: JSON.stringify(tempObj)
        });
        console.log(res);
        fid.value = -1;
        sid.value = -1;
        receiver.value = "";
      }
      deal();
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
        a: detailObj.value.avatar,
        b: common_vendor.t(detailObj.value.userName),
        c: detailObj.value.url,
        d: common_vendor.t(detailObj.value.title),
        e: common_vendor.t(detailObj.value.content),
        f: common_vendor.t(detailObj.value.pubDate.replace("-", ".").replace("-", ".")),
        g: common_vendor.t(AllCommentsCnt.value),
        h: common_vendor.f(firstComments.value, (item, index, i0) => {
          var _a;
          return {
            a: item.avatar,
            b: common_vendor.t(item.userName),
            c: common_vendor.t(item.plContent),
            d: common_vendor.t(item.plDate.replace("-", ".").replace("-", ".").slice(5)),
            e: common_vendor.t(item.ipAddress),
            f: (_a = isUpvoteList.value) == null ? void 0 : _a[index],
            g: common_vendor.t(item.upvote),
            h: common_vendor.o(($event) => upvote(item.fid, 1), index),
            i: common_vendor.t(item.pls),
            j: common_vendor.o(($event) => setMessage(item.fid, item.userName), index),
            k: common_vendor.f(item.secondCommentsDetails, (it, idx, i1) => {
              return {
                a: it.avatar,
                b: common_vendor.t(it.userName),
                c: common_vendor.t(it.receiver),
                d: common_vendor.t(it.plContent),
                e: common_vendor.t(it.plDate.replace("-", ".").replace("-", ".").slice(5)),
                f: common_vendor.t(it.ipAddress),
                g: common_vendor.t(it.pls),
                h: common_vendor.o(($event) => setSecondMessage(item.fid, it.sid, it.userName), idx),
                i: idx
              };
            }),
            l: index
          };
        }),
        i: common_vendor.unref(common_global.CommunityImgUrl) + "comments/xx.png",
        j: common_vendor.unref(common_global.CommunityImgUrl) + "comments/xx2.png",
        k: isFocus.value,
        l: common_vendor.o(focus),
        m: common_vendor.o(blur),
        n: common_vendor.s(inputObj.value),
        o: plContent.value,
        p: common_vendor.o(($event) => plContent.value = $event.detail.value),
        q: common_vendor.s(btnObj.value),
        r: upvoteSytle.value,
        s: common_vendor.t(upvoteCnt.value),
        t: common_vendor.o(($event) => upvote(detailObj.value.id, 0)),
        v: common_vendor.unref(common_global.CommunityImgUrl) + "comments/xx3.png",
        w: common_vendor.t(AllCommentsCnt.value),
        x: common_vendor.o(($event) => isFocus.value = true),
        y: common_vendor.unref(common_global.CommunityImgUrl) + "comments/zf.png",
        z: common_vendor.t(detailObj.value.transfer),
        A: isShow.value,
        B: !isShow.value,
        C: common_vendor.o(send),
        D: common_vendor.s(styObj.value)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fd91d665"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/community/comments/comments.vue"]]);
wx.createPage(MiniProgramPage);
