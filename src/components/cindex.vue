<template>
  <div class="index">
    <div class="sw">
      <ul>
        <swiper :options="swiperOption" ref="mySwiper" v-if="images.length>0">
          <swiper-slide indicator-color="#1989fa" v-for="(imagee, index) in images" :key="index">
            <router-link active-class="active" tag="li" to="/">
              <img :src="imagee.image" />
            </router-link>
          </swiper-slide>
        </swiper>
      </ul>
    </div>
    <div class="img_navigation">
      <ul>
        <router-link class="img_navli" tag="li" to="/wallpaper">
          <img
            src="https://c-ssl.duitang.com/uploads/people/201908/26/20190826020025_n5S2v.png"
            alt
          />
          <span class="imgWord">壁纸</span>
          <span class="zz"></span>
        </router-link>
        <router-link class="img_navli" tag="li" to="/buddha">
          <img
            src="https://c-ssl.duitang.com/uploads/people/201908/26/20190826020847_Kf2A5.png"
            alt
          />
          <span class="imgWord">头像</span>
          <span class="zz"></span>
        </router-link>
        <router-link class="img_navli" tag="li" to="/expression">
          <img
            src="https://c-ssl.duitang.com/uploads/people/201908/26/20190826021642_LNWyY.png"
            alt
          />
          <span class="imgWord">表情</span>
          <span class="zz"></span>
        </router-link>
        <router-link class="img_navli" tag="li" to="/word">
          <img
            src="https://c-ssl.duitang.com/uploads/people/201908/26/20190826021031_TZet2.png"
            alt
          />
          <span class="imgWord">文字</span>
          <span class="zz"></span>
        </router-link>
      </ul>
      <ul>
        <router-link class="img_navli" tag="li" to="/idol">
          <img
            src="https://c-ssl.duitang.com/uploads/people/201908/26/20190826021100_PjnFC.png"
            alt
          />
          <span class="imgWord">爱豆</span>
          <span class="zz"></span>
        </router-link>
        <router-link class="img_navli" tag="li" to="/movie">
          <img
            src="https://c-ssl.duitang.com/uploads/people/201908/26/20190826020723_xswVH.png"
            alt
          />
          <span class="imgWord">影视</span>
          <span class="zz"></span>
        </router-link>
        <router-link class="img_navli" tag="li" to="/cartoon">
          <img
            src="https://c-ssl.duitang.com/uploads/people/201908/26/20190826021141_yh3sj.png"
            alt
          />
          <span class="imgWord">动漫</span>
          <span class="zz"></span>
        </router-link>
        <router-link class="img_navli" tag="li" to="/category">
          <img
            src="https://c-ssl.duitang.com/uploads/people/201908/26/20190826021521_PhVBW.png"
            alt
          />
          <span class="imgWord2"></span>
          <span class="imgWord1">更多分类</span>
          <span class="zz"></span>
        </router-link>
      </ul>
    </div>
    <div class="box">
      <component-waterfall></component-waterfall>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { swiper } from 'vue-awesome-swiper'
import componentWaterfall from './Waterfall '
import Vue from 'vue';
import { get } from 'utils/http'
import { Swipe, SwipeItem, Lazyload, Grid, GridItem, Image } from "vant";
Vue.use(swiper)
Vue.use(Image)
Vue.use(Swipe).use(SwipeItem);
Vue.use(Grid).use(GridItem);
export default {
  data() {
    return {
      images: [
      ],
      swiperOption: {
        slideToClickedSlide: true,
        slidesPerView: 1,
        loop: true,
        on: {
          click: function () {
          },
        },
      }
    }
  },
  components: {
    componentWaterfall
  },
  async mounted() {
    let result = await get({
      url: '/napi/mbanner/?app_code=mdt'
    })
    this.images = result.data.object_list
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
}
</script>
<style lang="stylus" scoped>
.index
  overflow scroll
ul
  display flex
  align-items center
  flex 1
  overflow hidden
  text-align center
.swiper-slide
  li
    img
      width 100%
      height 2rem
.img_navigation
  ul
    display flex
    .img_navli
      flex 1
      margin 0.05rem
      position relative
      img
        height 100%
        width 100%
      .zz
        width 100%
        height 100%
        position absolute
        top 0
        left 0
        border-radius 3px
        display flex
        justify-content center
        align-items center
        background-color rgba(0, 0, 0, 0.5)
        z-index 99
      .imgWord
        position absolute
        color white
        top 38%
        left 35%
        z-index 999
      .imgWord1
        position absolute
        color white
        top 50%
        left 16%
        z-index 999
      .imgWord2
        position absolute
        height 0.2rem
        width 0.2rem
        background url('https://a-ssl.duitang.com/uploads/people/201908/26/20190826025914_YvkKJ.png')
        background-size 0.2rem
        color white
        top 26%
        left 38%
        z-index 999
  .box
    display flex
    background #F5F5F5
</style>
