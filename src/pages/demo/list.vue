<template>
  <section>
    <div v-title>懂得入</div>
    <h3>秘密</h3>
    <el-card class="search-box">

      <el-input placeholder="请输入搜索内容" style="width:360px;" v-model.trim="search.keyword" ></el-input>
      <el-button type="primary" @click="searching">搜索</el-button>
    </el-card>
    <el-card>
	<p v-for="(item,i) in items"  :key="i" >
	   {{item.name}}
        </p>
	<p>{{exam_title}}</p>
	<p>{{group_concat}}</p>
	<p>{{right_answer}}</p>
    </el-card>
  </section>
</template>

<script>
  import {Component, Watch} from 'vue-property-decorator'
  import BaseComponent from '@/BaseComponent';
  import {search} from '@/common/tool';
  import API from '@/store/api';
  import ACCE from './acce.json';

  @Component
  export default class NewsList extends BaseComponent {

    group_concat =  null;
    right_answer =  null;
    exam_title   =  null
    list         =  [];
    date         =  [];
    search = {
      keyword:""
    }

    created(){
      this.getList();
    }

    @Watch('search.keyword')
    watchCount(newVal, oldVal) {
      this.search.keyword = newVal;
    }

    getList(){
      this.date = ACCE['RECORDS'];
      console.log(this.date);
    }

    searching(){
      if(this.date.length > 0 && this.search.keyword !='') {
        this.list = []
        for(let t =0;t<this.date.length;t++) {
          let item	= this.date[t];
          if(search(item.exam_title,this.search.keyword))this.list.push(item);
        }
      }else{
        this.list = this.date;
      }
    }

    get items(){
      this.searching();
      console.log(this.list[0])
      this.exam_title = this.list[0].exam_title;
      this.group_concat = this.list[0].group_concat;
      this.right_answer = this.list[0].right_answer;
      return "List";
    }
  }
</script>

<style lang="scss" scoped>

</style>
