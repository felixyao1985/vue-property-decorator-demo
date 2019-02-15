<template>
  <!--<section style="min-height:calc(100vh)">-->
    <!-- 菜单begin -->
    <!--<div class="h100p">-->
    <el-menu unique-opened
             mode="vertical"
             class="sidebar-el-menu"
             :background-color="$globalColor.menusBgColor"
             :text-color="$globalColor.menusTextColor"
             :collapse="collapse"
             :default-active="$route.name"
             @select="menuSelect">
      <div class="theme  ft-bolder cursor-point cursor-point-color-theme lh60"
           :style="{backgroundColor: $globalColor.menusBgColor}">
        <span :class="{ftStyleItalic:collapse}" style="color:#409EFF;padding-left: 24px;">{{collapse ? '文卡' : '爱照护后台管理系统'}}</span>
      </div>
      <el-menu-item index="home">
        <i class="el-icon-menu"></i>首页
      </el-menu-item>
      <template v-for="(item , index) in RouterLists" v-if="item.meta.showMenu" :keys="index">
        <el-submenu :index="index" v-if="Permissions.first.indexOf(item.meta.title)!=-1">
          <template slot="title">
            <i class="iconfont icon-shezhi">&nbsp;</i>
            <span slot="title">{{item.meta.title}}</span>
          </template>
          <el-menu-item-group>
            <template v-for="(item2 , index2) in item.children" v-if="item2.meta.showMenu">
              <el-submenu :index="`${index2}`" v-if="Permissions.second.indexOf(item2.meta.title)!=-1">
                <template slot="title">
                  <i class="iconfont icon-shezhi">&nbsp;</i>
                  <span slot="title">{{item2.meta.title}}</span>
                </template>
                <el-menu-item-group>
                  <template v-for="(item3 , index3) in item2.children"
                            v-if="item3.meta.showMenu&&Permissions.three.indexOf(item3.meta.title)!=-1">
                    <el-menu-item :index="item3.name"><span class="iconfont icon-yijian">&nbsp;</span>{{item3.meta.title}}
                    </el-menu-item>
                  </template>
                </el-menu-item-group>
              </el-submenu>
            </template>
          </el-menu-item-group>
          <!--</template>-->
        </el-submenu>
      </template>
    </el-menu>
    <!--</div>-->
    <!-- 菜单end -->
  <!--</section>-->
</template>

<script>
  export default {
    name: "Menus",
    data(){
      return {
        RouterLists: [],
        Permissions: {
          first: [],
          second: [],
          three: []
        }
      }
    },
    computed: {
      collapse: function () {
        return this.$store.state.System.menuCollapse
      },
    },
    created(){
      this.getRouterLists();
      /*
      let Permissions = this.$store.state.Login.Permissions;
      Permissions.forEach(val => {
        this.Permissions.first.push(val.name);
        val.list.forEach(child => {
          this.Permissions.second.push(child.name);
          child.list.forEach(v => {
            this.Permissions.three.push(v.name);

          })
        })
      })
      */
    },
    methods: {
      /**
       * 菜单点击事件
       */
      menuSelect: function (index, indexPath) {
        this.$router.push({
          name: index
        });
        //this.$store.commit('SET_MENU',index)
      },

      //获取路由列表
      getRouterLists(){
        this.RouterLists = [];
        let temp = {};
        let routes = this.$router.options.routes;
        for (var i in routes) {
          let meta = routes[i].meta;
          let children = null;
          if (meta != undefined) {
            if (temp[meta.title] == undefined && meta.showMenu) {
              temp[meta.title] = routes[i];
              children = temp[meta.title].children;
            } else if (meta.showMenu) {
              children = temp[meta.title].children;
              children = children.concat(routes[i].children);
            }

            if (children != undefined) {
              let tempChildren = {};

              for (var t in children) {
                let childrenMeta = children[t].meta;

                if (childrenMeta != undefined) {
                  if (tempChildren[childrenMeta.title] == undefined && childrenMeta.showMenu) {
                    tempChildren[childrenMeta.title] = children[t];
                  } else if (childrenMeta.showMenu) {
                    let children2 = tempChildren[childrenMeta.title].children;
                    tempChildren[childrenMeta.title].children = children2.concat(children[t].children);
                  }
                }
              }
              temp[meta.title].children = [];
              let tempChildren2 = {};
              for (var t in tempChildren) {
                let childrenMeta = tempChildren[t].meta;
                if (tempChildren2[childrenMeta.title] == undefined) {
                  temp[meta.title].children.push(tempChildren[t]);
                  tempChildren2[childrenMeta.title] = tempChildren[t];
                }
              }
            }
          }
        }
        this.RouterLists = temp;
      }
    },
  }
</script>

<style lang="scss" scoped>
  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 230px;
  }

  .el-menu-item-group__title {
    padding: 0;
  }
  .sidebar-el-menu{
    min-height: calc(100vh);
  }
</style>
