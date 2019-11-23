<template>
  <div class="atlas_mian">
    <div class="atlas">
      <div class="userlist_atlas">
        <div class="header_atlas">
          <img :src="atlas.sender?atlas.sender.avatar:''" alt />
        </div>
        <div class="username_atlas">{{atlas.sender?atlas.sender.username:''}}</div>
        <div class="time_atlas">2019.11.22</div>
      </div>
      <div class="content_atlas">
        <div class="word_atlas">{{atlas.desc?atlas.desc:''}}</div>
        <div class="img_list_atlas">
          <div class="img_atlas" v-for="img in atlas.blogs?atlas.blogs:''" :key="img.id">
               <router-link active-class="active" tag="li" :to="/details/+img.id">
       
            <img :src="img.photo?img.photo.path:''" alt />
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="sc">
      <div class="sc_content">
        <div class="sc_img">
          <img :src="atlas.album?atlas.album.selection_blogs[0].photo.path:''" alt />
        </div>
        <div class="sc_word">
          <h4>收藏到专辑慢慢看</h4>
          <div class="sc_people">
            <span>{{atlas.album?atlas.album.count:''}}张图片</span>
            <span>{{atlas.album?atlas.album.like_count:''}}人收藏</span>
          </div>
        </div>
      </div>
    </div>
    <div class="lables">
      <div class="lables1">
        <p class="correlation">相关标签</p>
        <span class="lable" v-for="item in atlas.tags" :key="item.id">{{item.name}}</span>
      </div>
    </div>
    <div class="comment">
      <h4>所有评论</h4>
      <div v-if="comment!=''">
        <div class="comment_url" v-for="item in comment" :key="item.id">
          <div class="header_comment">
            <img :src="item.sender?item.sender.avatar:''" alt />
          </div>
          <div class="username_comment">{{item.sender?item.sender.username:''}}</div>
          <div class="time_comment">{{item.create_time_str}}</div>
          <p>{{item.content}}</p>
        </div>
      </div>
      <div v-else>
          <div class="nocomment">
              <p>你也来说些什么吧</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Vue from 'vue';
import { Loading, Toast } from 'vant'
Vue.use(Loading).use(Toast)
import Children from './children/userChildren'
import { get } from 'utils/http'
import axios from 'axios'
export default {
  data() {
    return {
      atlas: {},
      comment: {},
      atlas_id: ''
    }
  },
  async mounted() {
    let { id } = this.$route.params;
    this.atlas_id = id
    let bScroll = new BScroll('main', {
      // pullUpLoad: true,
      click: true,
      // probeType: 2
    })
    let atlas = await get({
      url: "/napi/vienna/atlas/detail/",
      params: {
        atlas_id: this.atlas_id
      }
    })
    this.atlas = atlas.data
    let comment = await get({
      url: "/napi/vienna/comment/list/",
      params: {
        start: 0,
        limit: 24,
        more: 1,
        subject_type: 23,
        subject_id: this.atlas_id,
        topic_id: this.atlas_id,

      }
    })
    this.comment = comment.data.object_list

  }
}
</script>

<style lang="stylus" scoped>
.atlas_mian
  background-color rgb(255, 255, 255)
  .atlas
    display flex
    flex-direction column
    border-bottom 1px solid rgb(240, 240, 240)
    .userlist_atlas
      text-align left
      overflow hidden
      width 100%
      padding .22rem .19rem
      // border-bottom:. 1rem solid rgb(240, 240, 240);
      position relative
      .header_atlas
        background-size 100%
        width 0.29rem
        height 0.29rem
        img
          border-radius 100%
          width 100%
          height 100%
      .username_atlas
        position absolute
        top 0.2rem
        left 0.5rem
      .time_atlas
        font-size 0.1rem
        color rgb(204, 204, 204)
        position absolute
        top 0.4rem
        left 0.5rem
    .content_atlas
      padding-left .35rem
      width 100%
      .word_atlas
        word-break break-all
        font-size .16rem
        color rgb(68, 68, 68)
        margin-top .06rem
        width 100%
        overflow hidden
      .img_list_atlas
        display flex
        flex-direction row
        flex-wrap wrap
        .img_atlas
          box-sizing border-box
          // flex 1
          margin-left .08rem
          width .9674rem
          height .9674rem
          border-radius .04rem
          overflow hidden
          li    
            list-style none
          img
            width 100%
            height 100%
            margin 0.05rem 0
            background-size cover
            background-position center center
            background-repeat no-repeat
  .sc
    display flex
    justify-content flex-start
    align-items center
    margin .16rem .20rem  0rem
    flex-flow row nowrap
    border-width .01rem
    border-style solid
    border-color rgb(230, 230, 230)
    border-image initial
    border-radius .06rem
    width 100%
    height 0.85rem
    position relative
    .sc_img
      width .60rem
      height .60rem
      margin .10rem .08rem .10rem .10rem
      border-radius .04rem
      position absolute
      top 0
      left 0
      img
        width 100%
        height 100%
    .sc_word
      width 100%
      position absolute
      top 0.12rem
      left 0.8rem
      .sc_people
        margin-top 0.14rem
        span
          margin 0 .05rem
  .lables
    background #fff
    border-bottom none
    .lables1
      border-top 0.01rem solid rgb(199, 199, 199)
      margin 0rem 0.16rem
      padding 0.16rem 0rem 0.08rem
      .correlation
        font-size 0.14rem
        font-weight 400
        font-family PingFangSC-Regular
        color rgb(170, 170, 170)
      .lable
        display inline-block
        position relative
        font-size 0.14rem
        text-align center
        padding 0 0.15rem
        height 0.25rem
        line-height 0.25rem
        background-color rgb(245, 245, 245)
        margin 0.1rem 0.1rem 0 0
        color #888
        border 0.01rem solid #ddd
        border-radius 0.03rem
        box-sizing border-box
  .comment
    h4
      background-color rgb(255, 255, 255)
      color rgb(119, 119, 119)
      font-size 0.14rem
      padding 0.2rem 0.15rem 0.06rem
    .nocomment
        padding: .40rem 0rem 1rem;    
        p 
            display: block;
            color: rgb(204, 204, 204);
            width: 1.20rem;
            font-size: .14rem;
            text-align: center;
            background-image: url(https://c-ssl.duitang.com/uploads/people/201803/05/20180305122834_U.rerem.png);
            background-size: .99rem 1rem;
            margin: 0rem auto;
            padding: 1.12rem 0rem 0rem;
            background-position: center top;
            background-repeat: no-repeat;
    .comment_url
      text-align left
      overflow hidden
      width 100%
      padding 0.22rem 0.19rem
      // border-bottom: 1px solid rgb(240, 240, 240);
      position relative
      .header_comment
        background-size 100%
        width 0.29rem
        height 0.29rem
        img
          border-radius 100%
          width 100%
          height 100%
      .username_comment
        position absolute
        top 0.2rem
        left 0.5rem
      .time_comment
        font-size 0.1rem
        color rgb(204, 204, 204)
        position absolute
        top 0.4rem
        left 0.5rem
      p
        overflow-wrap break-word
        word-break break-all
        line-height 0.24rem
        padding-left 0.3rem
        padding-top 0.03rem
        font-size 0.15rem
        color rgb(68, 68, 68)
</style>