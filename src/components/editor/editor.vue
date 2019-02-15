<template>
  <div class="components-container">
    <!--<button @click="getUEContent()">获取内容</button>-->
    <!--<button @click="getUEContentTxt()">获取无文本内容</button>-->
    <div class="editor-container">
      <UE :defaultMsg=defaultMsg :config=config :id=ue1 ref="ue"></UE>
    </div>

  </div>
</template>

<script>
  import UE from '../ue/ue.vue';
  export default {
    components: {UE},
    props:{
       msg:{
           type:String,
           default:''
       }
    },
    data() {
      return {
        defaultMsg: '',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        ue1: "ue1", // 不同编辑器必须不同的id
      }
    },
    mounted(){
      this.defaultMsg=this.msg;
    },
    methods: {
      getUEContent() {
        return this.$refs.ue.getUEContent()
        console.log(content)
      },
      getUEContentTxt() {
        return this.$refs.ue.getUEContentTxt(); // 调用子组件方法
      }
    },
    watch:{
      msg(){
        this.defaultMsg=this.msg;
      }
    }
  };
</script>
<style lang="scss" scoped="">

</style>


