<template>
  <section>
    <div v-title>文章管理{{form.pictureId}}</div>

    <el-card>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="类型" prop="tabId">
          <el-select v-model="form.tabId" placeholder="请选择">
            <el-option
              v-for="item in taboptions"
              :key="item.id"
              :label="item.tabName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="banner展示" prop="pictureId">
          <div style="width:100px;height:100px">
            <upload-img @getUploadImg="getAvatar" :isShow="true" :imgId="form.pictureId"></upload-img>
          </div>
        </el-form-item>
        <el-form-item label="文章内容" prop="articleContent">
          <editor ref="editor" class="editor" :msg="form.articleContent">{{form.articleContent}}</editor>
        </el-form-item>
        <el-form-item label="关键字" prop="keyWords">
          <el-input v-model="form.keyWords"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="articleTitle">
          <el-input v-model="form.articleTitle"></el-input>
        </el-form-item>
        <el-form-item label="简短说明" prop="brief">
          <el-input type="textarea" v-model="form.brief"></el-input>
        </el-form-item>
        <el-form-item label="是否开放">
          <template>
            <el-radio v-model="form.releaseFlag" :label="0">开放</el-radio>
            <el-radio v-model="form.releaseFlag" :label="1">不开放</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="是否置顶">
          <template>
            <el-radio v-model="form.stickFlag" :label="0">置顶</el-radio>
            <el-radio v-model="form.stickFlag" :label="1">不置顶</el-radio>
          </template>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">修改</el-button>
          <el-button @click="onBack()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>


<script>
  import Component from 'vue-class-component';
  import BaseComponent from '@/BaseComponent';
  import {stickFlag, releaseFlag} from './const';
  import API from '@/store/api';
  import editor from '@/components/editor/editor'
  import uploadImg from '@/components/uploadImg';

  @Component(
    {
      components:{editor,uploadImg},
      props: {
        id: 0
      }
    }
  )
  export default class NewsModify extends BaseComponent {

    /*
     * 表单信息初始化
     * */
    form = {
      id: 0,
      articleContent: '',
      articleTitle: '',
      pictureId: 0,
      keyWords: '',
      brief: '',
      releaseFlag: 0,
      stickFlag: 0,
      tabId: "",

    }

    taboptions = [];


    /*
     * 表单验证
     * */
    rules = {
      articleTitle: [
        {required: true, message: '请输入名称', trigger: 'blur'}
      ],
      tabId: [
        {required: true, message: '请选择类型', trigger: 'change'}
      ]
    }

    async getTagList() {
      let res = await API.tag.GWTabList();
      this.taboptions = res;
    }

    created() {
      this.getTagList();
      this.getDate(this.id);
    }

    getAvatar(id){
      this.form.pictureId = id;
    }
    

    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.form.articleContent = this.$refs.editor.getUEContent();
          let res = await API.news.saveArticle(this.form);
          await this.$message("编辑成功");
          this.$router.push({name: 'newslist', params: {}})
        } else {
          return false;
        }
      });

    }

    onBack() {
      this.$router.push({name: 'newslist', params: {}})
    }

    async getDate(id){
      let res = await API.news.getArticle(id);
      this.form = res;
      //this.$refs.editor.setContent(res.articleContent);
    }
  }
</script>

<style lang="scss" scoped>

  /*图片上传*/
  .upload-box {
    width: 200px;
    height: 200px;
    line-height: 200px;
    position: relative;
    border: 1px dashed #ccc;
    font-size: 50px;
    text-align: center;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
    input {
      position: absolute;
      top: -10%;
      left: 0;
      width: 200%;
      height: 200%;
      font-size: 0;
      cursor: pointer;
      opacity: 0;
    }
  }

  /*.editor{*/
  /*height:400px;*/
  /*}*/

</style>
