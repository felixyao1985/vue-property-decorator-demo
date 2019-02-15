
//获取session值
function getSessionByName(name){
  var val=0;
  if(sessionStorage[name]!="-1"&&sessionStorage[name]){
    val=JSON.parse(sessionStorage[name]);
  }
  return val;
}
//设置session值
function setSessionVal(name,val){
  sessionStorage[name]=JSON.stringify(val);
}

const state = {
  UserInfo:getSessionByName('UserInfo'),
  Permissions:getSessionByName('Permissions'),
}

const mutations = {  //保存用户登录信息
  SET_USERINFO: function (state, obj) {
    state.UserInfo = obj;
    setSessionVal('UserInfo',obj)
  },
  SET_Permissions(state,obj){
    state.Permissions = obj;
    setSessionVal('Permissions',obj)
  }
}
export default {
  state,
  mutations
}
