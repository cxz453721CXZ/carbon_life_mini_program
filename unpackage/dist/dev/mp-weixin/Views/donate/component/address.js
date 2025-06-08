"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_emitter = require("../../../utils/emitter.js");
const common_global = require("../../../common/global.js");
const store_user = require("../../../store/user.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "address",
  setup(__props) {
    const userStore = store_user.userInfoStore();
    const addressList = common_vendor.ref([]);
    const specificAddress = common_vendor.ref([]);
    common_vendor.onMounted(() => {
      init();
    });
    common_vendor.onShow(() => {
      init();
    });
    const init = async () => {
      const res = await common_vendor.index.request({
        url: common_global.DomainName + "/change/queryUserAllAddress",
        method: "GET",
        data: {
          userId: userStore.user.id
        }
      });
      addressList.value = res.data.data;
      for (var i = 0; i < addressList.value.length; i++) {
        specificAddress.value[i] = addressList.value[i].region.split("/").join("") + " " + addressList.value[i].detailAddress;
        if (specificAddress.value[i].length > 16) {
          specificAddress.value[i] = specificAddress.value[i].slice(0, 16) + "...";
        }
      }
    };
    const onchange = (event) => {
      const idx = event.detail.value;
      var temp = addressList.value[idx].region.split("/").join("") + " " + addressList.value[idx].detailAddress;
      const addId = addressList.value[idx].id;
      utils_emitter.emitter.emit("addAddressOrder", temp);
      utils_emitter.emitter.emit("addId", addId);
      utils_emitter.emitter.emit("close");
    };
    const close = () => {
      utils_emitter.emitter.emit("close");
    };
    const add = () => {
      common_vendor.index.navigateTo({
        url: "../saveAddress/saveAddress?isAdd=true"
      });
    };
    const delId = common_vendor.ref(0);
    const delAddress = async () => {
      const res = await common_vendor.index.request({
        url: common_global.DomainName + "/change/deleteUserAddressById",
        method: "GET",
        data: {
          id: delId.value
        }
      });
      console.log(res);
      init();
    };
    const del = (idVal) => {
      delId.value = idVal;
      utils_emitter.emitter.on("delAddress", () => {
        delAddress();
      });
      utils_emitter.emitter.emit("pop");
    };
    const edit = (obj) => {
      common_vendor.index.navigateTo({
        url: "../saveAddress/saveAddress?isAdd=false&obj=" + JSON.stringify(obj)
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(close),
        b: common_vendor.unref(common_global.PointsMallImgUrl) + "component/cha.png",
        c: common_vendor.f(addressList.value, (item, index, i0) => {
          return {
            a: index,
            b: common_vendor.t(item.consignee),
            c: common_vendor.t(item.phone),
            d: common_vendor.t(specificAddress.value[index]),
            e: common_vendor.o(($event) => del(item.id), index),
            f: common_vendor.o(($event) => edit(item), index),
            g: index
          };
        }),
        d: common_vendor.unref(common_global.PointsMallImgUrl) + "component/shanchu.png",
        e: common_vendor.unref(common_global.PointsMallImgUrl) + "component/bianji.png",
        f: common_vendor.o(onchange),
        g: common_vendor.o(add)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a3a0ae00"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/donate/component/address.vue"]]);
wx.createComponent(Component);
