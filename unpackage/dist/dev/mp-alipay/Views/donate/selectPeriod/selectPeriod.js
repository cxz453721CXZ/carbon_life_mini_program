"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_emitter = require("../../../utils/emitter.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "selectPeriod",
  setup(__props) {
    const weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    const weekDay = common_vendor.ref([]);
    const futureDate = common_vendor.ref([]);
    const styleArr = [
      { backgroundColor: "#fff", color: "#000", borderColor: "#e8e8e8", text: "可预约" },
      { backgroundColor: "#fff", color: "#00ba9c", borderColor: "#00ba9c", text: "可预约" },
      { backgroundColor: "#f2f3f7", color: "#97989c", borderColor: "#fff", text: "已结束" }
    ];
    const tempStyleArr = common_vendor.ref([]);
    common_vendor.onMounted(() => {
      const todayWeekDay = getWeekDate();
      for (var i = 0; i < 7; i++) {
        weekDay.value[i] = weeks[(todayWeekDay + i) % 7];
      }
      weekDay.value[0] = "今天";
      weekDay.value[1] = "明天";
      weekDay.value[2] = "后天";
      for (var i = 0; i < 7; i++) {
        const today = /* @__PURE__ */ new Date();
        today.setDate(today.getDate() + i);
        futureDate.value[i] = (today.getMonth() + 1).toString().padStart(2, 0) + "-" + today.getDate().toString().padStart(2, 0);
      }
      console.log(futureDate.value);
      for (var i = 0; i < 4; i++) {
        tempStyleArr.value[i] = styleArr[0];
      }
      console.log(isDuringDate(getDate() + " 19:00", getDate() + " 21:03"));
      textColor.value[0] = "#00ba9c";
      dealTime(0);
    });
    const getWeekDate = () => {
      var now = /* @__PURE__ */ new Date();
      return now.getDay();
    };
    const textColor = common_vendor.ref(["#000", "#000", "#000", "#000", "#000", "#000", "#000"]);
    const isEnd = common_vendor.ref([false, false, false, false]);
    const tempIdx = common_vendor.ref(0);
    const tempState = common_vendor.ref(null);
    const tempTimeString = common_vendor.ref("暂未选择");
    const choose = (val) => {
      tempIdx.value = val;
      for (var i = 0; i < 7; i++) {
        if (i == val) {
          textColor.value[i] = "#00ba9c";
        } else {
          textColor.value[i] = "#000";
        }
      }
      dealTime(val);
    };
    const dealTime = (val) => {
      if (val == 0) {
        if (isDuringDate(getDate() + " 00:00", getDate() + " 12:00")) {
          tempStyleArr.value[0] = styleArr[0];
        } else {
          tempStyleArr.value[0] = styleArr[2];
          isEnd.value[0] = true;
        }
        if (isDuringDate(getDate() + " 00:00", getDate() + " 14:00")) {
          tempStyleArr.value[1] = styleArr[0];
        } else {
          tempStyleArr.value[1] = styleArr[2];
          isEnd.value[1] = true;
        }
        if (isDuringDate(getDate() + " 00:00", getDate() + " 16:00")) {
          tempStyleArr.value[2] = styleArr[0];
        } else {
          tempStyleArr.value[2] = styleArr[2];
          isEnd.value[2] = true;
        }
        if (isDuringDate(getDate() + " 00:00", getDate() + " 18:00")) {
          tempStyleArr.value[3] = styleArr[0];
        } else {
          tempStyleArr.value[3] = styleArr[2];
          isEnd.value[3] = true;
        }
      } else {
        for (var i = 0; i < 4; i++) {
          tempStyleArr.value[i] = styleArr[0];
        }
      }
    };
    const onChangeState = (val) => {
      tempState.value = val;
      if (tempIdx.value == 0) {
        if (val == 0) {
          if (isEnd.value[0])
            return;
          tempTimeString.value = "10:00-12:00";
        } else if (val == 1) {
          if (isEnd.value[1])
            return;
          tempTimeString.value = "12:00-14:00";
        } else if (val == 2) {
          if (isEnd.value[2])
            return;
          tempTimeString.value = "14:00-16:00";
        } else {
          if (isEnd.value[3])
            return;
          tempTimeString.value = "16:00-18:00";
        }
      } else {
        if (val == 0) {
          tempTimeString.value = "10:00-12:00";
        } else if (val == 1) {
          tempTimeString.value = "12:00-14:00";
        } else if (val == 2) {
          tempTimeString.value = "14:00-16:00";
        } else {
          tempTimeString.value = "16:00-18:00";
        }
      }
      if (tempIdx.value == 0) {
        for (var i = 0; i < 4; i++) {
          if (!isEnd.value[i]) {
            if (i == val) {
              tempStyleArr.value[i] = styleArr[1];
            } else {
              tempStyleArr.value[i] = styleArr[0];
            }
          }
        }
      } else {
        for (var i = 0; i < 4; i++) {
          if (i == val) {
            tempStyleArr.value[i] = styleArr[1];
          } else {
            tempStyleArr.value[i] = styleArr[0];
          }
        }
      }
    };
    const isDuringDate = (beginDateStr, endDateStr) => {
      var curDate = /* @__PURE__ */ new Date(), beginDate = new Date(beginDateStr), endDate = new Date(endDateStr);
      if (curDate >= beginDate && curDate <= endDate) {
        return true;
      }
      return false;
    };
    const getDate = () => {
      let now = /* @__PURE__ */ new Date();
      let year = now.getFullYear();
      let month = (now.getMonth() + 1).toString().padStart(2, 0);
      let date = now.getDate().toString().padStart(2, 0);
      return year + "-" + month + "-" + date;
    };
    const m = {
      "10:00-12:00": 0,
      "12:00-14:00": 1,
      "14:00-16:00": 2,
      "16:00-18:00": 3
    };
    const confirm = () => {
      if (tempTimeString.value == "暂未选择") {
        common_vendor.index.showToast({
          title: "请选择预约时间段",
          icon: "fail"
        });
        return;
      }
      if (tempIdx.value == 0) {
        console.log(m[tempTimeString.value]);
        if (isEnd.value[m[tempTimeString.value]]) {
          common_vendor.index.showToast({
            title: "当前预约时间段已结束",
            icon: "fail"
          });
          return;
        }
      }
      const appointmentTime = (/* @__PURE__ */ new Date()).getFullYear() + "-" + futureDate.value[tempIdx.value] + " " + tempTimeString.value;
      utils_emitter.emitter.emit("appointmentTime", appointmentTime);
      common_vendor.index.navigateBack({});
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(weeks, (item, index, i0) => {
          return {
            a: common_vendor.t(weekDay.value[index]),
            b: textColor.value[index],
            c: common_vendor.t(futureDate.value[index]),
            d: textColor.value[index],
            e: index,
            f: common_vendor.o(($event) => choose(index))
          };
        }),
        b: tempStyleArr.value[0].color,
        c: common_vendor.t(tempStyleArr.value[0].text),
        d: tempStyleArr.value[0].color,
        e: common_vendor.o(($event) => onChangeState(0)),
        f: tempStyleArr.value[0].backgroundColor,
        g: "1.88rpx solid " + tempStyleArr.value[0].borderColor,
        h: tempStyleArr.value[1].color,
        i: common_vendor.t(tempStyleArr.value[1].text),
        j: tempStyleArr.value[1].color,
        k: common_vendor.o(($event) => onChangeState(1)),
        l: tempStyleArr.value[1].backgroundColor,
        m: "1.88rpx solid " + tempStyleArr.value[1].borderColor,
        n: tempStyleArr.value[2].color,
        o: common_vendor.t(tempStyleArr.value[2].text),
        p: tempStyleArr.value[2].color,
        q: common_vendor.o(($event) => onChangeState(2)),
        r: tempStyleArr.value[2].backgroundColor,
        s: "1.88rpx solid " + tempStyleArr.value[2].borderColor,
        t: tempStyleArr.value[3].color,
        v: common_vendor.t(tempStyleArr.value[3].text),
        w: tempStyleArr.value[3].color,
        x: common_vendor.o(($event) => onChangeState(3)),
        y: tempStyleArr.value[3].backgroundColor,
        z: "1.88rpx solid " + tempStyleArr.value[3].borderColor,
        A: common_vendor.t((/* @__PURE__ */ new Date()).getFullYear() + "-" + futureDate.value[tempIdx.value] + " " + tempTimeString.value),
        B: common_vendor.o(confirm)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-46fc8975"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/donate/selectPeriod/selectPeriod.vue"]]);
my.createPage(MiniProgramPage);
