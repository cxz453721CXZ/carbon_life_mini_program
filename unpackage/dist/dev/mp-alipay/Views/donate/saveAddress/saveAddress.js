"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_global = require("../../../common/global.js");
const utils_emitter = require("../../../utils/emitter.js");
const store_user = require("../../../store/user.js");
if (!Math) {
  addSelectedVue();
}
const addSelectedVue = () => "../component/addSelected.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "saveAddress",
  setup(__props) {
    const userStore = store_user.userInfoStore();
    const consignee = common_vendor.ref("");
    const phone = common_vendor.ref("");
    const detailAddress = common_vendor.ref("");
    const isDefault = common_vendor.ref(0);
    const tempRegion = common_vendor.ref("");
    const checked = common_vendor.ref(false);
    const transfer = () => {
      checked.value = !checked.value;
      if (checked.value)
        isDefault.value = 1;
      else
        isDefault.value = 0;
    };
    const addressObj = common_vendor.ref({});
    const isAdd = common_vendor.ref(false);
    const id = common_vendor.ref(0);
    common_vendor.onLoad((options) => {
      isAdd.value = JSON.parse(options.isAdd);
      console.log(isAdd.value);
      if (isAdd.value)
        return;
      addressObj.value = JSON.parse(options.obj);
      id.value = addressObj.value.id;
      consignee.value = addressObj.value.consignee;
      phone.value = addressObj.value.phone;
      tempRegion.value = addressObj.value.region;
      detailAddress.value = addressObj.value.detailAddress;
      isDefault.value = addressObj.value.isDefault;
      if (isDefault.value)
        checked.value = true;
    });
    common_vendor.onMounted(() => {
      utils_emitter.emitter.on("region", (regionVal) => {
        tempRegion.value = regionVal;
      });
      if (!isAdd.value)
        utils_emitter.emitter.emit("addRegion", tempRegion.value);
    });
    const save = async () => {
      if (checked.value)
        isDefault.value = 1;
      const res = await common_vendor.index.request({
        url: common_global.DomainName + "/change/saveDeliveryAddress",
        method: "POST",
        data: {
          id: id.value,
          consignee: consignee.value,
          phone: phone.value,
          detailAddress: detailAddress.value,
          region: tempRegion.value,
          isDefault: isDefault.value,
          userId: userStore.user.id
        }
      });
      console.log(res);
      common_vendor.index.navigateBack({});
    };
    return (_ctx, _cache) => {
      return {
        a: consignee.value,
        b: common_vendor.o(($event) => consignee.value = $event.detail.value),
        c: phone.value,
        d: common_vendor.o(($event) => phone.value = $event.detail.value),
        e: common_vendor.unref(common_global.PointsMallImgUrl) + "saveAddress/yjt2.png",
        f: detailAddress.value,
        g: common_vendor.o(($event) => detailAddress.value = $event.detail.value),
        h: checked.value,
        i: common_vendor.o(transfer),
        j: common_vendor.o(save)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b2756f14"], ["__file", "D:/Web前端小程序/备份/carbon-life/Carbon-Life/Views/donate/saveAddress/saveAddress.vue"]]);
my.createPage(MiniProgramPage);
