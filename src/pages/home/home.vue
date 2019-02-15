<template>
  <div class="home">
     <h2 class="text">欢迎来到爱照护后台管理系统</h2>
  </div>
</template>
<script>
  export default{

  }
</script>
<style lang="scss" scoped="">
  @import "../../common/css/mixins";
  .home{
    height:calc(100vh - 70px);
    position: relative;
  }
.text{
  width: 100%;
  font-size:60px;
  text-align: center;
  @include middle;
  letter-spacing: 5px;
  top:40%;
}
</style>
