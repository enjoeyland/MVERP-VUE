<template>
    <div class="errPage-container">
        <el-button @click="back" icon='arrow-left' class="pan-back-btn">Return</el-button>
        <el-row>
          <el-col :span="12">
              <h1 class="text-jumbo text-ginormous">Oops!</h1>
              <h2>해당 웹 페이지를 방문하는 권한 없습니다. </h2>
              <h6>관리자와 연락하시기 바랍니다.</h6>
          </el-col>
          <el-col :span="12">
            <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
          </el-col>
        </el-row>
    </div>
</template>

<<script>
import errGif from '@/assets/images/401_images/401.gif'

export default {
  name: '401',
  data() {
    return {
      errGif: errGif + '?' + +new Date(),
    }
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/main' })
      } else {
        this.$router.go(-1)
      }
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .errPage-container {
    width: 800px;
    margin: 100px auto;
    .pan-back-btn {
      background: #008489;
      color: #fff;
    }
    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }
  }
</style>
