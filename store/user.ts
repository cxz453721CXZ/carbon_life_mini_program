import {defineStore} from "pinia";
import { DomainName } from "../common/global";
export const userInfoStore = defineStore('userInfo', {
	state: () => {
		return {
			user: {
				id: '000000',
				name: '登录',
				avatar: null,
				points: 0,
			}
		}
	},
	actions: {
		updateUserInfo: async () => {
			const res = await uni.request({
				url: DomainName + '/user/updateUser'
			})
			console.log(res)
		}
	}
})
