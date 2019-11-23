<template>
  <div class="detail" v-if="details">
    <div class="dimg">
      <img :src="details.photo.path" alt />
    </div>
    <div class="usermessage">
      <p class="js">{{details.msg}}</p>
      <img class="ChatHead" :src="details.sender.avatar" alt />
      <router-link active-class="active" tag="li" :to="/user/+details.sender_id">
        <span class="username">{{details.sender.username}}</span>
      </router-link>
      <span class="root_album">收藏到 {{details.root_album.name}}</span>
      <span class="time">{{details.add_datetime}}</span>
    </div>
    <div class="lables">
      <div class="lables1">
        <p class="correlation">相关标签</p>
        <span class="lable" v-for="item in details.tags" :key="item.id">{{item.name}}</span>
      </div>
    </div>
    <div class="albums">
      <div class="albums_head">
        <span>收藏到以下专辑</span>
         <router-link active-class="active" tag="li" :to="/albumList/+this.id">
        <span class="number">{{details.favorite_count}}</span>
        <span class="arrows"></span>
         </router-link>
      </div>
      <div class="album" v-for="item in details.related_albums" :key="item.id">
        <router-link active-class="active" tag="li" :to="/album/+item.id">
          <div class="albumImg">
            <img :src="item.covers" alt />
          </div>
          <p>{{item.name}}</p>
          <span>by{{item.user.username}}</span>
        </router-link>
      </div>
    </div>
    <div class="liubai"></div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { get } from 'utils/http'
export default {
  data() {
    return {
      id: '',
      details: null
    }
  },
  async mounted() {
    let { id } = this.$route.params;
    // console.log(id);
    this.id=id
    await this.getData(id);
    let bScroll = new BScroll('main', {
      // pullUpLoad: true,
      click: true,
      // probeType: 2
    })
  },
  created() {

    //  console.log(id);

  },
  methods: {
    async getData(id) {
      let { data } = await get({
        url: "/napi/blog/detail/?&include_fields=tags%2Crelated_albums%2Crelated_albums.covers%2Croot_album%2Cshare_links_2%2Cextra_links%2Cicon_description%2Croot_id",
        params: {
          blog_id: id,
        }
      })
      //  console.log(1);
      this.details = data
      // console.log(this.details);
    }
  },


}
</script>

<style lang="stylus" scoped>
.detail
  width 100%
  background rgb(245, 245, 245)
  // overflow scroll
  margin-bottom 0.3rem
  // height 100%
  .dimg
    width 100%
    min-height 3rem
    background #fff
    img
      width 100%
  .usermessage
    position relative
    height 0.8rem
    background #fff
    li
      list-style none
    .js
      font-size 0.15rem
      color rgb(68, 68, 68)
      margin 0px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      // padding: .1rem 0px;
    .ChatHead
      padding 0.1rem 0.05rem
      width 0.5rem
      height 0.55rem
      border-radius 100%
    .username
      margin-bottom 0.03rem
      line-height 0.18rem
      font-size 0.13rem
      color rgb(68, 68, 68)
      position absolute
      top 0.3rem
      left 0.5rem
    .root_album
      font-size .12rem
      color rgb(119, 119, 119)
      position absolute
      top 0.5rem
      left 0.5rem
    .time
      height 0.37rem
      line-height 0.18rem
      font-size 0.11rem
      color rgb(170, 170, 170)
      position absolute
      right 0
      top 0.38rem
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
  .albums
    background rgb(255, 255, 255)
    margin 0.2rem 0
    .albums_head
      margin-left 0.08rem
      margin-right 0.08rem
      font-size 0.16rem
      color rgb(119, 119, 119)
      padding 0.1rem 0rem
      border-bottom 1px solid rgba(0, 0, 0, 0.08)
      position relative
      li  
        list-style none
      .number
        display inline-block
        // text-align right
        position absolute
        right 0.25rem
        top: .1rem
      .arrows
        display inline-block
        text-align right
        margin-left .10rem
        width .15rem
        height .17rem
        vertical-align bottom
        background-image url('https://c-ssl.duitang.com/uploads/item/201808/13/20180813160453_nWc8Q.png') // c-ssl.duitang.com/uploads/item/201808/13/20180813160453_nWc8Q.png);
        background-size contain
        background-repeat no-repeat
        position absolute
        right 0.05rem
        top 0.14rem
    .album
      display flex
      padding .10rem
      border-bottom 1px solid rgba(0, 0, 0, 0.08)
      position relative
      li 
        list-style none
        
      .albumImg
        width 0.6rem
        height 0.6rem
        border-radius .04rem
        img
          width 100%
          height 100%
      p
        padding 0 0.1rem
        height 0.22rem
        width 100%
        line-height 0.22rem
        font-size 0.16rem
        color rgb(68, 68, 68)
        position: absolute;
        top: .14rem;
        left: .70rem;
      span
        height 0.22rem
        width 100%
        line-height 0.17rem
        font-size 0.12rem
        color rgb(119, 119, 119)
        position absolute
        bottom 0.1rem
        left 0.8rem
  .liubai
    width 100%
    height 2rem
</style>