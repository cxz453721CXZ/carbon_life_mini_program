<template>
	<view class="upload-warp">
		<view class="upload-block-preview" :style="{ height: height + 'rpx', width: width + 'rpx', borderRadius: radius + 'rpx' }" v-for="(file, index) in fileList" :key="file.url">
			<image
				@click="previewMedia(file)"
				class="img"
				:src="file.poster || file.url"
				:mode="mode"
			/>
			<view class="del-btn" @click="delFile(index)">
				<image
					class="icon"
					src="../../static/sh-upload/delete-icon.svg"
					mode="scaleToFill"
				/>
			</view>
		</view>
		<view class="upload-block" :style="{ height: height + 'rpx', width: width + 'rpx', borderRadius: radius + 'rpx' }" @click="chooseMedia">
			<image
				class="icon"
				src="../../static/sh-upload/camera-icon.svg"
				mode="scaleToFill"
			/>
		</view>
		<!-- 视频预览 -->
		<view class="preview-video" v-if="videoUrl">
			<image
				class="close"
				src="../../static/sh-upload/delete-icon.svg"
				mode="scaleToFill"
				@click="videoUrl = ''"
			/>
			<video :src="videoUrl"></video>
		</view>
	</view>
</template>

<script>
	export default {
    props: {
			/**
			 * @param {Number} limit 最大上传数量
			 **/
			limit: {
				type: Number,
				default: 9
			},
			/**
			 * @param {Number | String} radius 内部预览图片区域和选择图片按钮的区域圆角，单位rpx
			 **/
			radius: {
				type: [Number, String],
				default: 8
			},
			/**
			 * @param {Number | String} width 内部预览图片区域和选择图片按钮的区域宽度，单位rpx
			 **/
			 width: {
				type: [Number, String],
				default: 160
			},
			/**
			 * @param {Number | String} height 内部预览图片区域和选择图片按钮的区域高度，单位rpx
			 **/
			 height: {
				type: [Number, String],
				default: 160
			},
			/**
			 * @param {Number | String} height 内部预览图片区域和选择图片按钮的区域高度，单位rpx
			 **/
			 height: {
				type: [Number, String],
				default: 160
			},
			/**
			 * @param {Number} maxSize 上传文件大小限制
			 **/
			 maxSize: {
				type: Number,
				default: 0
			},
			/**
			 * @param {Number} count 最多可以选择的文件个数
			 **/
			count: {
				type: Number,
				default: 9
			},
			/**
			 * @param {Array} mediaType 媒体类型，可选值，image-图片，video-视频，mix-图片或视频
			 **/
			mediaType: {
				type: Array,
				default: () => ['mix']
			},
			/**
			 * @param {Array} sourceType 图片和视频选择的来源，可选值，album-从相册选择，camera-使用相机拍摄
			 **/
			sourceType: {
				type: Array,
				default: () => ['album', 'camera']
			},
			/**
			 * @param {Array} sizeType 仅对 mediaType 为 image 时有效，是否压缩所选文件
			 **/
			 sizeType: {
				type: Array,
				default: () => ['original', 'compressed']
			},
			/**
			 * @param {String} camera 仅在 sourceType 为 camera 时生效，使用前置或后置摄像头 可选值 back-使用后置摄像头 front-使用前置摄像头
			 **/
			 camera: {
				type: String,
				default: 'back'
			},
			/**
			 * @param {Number} maxDuration 拍摄视频最长拍摄时间，单位秒。时间范围为 3s 至 30s 之间
			 **/
			 maxDuration: {
				type: Number,
				default: 10
			},
			/**
			 * @param {Array} modelValue 文件上传的内容，格式为数组，数组的每个元素可以包含以下属性 [{ name: '', url: '' }]
			 **/
			modelValue: {
				type: Array,
				default: () => []
			},
			/**
			 * @param {Array} value 兼容vue2 文件上传的内容，格式为数组，数组的每个元素可以包含以下属性 [{ name: '', url: '' }]
			 **/
			value: {
				type: Array,
				default: () => []
			},
			/**
			 * @param {Function} onUpload 文件上传的钩子 需要用户手动操作上传
			 **/
			onUpload: {
				type: Function
			},
			/**
			 * @param {String} mode 文图片裁剪、缩放的模式
			 **/
			 mode: {
				type: String,
				default: 'aspectFill'
			}
    },
		emits: [
			'update:modelValue',
			'input'
		],
		model: {
			prop: 'modelValue',
			event: 'update:modelValue'
		},
		computed: {
			// 剩余可上传的数量
			surplusCount() {
				return this.limit - this.fileList.length;
			}
		},
		data() {
			return {
				fileList: [],
				videoUrl: ''
			}
		},
		mounted() {
			const fileList = [...this.modelValue, ...this.value]
			fileList.forEach(item => {
				const { type, url, poster } = item
				if (type === 'video') {
					// 此处默认为上传阿里云自动获取封面
					item.poster = poster || url + '?x-oss-process=video/snapshot,t_7000,f_jpg,w_800,h_600,m_fast'
				}
			})
			if (fileList.length !== 0) this.fileList = fileList
		},
		watch: {
			modelValue(newVal) {
				this.fileList = newVal
			},
			value(newVal) {
				this.fileList = newVal
			}
		},
		methods: {
			// 删除上传文件
			delFile(index) {
				const fileList =  [...this.fileList]
				fileList.splice(index, 1)
				this.$emit('update:modelValue', fileList)
				this.$emit('input', fileList)
			},
			// 媒体文件预览
			previewMedia(file) {
				const { type, url, poster } = file
				const current = this.fileList.findIndex(item => {
					return item.url === url
				})
				// #ifdef MP-WEIXIN
				wx.previewMedia({
					sources: this.fileList,
					current
				})
				// #endif
				// #ifndef MP-WEIXIN
				if (type === 'image') {
					const urls = this.fileList.filter(item => {
						return item.type === type
					}).map(item => item.url)
					uni.previewImage({
						current: current,
						urls
					})
				}

				if (type === 'video') {
					this.videoUrl = url
				}
				// #endif

			},
			chooseMedia() {
				let count = this.count
				if (count > 9) {  // 防止最大上传个数超过9
					count = 9
				}
				// 计算剩余最大还可以上传的个数
				if (this.surplusCount < count) {
					count = this.surplusCount
				}
				// #ifdef MP-WEIXIN || MP-TOUTIAO || MP-LARK || MP-JD
				uni.chooseMedia({
					count: count,
					mediaType: this.mediaType,
					sourceType: this.sourceType,
					sizeType: this.sizeType,
					camera: this.camera,
					maxDuration: this.maxDuration,
					success: (res) => {
						this.uploadFiles(res.tempFiles)
					}
				});
				// #endif
				// #ifndef MP-WEIXIN || MP-TOUTIAO || MP-LARK || MP-JD
				if (this.mediaType.includes('video')) {
					uni.chooseVideo({
						sourceType: this.sourceType,
						maxDuration: this.maxDuration,
						success: (res) => {
							// #ifdef WEB
							res.tempFiles = res.tempFiles.map(file => {
								const { path, name, size } = file
								return {
									tempFilePath: path,
									fileType: 'video',
									name,
									size
								}
							})
							// #endif
							this.uploadFiles(res.tempFiles)
						}
					});
					return
				}
				uni.chooseImage({
					count: count,
					sourceType: this.sourceType,
					success: (res) => {
						// #ifdef WEB
						res.tempFiles = res.tempFiles.map(file => {
							const { path, name, size } = file
							return {
								tempFilePath: path,
								fileType: 'image',
								name,
								size
							}
						})
						// #endif
						console.log('res -->', res);
						this.uploadFiles(res.tempFiles)
					}
				});
				// #endif
			},
			async uploadFiles(tempFiles) {
				if (!this.onUpload) {
					throw new Error('<sh-upload /> 组件需要onUpload属性')
				}
				if (this.maxSize) {
					const maxSize = this.maxSize * 1024 * 1024
					const sizeFit = tempFiles.every(item => {
						const { size } = item
						return maxSize > size
					})
					if (!sizeFit) {
						uni.showModal({
							title: '文件大小限制',
							showCancel: false,
							content: `单个文件大小不能超过${this.maxSize}M`
						});
						return
					}
				}
				uni.showLoading({
					title: '上传中',
					mask: true,
				})
				const files = tempFiles.map(file => this.onUpload(file))
				const uploadImages = await Promise.all(files)
				uni.hideLoading()
				// 判断用户是否有返回
				const hasUploadRes = uploadImages.every(item => {
					return item && item instanceof Object
				})
				if (!hasUploadRes) {
					throw new Error('<sh-upload /> 组件onUpload需要返回一个对象{ url, name, type, [poster] }')
				}
				// 如果没有设置类型那么默认就是图片
				uploadImages.forEach(item => {
					const { type } = item
					item.type || (item.type = 'image')
					if (type === 'video') {
						// 此处默认为上传阿里云自动获取封面
						item.poster = item.poster || item.url + '?x-oss-process=video/snapshot,t_100,f_jpg,w_800,h_800,m_fast'
					}
				})
				this.$emit('update:modelValue', [...this.fileList, ...uploadImages])
				this.$emit('input', [...this.fileList, ...uploadImages])
			},
		}
	}
</script>

<style scoped lang="scss">
$aspect: 160rpx;
.center{
	display: flex;
	justify-content: center;
	align-items: center;
}
.upload-warp{
	display: flex;
	flex-wrap: wrap;
	grid-gap: 10rpx;
	.upload-block {
		width: $aspect;
		height: $aspect;
		background: #f4f5f7;
		border-radius: 8rpx;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		.icon{
			width: 50rpx;
			height: 50rpx;
		}
	}
	.upload-block-preview {
		width: $aspect;
		height: $aspect;
		border-radius: 8rpx;
		overflow: hidden;
		position: relative;
		.del-btn {
			position: absolute;
			right: 0;
			z-index: 11;
			top: 0;
			background: rgba($color: #000000, $alpha: 0.6);
			border-radius: 0 0 0 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 30rpx;
			height: 30rpx;
			padding-left: 6rpx;
			padding-bottom: 6rpx;
			.icon {
				width: 16rpx;
				height: 16rpx;
			}
		}
		.img {
			width: 100%;
			height: 100%;
		}
	}
}
.preview-video {
	position: absolute;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.5);
	z-index: 22;
	display: flex;
	justify-content: center;
	align-items: center;
	.close {
		position: absolute;
		right: 40rpx;
		top: 60rpx;
		width: 40rpx;
		height: 40rpx;
		z-index: 22;
	}
	video {
		width: 100%;
	}
}
</style>
