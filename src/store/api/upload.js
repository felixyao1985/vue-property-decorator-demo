/**
 * Created by felix on 2018/9/27.
 */
import {http} from './Ajax'
/*
this.http.post('iweb/api/feedBack/uploadEvaluationPicture', image, false).then(res => {
  this.form.imgId = res.data.id;
  this.$message.success('图片上传成功')
}).catch(res => {
  this.$message.error('图片上传失败')
})
*/
// view门店信息
async function uploadEvaluationPicture(image) {
  return new Promise((resolve, reject) => {
    http.post('iweb/api/feedBack/uploadEvaluationPicture', image, false).then(res => {
        resolve(res.data.id)
    }).catch(res => {
      resolve(0)
    })
  })
}

export default{
  uploadEvaluationPicture
}
