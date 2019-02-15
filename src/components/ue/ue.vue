<template>
  <div>
     <script :id=id type="text/plain"></script>
  </div>
</template>

<script>

  import '../../../static/UE/ueditor.config.js'
  import '../../../static/UE/ueditor.all.min.js'
  import '../../../static/UE/lang/zh-cn/zh-cn.js'
  import '../../../static/UE/ueditor.parse.min.js'
  import '../../../static/UE/themes/default/css/ueditor.css'

  export default {
    name: 'UE',
    data () {
      return {
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String,
        default:''
      },
      config: {
        type: Object
      },
      id: {
        type: String
      },
    },
    mounted() {
       this.$nextTick(()=>{
         this.init()
       })
    },
    methods: {
        init(){
          const _this = this;
          this.editor = UE.getEditor(this.id, this.config); // 初始化UE
          this.editor.addListener("ready",()=> {
              console.log(_this.defaultMsg)
            _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
          });
          console.log("上传这堆错误不用理会，上传接口需自行开发配置");
        },
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      },
      getUEContentTxt() { // 获取纯文本内容方法
        return this.editor.getContentTxt()
      }
    },
    destroyed() {
      this.editor.destroy();
    },
    watch:{
      defaultMsg(){
        //this.editor.setContent(this.defaultMsg);
      }
    }

  }
</script>
