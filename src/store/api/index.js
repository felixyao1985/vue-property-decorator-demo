const files = require.context('.', false, /\.js$/)
const apis = {}
files.keys().forEach(key => {
  if (key === './index.js' || key === './Ajax.js') return
  apis[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default apis
