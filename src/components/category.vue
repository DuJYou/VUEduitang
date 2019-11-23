<template>
  <div class="categ">
    <ul class="nav_left">
      <li class="nav_li">
        <router-link class="nav_li_1" active-class="active" tag="li" to="/wallpaper">壁纸</router-link>
        <router-link class="nav_li_1" active-class="active" tag="li" to="/wallpaper">头像</router-link>
        <router-link class="nav_li_1" active-class="active" tag="li" to="/wallpaper">表情</router-link>
      </li>
      <li class="nav_li">
        <router-link class="nav_li_2" active-class="active" tag="li" to="/wallpaper">文字</router-link>
        <router-link class="nav_li_2" active-class="active" tag="li" to="/wallpaper">萌宠</router-link>
        <router-link class="nav_li_2" active-class="active" tag="li" to="/wallpaper">绘画</router-link>
      </li>
      <li class="nav_li">
        <router-link class="nav_li_3" active-class="active" tag="li" to="/wallpaper">手作</router-link>
        <router-link class="nav_li_3" active-class="active" tag="li" to="/wallpaper">美食</router-link>
        <router-link class="nav_li_3" active-class="active" tag="li" to="/wallpaper">家居</router-link>
      </li>
    </ul>
    <ul class="nav_right">
      <li class="nav_li">
        <router-link class="nav_li_4" active-class="active" tag="li" to="/wallpaper">爱豆</router-link>
        <router-link class="nav_li_4" active-class="active" tag="li" to="/wallpaper">影视</router-link>
        <router-link class="nav_li_4" active-class="active" tag="li" to="/wallpaper">动漫</router-link>
      </li>
      <li class="nav_li">
        <router-link class="nav_li_5" active-class="active" tag="li" to="/wallpaper">时尚</router-link>
        <router-link class="nav_li_5" active-class="active" tag="li" to="/wallpaper">美妆</router-link>
        <router-link class="nav_li_5" active-class="active" tag="li" to="/wallpaper">婚礼</router-link>
      </li>
      <li class="nav_li">
        <router-link class="nav_li_6" active-class="active" tag="li" to="/wallpaper">旅行</router-link>
        <router-link class="nav_li_6" active-class="active" tag="li" to="/wallpaper">摄影</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>



<style lang="stylus" scoped>
@import "~assets/stylus/border.styl"
.categ
    display  flex
    position relative
    width 100%
    height 100%
    background #fff
    .nav_left
        flex-direction column
        flex 1
        position absolute
        top 0
        left 0
        width 50%
        height 50%
        .nav_li
            width 100%
            $border( 1px,#bbb)
            height 1.54rem;
            li 
                line-height  .5rem
                padding-left .15rem
               
            .nav_li_1
                &::before 
                    content: ""
                    display: inline-block
                    width: 6px
                    height: 6px
                    margin: 0px 12px 2px 0px
                    border-radius: 6px
                    background rgb(127, 225, 168)
            .nav_li_2
                &::before 
                    content: ""
                    display: inline-block
                    width: 6px
                    height: 6px
                    margin: 0px 12px 2px 0px
                    border-radius: 6px
                    background rgb(196, 154, 213)
            .nav_li_3
                &::before 
                    content: ""
                    display: inline-block
                    width: 6px
                    height: 6px
                    margin: 0px 12px 2px 0px
                    border-radius: 6px
                    background rgb(127, 225, 168)
    .nav_right
        flex 1
        position absolute
        top 0
        right 0
        width 50%
        height 50%
        .nav_li
            width 100%
            $border(1px 1px  1px 0,#bbb)
            height 1.54rem;
            li 
                line-height  .5rem
                padding-left .15rem
               
            .nav_li_4
                &::before 
                    content: ""
                    display: inline-block
                    width: 6px
                    height: 6px
                    margin: 0px 12px 2px 0px
                    border-radius: 6px
                    background rgb(131, 192, 174)
            .nav_li_5
                &::before 
                    content: ""
                    display: inline-block
                    width: 6px
                    height: 6px
                    margin: 0px 12px 2px 0px
                    border-radius: 6px
                    background rgb(133, 146, 159)
            .nav_li_6
                &::before 
                    content: ""
                    display: inline-block
                    width: 6px
                    height: 6px
                    margin: 0px 12px 2px 0px
                    border-radius: 6px
                    background rgb(114, 216, 196)
</style>