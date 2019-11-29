import layoutCon from '../controllers/layout'
import UsersView from '../views/users.art'
import httpModel from '../models/http'
class Users {
  constructor() {
    this.type = ''
    // this.isSignin = false
    // this.username = ''
  }
  render() {
    let that = this
    let UsersHtml = UsersView()
    $('.root').html(UsersHtml)
    $('#btn-cancel').on('click', function () {
      layoutCon.render()
    })
    // 注册登录按钮点击获取id
    $('#btn-signin, #btn-signup').on('click', function () {
      that.type = $(this).attr('id')
    })
    // console.log(that.type);
    
    //提交
    $('#btn-signin, #btn-signup').on('click', this.handleSubmit.bind(this))
  }
  async handleSubmit() {
    let data = $('.login-form').serialize()
    let result = await httpModel.get({
      // this.type 存储了用户点了“登录”或“注册”按钮
      url: '/api/users/' + (this.type === 'btn-signin' ? 'signin' : 'signup'),
      data,
      type: 'POST'
    })
    this.handleSubmitSucc(result)
    console.log(result);
    
  }
  handleSubmitSucc(result) {
    $('.login-form')[0].reset()
    if (result.ret) {
      // this.isSignin = true
      // this.username = result.data.username
      // let isSignin=this.isSignin
      // let username=this.username
      layoutCon.render()
      location.reload()
    } else {
      alert(result.data.message)
    }
  }
}
export default new Users()