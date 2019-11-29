<template>
  <div>
    <Table border :columns="columns" :data="data">
      <div slot="header">
        <Button @click="addMovie" type="success" style="margin-left: 5px">添加电影信息</Button>
      </div>
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">展示</Button>
        <Button type="error" size="small" @click="remove(index)">删除</Button>
      </template>
    </Table>
    <Modal v-model="showModal" title="添加电影信息" :width="800" @on-ok="handleOkClick">
      <Form :model="formData" ref="formValidate" :label-width="80">
        <FormItem label="电影图片">
          <Upload
            name="movieImg"
            :before-upload="handleUpload"
            action="/api/movieHot/upload"
            :on-success="handleSucc"
          >
            <Button icon="ios-cloud-upload-outline">点击上传图片</Button>
          </Upload>
          <div v-if="file !== null">
            <img :src="insideSrc" alt style="width: 60px; height: 60px;" />
          </div>
        </FormItem>
        <FormItem label="电影名字">
          <Input v-model="formData.movieName" placeholder="请输入电影名字" />
        </FormItem>
        <FormItem label="电影详情">
          <Input v-model="formData.movieSynopsis" placeholder="请输入电影详情" />
        </FormItem>
        <FormItem label="电影评分">
          <Input v-model="formData.movieScore" placeholder="请输入电影评分" />
        </FormItem>
        <FormItem label="观看人数">
          <Input v-model="formData.movieWatch" placeholder="请输入观看人数" />
        </FormItem>
        <FormItem label="主演">
          <Input v-model="formData.movieStra" placeholder="请输入主演" />
        </FormItem>
        <FormItem label="上映时间">
          <Col>
            <Col span="6">
              <FormItem prop="date">
                <DatePicker
                  :value="date"
                  @on-change="handleDateChange"
                  type="date"
                  placeholder="Select date"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="2" style="text-align: center">-</Col>
            <Col span="11">
              <FormItem prop="time">
                <TimePicker
                  :value="time"
                  @on-change="handleTimeChange"
                  type="time"
                  placeholder="Select time"
                ></TimePicker>
              </FormItem>
            </Col>
          </Col>
          <!-- <Input v-model="formData.movieTime" placeholder="请输入场次" /> -->
        </FormItem>
        <FormItem label="场次">
          <Input v-model="formData.movieNumber" placeholder="请输入场次" />
        </FormItem>
      </Form>
    </Modal>
    <div slot="footer">
      <Pagination @onPageInfo="handlePageInfo"></Pagination>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { get, post } from '../utils/http'
import _ from 'lodash'
import moment from 'moment'
import Pagination from './Pagination'
export default {
  inject: ['reload'],
  data() {
    return {
      formData: {
        movieImg: '',
        movieName: '',
        movieSynopsis: '',
        movieScore: '',
        movieWatch: '',
        movieStra: '',
        movieTime: '',
        movieNumber: '',
        datetime: '',

      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          // type: 'html',
          title: '图片',
          key: 'movieImg',
          className: 'img',
          width: 120,
          height: 180,
          className: 'movieImg',
          render: (h, { row, column, index }) => {
            return h('img', {
              attrs: {
                src: 'http://localhost:3000/uploads/' + row.movieImg
              }
            }, null)
          }
        },
        {
          title: '电影名字',
          key: 'movieName',
          tooltip: 'true'

        },
        {
          title: '电影详情',
          key: 'movieSynopsis',
          tooltip: 'true'
        },
        {
          title: '电影评分',
          key: 'movieScore',
          tooltip: 'true'

        },
        {
          title: '观看人数',
          key: 'movieWatch',
          tooltip: 'true'
        },
        {
          title: '主演',
          key: 'movieStra',
          tooltip: 'true'
        },
        {
          title: '上映时间',
          key: 'movieTime',
          tooltip: 'true'
        },
        {
          title: '场次',
          key: 'movieNumber',
          tooltip: 'true'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      data: [],
      resource: [],
      pageNo: 1,
      pageSize: 2,
      //模态框
      showModal: false,
      file: null,
      loadingStatus: false,
      insideSrc: '',
      date: new Date(),
      time: new Date()
    }
  },

  async mounted() {
    let result = await get('/api/movieHot/')
    this.resource = result.list
    // console.log(this.resource)
    //拼接
    this.data = _.chunk(this.resource, this.pageSize)[this.pageNo - 1]

  },
  //路由
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$emit('onRouteChange', to)
    })
  },
  methods: {
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },

    show(index) {
      this.$Modal.info({
        title: '电影信息',
        content: `图片：${this.data[index].movieImg}<br>
        电影名字:${this.data[index].movieName}<br>
        电影详情:${this.data[index].movieSynopsis}<br>
        电影评分：${this.data[index].movieScore}<br>
        观看人数：${this.data[index].movieWatch}<br>
        主演：${this.data[index].movieStra}<br>
        上映时间：${this.data[index].movieTime}<br>
        场次:${this.data[index].movieNumber}<br>`
      })
    },
    remove(index) {
      this.data.splice(index, 1);
    },
    handlePageInfo({ pageNo, pageSize }) {
      this.pageNo = pageNo
      this.pageSize = pageSize
    },
    addMovie() {
      this.showModal = true;
    },
    handleUpload(file) {
      this.file = file;
      // 转换为base64
      const reader = new FileReader()
      // 将读取到的文件编码成Data URL
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        this.insideSrc = event.srcElement.result
      }

    },
    upload() {
      this.loadingStatus = true;
      setTimeout(() => {
        this.file = null;
        this.loadingStatus = false;
        this.$Message.success("Success");
      }, 1500);
    },
    async handleSucc(response, file, fileList) {
      console.log(file)
      let ret = response.ret
      if (ret) {
        let filename = response.data.filename
        this.formData.movieImg = filename
        this.file = null
      } else {
        this.$Message.error("图片上传失败.");
      }
    }, handleDateChange(date) {
      this.formData.datetime = date + this.time
    },

    handleTimeChange(time) {
      this.formData.datetime = this.date + time
    },
    async handleOkClick() {
      //  console.log(this.formData);
      if (this.formData.datetime === '') {
        this.formData.datetime = moment().format('YYYY-MM-DD, HH:mm:ss');
      }
      if (this.formData.movieImg) {
        let result = await post('/api/movieHot/', this.formData)
        // this.$router.go(0)
        this.reload()
      } else {
        this.$Message.error('error.')
      }
    },
  },
  //翻页
  watch: {
    pageNo() {
      this.data = _.chunk(this.resource, this.pageSize)[this.pageNo - 1]
    },

  },

  components: {

    Pagination,

  }
}
</script>

<style lang="less" >
.layout {
  height: 100%;
}
.ivu-layout {
  height: 92%;
  width: 100%;
  overflow-x: hidden !important;
  // overflow: scroll
}
.ivu-table {
  overflow-x: hidden !important;
}
.ivu-layout-footer {
  background: #515a6e !important;
}
.movieImg {
  img {
    width: 100px;
    height: 150px;
  }
}
</style>