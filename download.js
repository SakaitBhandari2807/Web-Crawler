const http = require('http')
const fs = require('fs')
const path = require('path')
const uuidv1 = require('uuid/v1')

const downloadPage = (url="http://nodeprogram.com")=>{
    const fetchPage = (urlF,callback)=>{
         http.get(urlF,(response)=>{
             let buff = ' '
             response.on('data',(chunk)=>{
                  buff += chunk
             })
             response.on('end',()=>{
                callback(null,buff)     
             })
         }).on('error',()=>{
             console.log(`Error discovered :${error.message}`)
             callback(error)
         })
    }
    const folderName = uuidv1()
    fs.mkdirSync(folderName)
    fetchPage(url,(error,data)=>{
       if(error) console.log(error)
       fs.writeFileSync(path.join(__dirname,folderName,'url.txt'),url)
       fs.writeFileSync(path.join(__dirname,folderName,'index.html'),data)
       console.log(`Writing done in ${folderName}`)
    })
}
downloadPage(process.argv[2])
