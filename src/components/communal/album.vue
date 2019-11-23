<template>
  <div>
    <album-children :message="{userlist,albumlist}"></album-children>
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
import albumChildren from './children/albumChildren'
export default {
  components: {
    albumChildren
  },
  data() {
    return {
    
      userlist: {},
      albumlist:{},
      id: '',   
       }
  },
  async mounted() {
    let bScroll = new BScroll('main', {
      pullUpLoad: true,
      click: true,
      // probeType: 2
    })
    let { id } = this.$route.params;
    this.id = id
    let userlist = await get({
      url: "/napi/album/detail/",
      params: {
        album_id: this.id
      }
    })
    this.userlist = userlist.data
    console.log(this.userlist);
    
    let albumlist = await get({
      url: "/napi/blog/list/by_album/",
      params: {
        start:0,
        limit:24,
        more:1,
        album_id: this.id
      }
    })
    this.albumlist = albumlist.data.object_list
    console.log(this.albumlist);
    

  }
}
</script>

<style lang="stylus" scoped></style>