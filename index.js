const express = require("express")
const app = express()
const cors = require('cors')
const ytdl = require('ytdl-core')
const axios = require("axios")
const bdparser = require("body-parser")
const key = 'AIzaSyAjbHd29ZsGhxdn4_hto8kaC7Ih2UHgsRM'
 app.use(bdparser.urlencoded({extended : false}))
app.use(cors())
app.get("/",(req,res)=>{
  res.sendFile(__dirname +"/index.html")
})
app.post("/findvideo",(req,res)=>{
var q= req.body.qu;
      axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResult=20&q='+q+'&type=video&key='+key)
      .then(response => {
        var items = response.data.items;
      /*items.forEach((item, i) => {
          let datas = {
            url : item.id.videoId,
            title :item.snippet.title
          }
          res.json(datas)
 });*/
res.json(items)
      })
      .catch(error => {
      console.log(error)
      })
})
app.get("/download",(req,res)=>{
  url = req.query.ur;

  res.header('Content-Disposition', 'attachment; filename="utube_download.mp4"')

  ytdl(url, {
      format: 'mp4'
      }).pipe(res)

    })
app.listen(process.env.PORT || 4000,(err)=>{
  if(err) console.log(err)

 const date = Date()

  console.log("app is listening on port "+process.env.PORT+" or 4000"+" "+ date);
})
