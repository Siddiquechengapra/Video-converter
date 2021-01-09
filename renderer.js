const ipc=require('electron').ipcRenderer



const button=document.getElementById("upload")
var format='mp3'
var directory='./media'
const fs=require('fs')
if(!fs.existsSync(directory)){
    fs.mkdirSync(directory)
}


button.addEventListener('click',function(event){

ipc.send('open-file-dialog-for-file')
})
ipc.on("selected-file",function(event,paths){
    console.log(event)
    console.log(paths)
}) 