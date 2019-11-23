<template>
  <div class="index-wrap">
      <header>
          <div class="header">
            <router-link  tag="div" class="index" to="/index">首页</router-link>
            <ul>
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide><router-link active-class="active" tag="li" to="/wallpaper">壁纸</router-link></swiper-slide>
                    <swiper-slide><router-link active-class="active" tag="li" to="/buddha">头像</router-link></swiper-slide>
                    <swiper-slide><router-link active-class="active" tag="li" to="/expression">表情</router-link></swiper-slide>
                    <swiper-slide><router-link active-class="active" tag="li" to="/word">文字</router-link></swiper-slide>
                    <swiper-slide><router-link active-class="active" tag="li" to="/idol">爱豆</router-link></swiper-slide>
                    <swiper-slide><router-link active-class="active" tag="li" to="/movie">影视</router-link></swiper-slide>
                    <swiper-slide><router-link active-class="active" tag="li" to="/cartoon">动漫</router-link></swiper-slide>
                </swiper>
            </ul>
          </div>
      </header>
      <main>
      <router-view></router-view>
      </main> 
  </div>
</template>
<script>
export default {
  name: 'carrousel',
  data() {
    return {
      swiperOption: {
        initialSlide :0,
        slideToClickedSlide: true,
        slidesPerView: 4,
        centeredSlides: true,
        centeredSlidesBounds: false,
        on:{
            click: function(){  
            },
        },
      }  
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log('this is current swiper instance object', this.swiper)
    this.swiper.slideTo(3, 1000, false)
  }
}
</script>
<style lang="stylus">
@import "~assets/stylus/border.styl"
.index-wrap
  display flex
  flex-direction column
  height 100%
  background-color: rgb(245, 245, 245);
  header
    background #fff
    z-index 9999
    .header
      display flex
      width: 100%
      height: .43rem

      align-items center
      background-color: white
      .index
        justify-content: center;
        display flex
        flex 1
        font-size: .15rem
        color: rgb(119, 119, 119)
        font-weight: bold
        text-align: center       
        border-right: .01rem solid black
      ul
        position relative
      ul
      .swiper-container 
        font-size: .15rem
        display: flex
        align-items center
        flex: 5
        overflow: hidden
        text-align center

      ul li.active 
        border-bottom: 1px solid red
  main
    height 6.67rem
</style>
