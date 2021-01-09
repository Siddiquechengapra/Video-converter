const ipc=require('electron').ipcRenderer
const fs=require('fs')
const random = require("random-string")



const button=document.getElementById("upload")
const button2=document.getElementById("ok")

const process=require('child_process')
var format='m3u8'
var directory='./media'


const $=require('jquery')



if(!fs.existsSync(directory)){
    fs.mkdirSync(directory)
}
// $("#format").change(function(){
//     format=$("#format option:selected").text()
   
// })

// button2.addEventListener('click',function(event){
    
//     $(`#ok`).detach()
// })


button.addEventListener('click',function(event){
    console.log("button in hereclicked")
    ipc.send('open-file-dialog-for-file')
})
ipc.on("selected-file",function(event,paths){
   
    console.log(event)
    console.log(paths)
    var randomID=random()

    $("#info").append(`
    <br> <br>
        <div id=${randomID} class="alert alert-success">
          ${paths} is converting So Please Wait
         </div>
    `
    )
    // execution of conversion using ffmpeg
    process.exec(`ffmpeg -i "${paths}" -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls  media/${random()}_video.${format}`,(error,stdout,stderr)=>{
        console.log(stdout)
        $(`#${randomID}`).detach()
        $("#info").append(`
            <br> <br>
        <div id="ok" class="alert alert-info">
          Conversion Completed
         </div>`)
        setTimeout(() => {
            
            $(`#ok`).detach()
        }, 5000);     


           

        if(error!== null){
            console.log(error)
        }
    })
})  
