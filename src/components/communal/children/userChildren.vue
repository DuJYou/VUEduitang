<template>
  <div class="user">
    <div
      class="user_bg"
      :style="{ 'background-image': 'url(' + message.userlist.background_img_url + ')','background-repeat':'no-repeat','background-size':'cover' }"
    >
      <div class="zz"></div>
      <div class="userheader">
        <img :src="message.userlist.avatar" alt />
        <h3>{{message.userlist.username}}</h3>
        <div class="fens">
          <span>关注 {{message.userlist.follow_count}}</span>
          <span>粉丝 {{message.userlist.be_follow_count}}</span>
        </div>
        <p class="intro">{{message.userlist.short_description}}</p>
      </div>
    </div>
    <div class="list">
      <!-- <van-tabs v-model="active" animated> -->
      <van-tabs animated @change="hand">
        <van-tab class="dhlis" default="dt" v-for="index in dh" :title="index" :key="index">
          <!-- 动态 -->
          <div v-if="type===0">
            <div class="circle" v-for="item in message.circle" :key="item.index">
              <div class="userlist_circle">
                <div class="header_circle">
                  <img :src="message.userlist.avatar" alt />
                </div>
                <div class="username_circle">{{message.userlist.username}}</div>
                <div class="time_circle">{{item.date_str}}</div>
              </div>
              <router-link active-class="active" tag="li" :to="/atlas/+item.data.resource_id">
                <div class="content_circle">
                  <div class="word_circle">{{item.data.atlas?item.data.atlas.desc:''}}</div>
                  <div class="img_list_circle">
                    <div
                      class="img_circle"
                      v-for="img in item.data.atlas?item.data.atlas.blogs:''"
                      :key="img.id"
                    >
                      <img :src="img.photo?img.photo.path:''" alt />
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
          <!-- 专辑 -->
          <div v-if="type===1">
            <div class="album">
              <div class="content_album" v-for="item in message.album" :key="item.index">
                <router-link active-class="active" tag="li" :to="/album/+item.id">
                  <div class="img_album">
                    <img :src="item.covers[0]" alt />
                  </div>
                </router-link>
                <div class="word_album">
                  <p>{{item.name}}</p>
                  <div class="people_album">
                    <span>{{item.count}}张图片</span>·
                    <span>{{item.favorite_count}}人收藏</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 收藏 -->
          <div v-if="type===2">
            <div class="collect" v-for="item in message.collect" :key="item.index">
              <div class="content_collect">
                <div class="header__collect">
                  <h3>{{item.title}}</h3>
                  <div class="img_collect">
                    <img :src="item.photos?item.photos[0].path:''" alt />
                  </div>
                </div>
                <div class="word_collect">
                  <div class="type_collect" left>
                    <span>{{item.type}}</span>|
                    <span>{{item.sender.username}}</span>
                  </div>
                  <div class="time_collect" right>{{item.add_datetime}}</div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div></div>
  </div>
</template>

<script>

import Vue from 'vue';
import { Tab, Tabs } from 'vant';
import 'vant/lib/index.css';

Vue.use(Tab).use(Tabs);
export default {
  props: ["message"],
  data() {
    return {
      dh: ["动态", "专辑", "收藏"],
      type: 0
    }
  },
  methods: {
    hand(title) {
      this.type = this.$toast(title).message
    }
  }
}
</script>

<style lang="stylus" scoped>
.user
  .user_bg
    width 100%
    height 3.75rem
    position relative
    color #fff
    // background
    .zz
      position absolute
      height 100%
      width 100%
      // padding-bottom 100%
      top 0
      left 0
      background linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1))
      z-index 66
    .userheader
      background-size 100%
      width 100%
      height 100%
      display flex
      align-items center
      justify-content center
      flex-direction column
      z-index 99
      img
        border-radius 100%
        width 0.8rem
        height 0.8rem
        // position absolute
        // top 0px
      h3
        font-size 0.2rem
        line-height 0.25rem
        font-weight 400
        margin-top 0.16rem
        color #fff
        z-index 99
      .fens
        color #fff
        z-index 99
        span
          font-size 0.13rem
          line-height 0.18rem
          margin-top 0.17rem
          color #fff
          z-index 999
      .intro
        color #fff
        z-index 99
  .list
    .circle
      display flex
      flex-direction column
      border-bottom 1px solid rgb(240, 240, 240)
      li
        list-style none
      .userlist_circle
        text-align left
        overflow hidden
        width 100%
        padding .22rem .19rem
        // border-bottom: 1px solid rgb(240, 240, 240);
        position relative
        .header_circle
          background-size 100%
          width 0.29rem
          height 0.29rem
          img
            border-radius 100%
            width 100%
            height 100%
        .username_circle
          position absolute
          top 0.2rem
          left 0.5rem
        .time_circle
          font-size 0.1rem
          color rgb(204, 204, 204)
          position absolute
          top 0.4rem
          left 0.5rem
      .content_circle
        padding-left .35rem
        width 100%
        padding: 0rem .24rem .20rem;
        .word_circle
          word-break break-all
          font-size .16rem
          color rgb(68, 68, 68)
          margin-top  .06rem
          width 100%
          overflow hidden
        .img_list_circle
          display flex
          flex-direction row
          flex-wrap wrap
          .img_circle
            box-sizing border-box
            // flex 1
            margin-left .08rem
            width .9674rem
            height .9674rem
            border-radius .04rem
            overflow hidden
            img
              width 100%
              height 100%
              margin .05rem 0
              background-size cover
              background-position center center
              background-repeat no-repeat
    .album
      display flex
      flex-direction row
      flex-wrap wrap
      .content_album
        margin-top .08rem
        margin-left  .20rem
        width 1.69rem
        height 2.26rem
        left 0rem
        margin-bottom .08rem
        min-height  .96rem
        padding-bottom .06rem
        background-color #fff
        font-size  .12rem
        padding-bottom 0rem
        color rgb(51, 51, 51)
        overflow hidden
        li
          list-style none
        .img_album
          width 1.69rem
          height 1.69rem
          img
            width 100%
            height 100%
        .word_album
          p
            font-size .12rem
            color rgb(51, 51, 51)
            margin 0rem
            padding 0rem
          .people_album
            color rgb(153, 153, 153)
            margin-top .05rem
    .collect
      display flex
      width 100%
      background #fff
      border-bottom 1px solid rgb(240, 240, 240)
      .content_collect
        padding .15rem .15rem .12rem
        .header__collect
          width 3.452rem
          height 0.6rem
          position relative
          h3
            display block
            margin-bottom .12rem
            width 80%
            max-height .40rem
            font-size .15rem
            font-weight 400
            line-height .20rem
            color rgb(68, 68, 68)
            text-overflow ellipsis
            word-break break-all
            white-space normal
            overflow hidden
          .img_collect
            display inline-block
            width .60rem
            height .60rem
            border-radius .04rem
            position absolute
            right 0
            top 0
            img
              width 100%
              height 100%
        .word_collect
          display flex
          flex-direction row
          .type_collect
            text-align left
            flex 1
          .time_collect
            text-align right
            flex 1
</style>