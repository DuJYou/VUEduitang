<template>
  <div>
    <div class="alb_userlist">
      <h2>{{message.userlist.name}}</h2>

      <p>{{message.userlist.count}}张图片</p>
      <router-link active-class="active" tag="li" :to="/user/+message.userlist.user.id">
        <div class="alb_img">
          <img :src="message.userlist.user?message.userlist.user.avatar:''" alt />
        </div>
        <div class="alb_username">{{message.userlist.user?message.userlist.user.username:''}}</div>
      </router-link>
    </div>
    <div class="alb_list">
      <div class="content_alb" v-for="item in message.albumlist" :key="item.index">
           <router-link active-class="active" tag="li" :to="/details/+item.id">
        <div class="img_alb">
          <img :src="item.photo.path" alt />
        </div>
         </router-link>
        <div class="word_alb">
          <p>{{item.msg}}</p>
          <p>★</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["message"]
}
</script>

<style lang="stylus" scoped>
.alb_userlist
  background-color white
  margin-top 4px
  padding 20px
  text-align center
  overflow hidden
  display flex
  flex-direction column
  justify-content center
  li 
    list-style none
  h3
    display block
    font-size 0.83em
    margin-block-start 1.67em
    margin-block-end 1.67em
    margin-inline-start 0px
    margin-inline-end 0px
    font-weight bold
  p
    font-size 0.12rem
    line-height 0.17rem
    color rgb(153, 153, 153)
    margin-top 0.04rem
  .alb_img
    background-size 100%
    width 0.4rem
    height 0.4rem
    border-radius 100%
    margin-left 1.46rem
    img
      width 100%
      height 100%
      border-radius 100%
.alb_list
  display flex
  flex-direction row
  flex-wrap wrap
  li 
    list-style none
  .content_alb
    margin-top .08rem
    margin-left  .10rem
    width 1.69rem
    height 2.26rem
    left 0rem
    margin-bottom .08rem
    min-height  .96rem
    padding-bottom .06rem
    background-color #fff
    font-size .12rem
    padding-bottom 0rem
    color rgb(51, 51, 51)
    overflow hidden
    .img_alb
      width 1.69rem
      height 1.69rem
      img
        width 100%
        height 100%
    .word_alb
      p
        font-size .12rem
        color rgb(51, 51, 51)
        margin 0px
        padding 0px
      .people_alb
        color rgb(153, 153, 153)
        margin-top .05rem
</style>