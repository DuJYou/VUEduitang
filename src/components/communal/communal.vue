<template>
  <vue-waterfall-easy
    :imgsArr="imgsArr"
    @scrollReachBottom="getData"
    :mobileGap="8"
    @click="clickFn"
  >
    <div class="img-info" slot-scope="props">
      <div class="name">
        <span class="photoname">{{props.value.photoName}}</span>
        <span class="commend">{{'★ '+props.value.commend}}</span>
      </div>
      <div class="usermessage">
        <img class="ChatHead" :src="props.value.ChatHead" alt />
        <router-link
          class="username"
          active-class="active"
          tag="li"
          :to="'/user/'+props.value.userId"
        >
          <span>{{props.value.username}}</span>
        </router-link>

        
        <router-link
          class="username"
          active-class="active"
          tag="li"
          :to="'/album/'+props.value.albumId"
        >
          <span class="photoname photoname1">{{props.value.photoName}}</span>
        </router-link>
      </div>
    </div>
  </vue-waterfall-easy>
</template>
<script>
import details from './details'
import Vue from 'vue';
import { get } from 'utils/http'
import vueWaterfallEasy from 'vue-waterfall-easy'
import axios from 'axios'
export default {
  data() {
    return {
      next_start: 0,
      group: 0,
      wfList: [],
      imgsArr: [],
    };
  },
  //通过父组件传过来的cate_key渲染
  props: ["cate_key"],
  components: {
    vueWaterfallEasy
  },
  methods: {
    //获取数据
    async getData() {
      let resWF = await get({
        url: "/napi/blog/list/by_category/?include_fields=sender%2Calbum%2Clike_count%2Cmsg",
        params: {
          start: this.group,
          limit: 24,
          more: 1,
          cate_key: this.cate_key
        }
      });
      this.wfList = this.wfList.concat(resWF.data.object_list);
      console.log(this.wfList);
      //拼接
      for (var i = this.imgsArr.length; i < this.wfList.length; i++) {
        this.imgsArr.push({
          src: this.wfList[i].photo.path,
          href: "",
          id: this.wfList[i].id,
          commend: this.wfList[i].album.favorite_count,
          photoName: this.wfList[i].album.name,
          albumId: this.wfList[i].album.id,
          username: this.wfList[i].sender.username,
          userId: this.wfList[i].sender.id,
          ChatHead: this.wfList[i].sender.avatar

        });
      }
      // console.log(this.imgsArr);

      this.next_start = resWF.data.next_start;
      this.group = this.next_start;
    },
    clickFn(event, { index, value }) {
      // 阻止a标签跳转
      event.preventDefault()
      // 只有当点击到图片时才进行操作
      if (event.target.tagName.toLowerCase() == 'img') {
        // console.log(this.$router);
        // console.log(value);

        this.$router.push({
          name: 'details',
          params: { id: value.id }
        })

      }
      // if (event.target.tagName.toLowerCase() == '.username') {
      //   console.log(this.$router);

      //   // this.$router.push({
      //   //   name: 'user',
      //   //   params: { id: value.id }
      //   // })

      // }


    },
  },
  created() {
    this.getData()
  },
}
</script>
<style lang="stylus">
.img-info
  .name
    height 0.5rem
    padding 0.08rem 0.08rem 0.05rem
    border-bottom 0.01rem solid rgb(224, 224, 224)
    .photoname
      font-size .12rem
      color rgb(51, 51, 51)
      margin 0rem
      padding 0rem
      font-weight bold
      display block
    .commend
      color rgb(153, 153, 153)
      margin-top 0.5rem
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
      width 1rem
      font-size 0.12rem
      left 50%
      top 150%
      color rgb(51, 51, 51)
</style>