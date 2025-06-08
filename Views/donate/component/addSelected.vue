<template>
  <view>
    <uni-data-picker v-slot:default="{data, error, options}" :localdata="items" popup-title="选择省/市/区" @change="onchange" @nodeclick="onnodeclick">
		 <view class="picker" :style="pik">{{ tempSelected }}</view>
	</uni-data-picker>
  </view>
</template>

<script setup lang="ts">
 import {ref, onMounted} from 'vue' 
 import data from './area.json' 
 import emitter from '../../../utils/emitter';

 const items = ref(data)
 const selected = ref('选择省/市/区')
 const selectedItem = ref([])
 const pik = ref({color: '#CFCFCF'})
 
 const tempSelected = ref('选择省/市/区')
 
 
 onMounted(() => {
	 emitter.on('addRegion', (val:any) => {
		 selected.value = val
		 pik.value.color = "#000"
		 if(selected.value.length > 11) tempSelected.value = selected.value.slice(0, 11) + '...'
		 else tempSelected.value = selected.value
	 })
 })
 
 const onchange = (e) => {
	 selectedItem.value = e.detail.value
	 selected.value = ""
	 selectedItem.value.map((it, index) => {
		 selected.value += it.text
		 if(index != 2)
		 selected.value += "/"
	 })
	 if(selected.value.length > 11) tempSelected.value = selected.value.slice(0, 11) + '...'
	 else tempSelected.value = selected.value
	 pik.value.color = "#000"
	 emitter.emit('region', selected.value)
 }
 const onnodeclick = (node) => {
	console.log(node)
 }
     
  
</script>

<style lang="scss" scoped>
	.picker{
		font-size: 35rpx;
		line-height: 100rpx;
	}
</style>

