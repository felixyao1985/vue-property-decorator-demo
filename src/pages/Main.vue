<template>
  <section style="width:100%">
    <!-- 标签面板begin -->
    <!--<wk-tags-view></wk-tags-view>-->
    <!-- 标签面板end -->
    <!--"-->
    <div class="top-header">
      <i class="el-icon-d-arrow-left icon-d-arrow"
         :class="{'el-icon-d-arrow-left':$store.state.System.menuCollapse,'el-icon-d-arrow-right':$store.state.System.menuCollapse}"
         @click="$store.commit('triggerCollapse')"></i>
      <div>
        <i class="iconfont icon-kehu"></i>欢迎,{{$store.state.Login.UserInfo.nickName}}
        <el-button size="mini" type="" @click="loginOut">退出登录</el-button>
      </div>

    </div>
    <el-main class="pl10 pr10 pb10" style="padding-top: 0;">
      <!--<transition name="el-fade-in">-->
      <keep-alive>
        <router-view :pageCache="pageCache" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view :pageCache="pageCache" v-if="!$route.meta.keepAlive"></router-view>
      <!--</transition>-->
    </el-main>
  </section>
</template>

<script>
  import WkTagsView from '@/components/layout/TagsView'

  export default {
    name: "Main",
    components: {
      WkTagsView
    },
    computed: {
      //显示当前页数据
      pageCache(){
        return ""
      }
    },
    methods: {
      //注销登录
      loginOut(){
        this.$store.commit('SET_USERINFO', '');
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-main {
    display: block;
    width: 100%;
  }

  .top-header {
    height: 50px;
    background: rgb(48, 65, 86);
    & > div {
      float: right;
      cursor: pointer;
      color: #fff;
      padding-right: 30px;
      line-height: 50px;
      font-size: 14px;
      button {
        margin-left: 10px;
      }
    }

  }

  .icon-d-arrow {
    color: #fff;
    font-size:30px;
    line-height:50px;
    cursor: pointer;
  }
</style>
