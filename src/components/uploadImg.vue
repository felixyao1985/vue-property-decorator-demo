<template>
  <!--使用方法   getUploadImg ：获取上传图片的id   getPreview：获取预览图片-->
  <!--<upload-img @getUploadImg="getUploadImg" @getPreview="getPreview"></upload-img>-->
  <div class="input-box">
    <img v-if="imgId" :src="`${HttpHost}/iweb/image/${imgId}`" alt="">
    <b class="el-icon-plus" v-else=""></b>
    <input ref="upload" type="file" @change="upload" accept="image/jpg,image/jpeg,image/png" capture="camera">
  </div>
</template>
<script>
  export default{
    props: {
      imgId: {
        default: 0
      },
      isShow:{
          type:Boolean,
          default:false,
      }
    },
    data(){
      return {}
    },
    methods: {
      //上传图片
      upload() {
        let {files} = this.$refs.upload;
        if (typeof files == 'undefined') {
          return;
        }
        let img = files[0];//获取图片信息
        let type = img.type;//获取图片类型，判断使用
        if (type.substr(0, 5) != 'image') {//无效的类型过滤
          this.ErrorMsg('非图片类型，无法上传！');
          return false;
        }
//        if ((img.size / 1024 / 1024) > 5) {
//          this.ErrorMsg('图片太大，请上传5M以下的图片');
//          return false;
//        }
        //本地预览
        var reads = new FileReader();
        reads.readAsDataURL(img);
        reads.onload = (e) => {
          this.$emit('getPreview', e.target.result);
        };
        let image = new FormData();
        image.append('uploadFile', img);
        this.http.post('iweb/image/upload', image, false).then(res => {
          this.$emit('getUploadImg', res.data.id);
          this.$message.success('图片上传成功')
        }).catch(res => {
          this.$message.error('图片上传失败')
        })
      }
    }
  }
</script>
<style lang="scss" scoped="">
  @import "../common/css/mixins";
  .input-box {
    overflow: hidden;
    line-height: 120px;
    text-align: center;
    width:100%;
    height:100%;
    position: relative;
    border:1px solid #ccc;
    b {
      font-size: 80px;
      color: #ccc;
      @include middle;
    }
    img{
      width:100%;
      height:100%;
    }
    input {
      position: absolute;
      top: -10%;
      left: 0;
      width: 120%;
      height: 120%;
      font-size: 0;
      opacity: 0;
      cursor: pointer;
    }
  }
</style>
