import headerView from '../views/header.art'
import httpModel from '../models/http'
import usersCon from './users'
import store from 'store'
class Header {
    constructor() {
        
    }
    async render() {
        await this.auth()
       let isSignin=''
        if (this.username) {
            isSignin = true;
        }
        let headerHtml = headerView({
            isSignin
        })
        $('header').html(headerHtml)
        if (this.username) {
            $('.username').html('欢迎您：' + this.username)
        } else {
            $('.username').html('请先登录')
        }
        $('#loginin').on('click', function () {
            usersCon.render()
        })
        // 注销
        $('#loginout').on('click', async () => {
            let result = await httpModel.get({
                url: '/api/users/signout'
            })
            if (result.ret) {
                location.reload()
            }
            store.remove('token')
            location.reload()
        })
    }
    async auth() {
        let result = await httpModel.get({
            url: '/api/users/isSignin'
        })
        let username = result.data.username
        this.isSignin = username ? true : false
        this.username = username
    }
}
export default new Header()