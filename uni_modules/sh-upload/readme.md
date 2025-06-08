# 使用示例

```vue
<template>
	<sh-upload v-model="fileList" :onUpload="onUpload"></sh-upload>
</template>

<script setup>
import { ref } from 'vue'
const fileList = ref([])
const onUpload = async (file) => {
  const { tempFilePath, fileType, size } = file
	const uploadRes =await yourUploadApi(tempFilePath)
	uploadRes.type = fileType
	return {
    url: uploadRes.url,
    type: fileType,
    name: uploadRes.name,
    poster: uploadRes.poster, // 只有fileType为video时生效 组件默认用户上传至阿里云，默认阿里云显示视频封面
  }
}
</script>
```

# 属性
| 属性 | 类型 | 默认值 | 必填 | 说明 | 平台差异 |
| --- | --- | --- | --- | --- | --- |
| v-model | Array | [] | 是 | { url: string, type?: string, name?: string, poster?: string }[]  type默认值为 image | |
| onUpload | Function | ({ tempFilePath: string, fileType: string, size: number, name?: string }) => Promise<{ url: string, type?: string, name?: string, poster?: string }> |  是 | 调用用户自定义上传方法 | 函数参数name仅H5平台才会有 |
| limit | Number | 9 | 否 | 最大上传数量 | |
| count | Number | 9 | 否 | 最多可以同时选择的文件个数 | |
| mediaType | Array | ['mix'] | 否 | 媒体类型，可选值，image-图片，video-视频，mix-图片或视频 | mix仅支持微信小程序、抖音小程序、飞书小程序、京东小程序 |
| sourceType | Array | ['album', 'camera'] | 否 | 图片和视频选择的来源，可选值，album-从相册选择，camera-使用相机拍摄 | |
| sizeType | Array | ['original', 'compressed'] | 否 | 仅对 mediaType 为 image 时有效，是否压缩所选文件 | H5、 QQ小程序、快手小程序不支持 |
| camera | String | back | 否 | 仅在 sourceType 为 camera 时生效，使用前置或后置摄像头 可选值 back-使用后置摄像头 front-使用前置摄像头 | |
| maxDuration | Number | 10 | 否 | 拍摄视频最长拍摄时间，单位秒。时间范围为 3s 至 30s 之间 | |
| maxSize | Number | 0 | 否 | 上传文件大小限制，0为不限制 | |
| mode | String | aspectFill | 否 | 图片裁剪、缩放的模式 同image组件的mode属性 | |
| width | String 、 Number | 160 | 否 | 内部预览图片区域和选择图片按钮的区域宽度，单位rpx | |
| height | String 、 Number | 160 | 否 | 内部预览图片区域和选择图片按钮的区域高度，单位rpx | |
| radius | String 、 Number | 8 | 否 | 内部预览图片区域和选择图片按钮的区域圆角，单位rpx | |



