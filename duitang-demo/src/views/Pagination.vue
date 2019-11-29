<template>
  <div>
    <Page class="page" :total="20" :page-size="pageSize" @on-change="handlechage" show-elevator />
  </div>
</template>

<script>
import { Page } from "view-design";
export default {
  data() {
    return {
      pageNo: 1,
      pageSize:4
    }
  },
    created() {
      this.$watch(() => {
        this.$emit('onPageInfo', {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        })
      })
    },
  components: {
    Page
  },
  methods: {
    handlechage(pageNo) {

      this.pageNo = pageNo
    }
  },

}
</script>

<style lang="less" >
.page {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>