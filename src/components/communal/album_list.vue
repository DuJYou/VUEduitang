<template>
  <div>
    <div class="album" v-for="item in albumlist" :key="item.id">
      <router-link active-class="active" tag="li" :to="/album/+item.id">
        <div class="albumImg">
          <img :src="item.covers?item.covers[0]:''" alt />
        </div>
        <p>{{item.name}}</p>
        <span>by{{item.user.username}}</span>
      </router-link>
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
      id: '',
      albumlist: {},
      include_fields: "covers",
      start: 0,
    }
  },
  async mounted() {
    let bScroll = new BScroll('main', {
      pullUpLoad: true,
      click: true,
    })
    let { id } = this.$route.params
    this.id = id
    let albumlist = await get({
      url: '/napi/album/list/by_blog/',
      params: {
        start: this.start,
        limit: 24,
        more: 1,
        include_fields: this.include_fields,
        blog_id: this.id
      }
    })
    this.albumlist = albumlist.data.object_list
    bScroll.on('pullingUp', async () => {
      this.start += 24;
      let albumlist = await get({
        url: '/napi/album/list/by_blog/',
        params: {
          start: this.start,
          limit: 24,
          more: 1,
          include_fields: this.include_fields,
          blog_id: this.id
        }
      })
      await this.$nextTick()
      bScroll.refresh()
      this.albumlist = [
        ...this.albumlist,
        ...albumlist.data.object_list
      ]
      bScroll.finishPullUp()
    })
  }
}
</script>
<style lang="stylus" scoped>
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
    position absolute
    top .14rem
    left .70rem
  span
    height 0.22rem
    width 100%
    line-height 0.17rem
    font-size 0.12rem
    color rgb(119, 119, 119)
    position absolute
    bottom 0.1rem
    left 0.8rem
</style>