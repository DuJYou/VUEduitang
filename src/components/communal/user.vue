<template>
  <div class="user">
    <children :message="{userlist,album,collect,circle}"></children>
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
  components: {
    Children
  },
  data() {
    return {
      userlist: {},
      album: {},
      collect: {},
      circle: {},
      id: '',
      start: ''
    }
  },
  beforeCreate() {
    this.start = 0,
      // 用来记录上次ajax请求是否完成
      this.isLoaded = true
  },
  async mounted() {
    let bScroll = new BScroll('main', {
      pullUpLoad: true,
      click: true,
    })
    let { id } = this.$route.params;
    this.id = id
    let userlist = await get({
      url: "/napi/people/profile/",
      params: {
        user_id: this.id
      }
    })
    this.userlist = userlist.data
    //动态
    let circle = await get({
      url: "/napi/vienna/useractivity/personal/",
      params: {
        user_id: this.id,
        more: 1,
        limit: 24,
        start: this.start,
      }
    })
    this.start = circle.data.next_start
    this.circle = circle.data.object_list
    bScroll.on('pullingUp', async () => {
      let circle = await get({
        url: "/napi/vienna/useractivity/personal/",
        params: {
          user_id: this.id,
          more: 1,
          limit: 24,
          start: this.start,
        }
      })
      this.start = circle.data.next_start
      await this.$nextTick()
      bScroll.refresh()
      this.circle = [
        ...this.circle,
        ...circle.data.object_list
      ]
      bScroll.finishPullUp()
    })
    //专辑
    let album = await get({
      url: "/napi/album/list/by_user/",
      params: {
        user_id: this.id,
        more: 1,
        limit: 24,
        start: 0
      }
    })
    this.album = album.data.object_list

    //收藏
    let collect = await get({
      url: "/napi/favorite/list/",
      params: {
        user_id: this.id,
        more: 1,
        limit: 24,
        start: 0
      }
    })
    this.collect = collect.data.object_list
    console.log(this.collect);

  },
  methods: {

  }

}
</script>

<style lang="stylus" scoped></style>