<template>
  <section>
    <el-container style="height: 100vh">
      <el-aside class="overflow-hidden" :width="collapse?'60px':'230px'">
        <wk-menus></wk-menus>
      </el-aside>
      <el-container >
        <router-view>

        </router-view>
      </el-container>
    </el-container>
  </section>
</template>

<script>
  import wkMenus from '@/components/layout/Menus'
  import WkHeader from '@/components/layout/Header'

  export default {
    name: "Home",
    components: {
      wkMenus, WkHeader
    },
    computed: {
      collapse: function () {
        return this.$store.state.System.menuCollapse
      }
    }
  }
</script>

<style scoped>
  .el-header {
    line-height: 60px;
  }

  .el-aside {
    transition: width 0.5s;
  }

</style>
