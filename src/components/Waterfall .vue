<template>
  <div>
    <div class="col col1" ref="col1">
      <transition-group name="list">
        <div class="item" v-for="(item,index) in dataList1" :key="index">
          <router-link active-class="active" tag="li" :to="'/details/'+item.id">
            <img class="photo" :src="item.photo.path" />
          </router-link>
          <div class="name">
            <span class="photoname">{{item.album.name}}</span>
            <span class="commend">{{'★ '+item.album.favorite_count}}</span>
          </div>
          <div class="usermessage">
            <img class="ChatHead" :src="item.sender.avatar" alt />
            <router-link active-class="active" tag="li" :to="'/user/'+item.sender_id">
              <span class="username username1">{{item.sender.username}}</span>
            </router-link>
            <router-link active-class="active" tag="li" :to="'/album/'+item.album.id">
            <span class="photoname photoname1">{{item.album.name}}</span>
             </router-link>
          </div>
        </div>
      </transition-group>
    </div>
    <div class="col col2" ref="col2">
      <transition-group name="list">
        <div class="item" v-for="(item,index) in dataList2" :key="index+'1'">
          <router-link active-class="active" tag="li" :to="'/details/'+item.id">
            <img class="photo" :src="item.photo.path" />
          </router-link>
          <div class="name">
            <span class="photoname">{{item.album.name}}</span>
            <span class="commend">{{'★ '+item.album.favorite_count}}</span>
          </div>
          <div class="usermessage">
            <img class="ChatHead" :src="item.sender.avatar" alt />
            <router-link active-class="active" tag="li" :to="'/user/'+item.sender_id">
              <span class="username username1">{{item.sender.username}}</span>
            </router-link>
            
              <router-link active-class="active" tag="li" :to="'/album/'+item.album.id">
            <span class="photoname photoname1">{{item.album.name}}</span>
                     </router-link>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Vue from 'vue';
import { get } from 'utils/http'
import { Loading, Toast } from 'vant'
Vue.use(Loading).use(Toast)

export default {
  data() {
    return {
      mainMenuList: [],
      dataList1: [],
      dataList2: [],
    }
  },
  beforeCreate() {
    this.start = 0,
      // 用来记录上次ajax请求是否完成
      this.isLoaded = true
  },
  async mounted() {
    //页面初始化的时候获取数据
    let result = await get({
      url: '/napi/index/hot/?start=0&limit=24&more=1&include_fields=sender%2Calbum',
    })
    this.mainMenuList = result.data.object_list
    // console.log(this.mainMenuList);

    //用bsroll实现滚动
    let bScroll = new BScroll('main', {
      pullUpLoad: true,
      click: true,
    })
    //下拉的时候开始加载数据
    bScroll.on('pullingUp', async () => {
      if (this.start < this.mainMenuList.length) {
        this.start = this.start + 24
        let result = await get({
          url: '/napi/index/hot/?limit=24&more=1&include_fields=sender%2Calbum',
          params: {
            start: this.start,
          }
        })


        await this.$nextTick()
        bScroll.refresh()
        this.mainMenuList = [
          ...this.mainMenuList,
          ...result.data.object_list
        ]
        // console.log('总',this.mainMenuList);
        this.mountMenu()
      } else {
        Toast({
          message: '到底了~',
          position: 'bottom',
          duration: 1000
        })
      }
      bScroll.finishPullUp()
    })
    this.mountMenu()

  },
  //把获取的数据开始
  methods: {
    mountMenu(arg) {
      var temp = this.mainMenuList
      var index = arg || 0
      var refName = this.selectCol()
      if (temp.length > index) {
        this[refName].push(this.mainMenuList[index])
        this.$nextTick(() => {
          this.mountMenu(index + 1)
        })
      }

    },
    selectCol() {
      var getHeight = (ref) => {
        return this.$refs[ref].offsetHeight
      }
      var height1 = getHeight('col1')
      var height2 = getHeight('col2')
      switch (Math.min(height1, height2)) {
        case height1:
          return 'dataList1'
          break
        case height2:
          return 'dataList2'
          break
      }


    },

  },
}
</script>

<style lang="stylus" scoped>
.col, .col2
  display inline-block
  width 50%
  background #fff
  vertical-align top
  .item
    padding 0.1rem 0.07rem
    border 0.03rem solid rgb(224, 224, 224)
    li
      list-style none
    .photo
      width 100%
      height 100%
    .name
      height 0.5rem
      padding 0.08rem 0.08rem 0.05rem
      border-bottom 0.01rem solid rgb(224, 224, 224)
      .photoname
        font-size 12px
        color rgb(51, 51, 51)
        margin 0px
        padding 0px
        font-weight bold
        display block
      .commend
        color rgb(153, 153, 153)
        margin-top .05rem
    .usermessage
      position relative
      height 0.8rem
      .ChatHead
        padding 0.1rem 0.05rem
        width 0.5rem
        height 0.55rem
        border-radius 100%
      .username
        list-style none
        position absolute
        left 25%
        top 2%
        padding 0.1rem
        font-size 0.12rem
        color rgb(52, 152, 219)
      .photoname1
        position absolute
        font-size 0.12rem
        left 30%
        top 48%
</style>