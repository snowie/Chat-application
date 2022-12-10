const socket = io() 
let name;
let textarea = document.querySelector('#textarea')
let messagearea = document.querySelector('.message_area')
do{
    name= prompt('Pleasse enter your name : ')
}while (!name)

textarea.addEventListener('keyup',(e) => {
    if(e.key === 'Enter'){
        sendmessage(e.target.value)
    }
})
socket.on('connection',(Socket)=>{
    console.log(`new user connected.....${name}`)
})
function sendmessage(message){
    let msg ={
        user: name,
        message : message.trim()
    }
    appendMessage(msg,'outgoing')
    textarea.value =''
    down()

    socket.emit('msg', msg)
}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')
    let markup =`
    <h4> ${msg.user}</h4>
    <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup
    messagearea.appendChild(mainDiv)
}
socket.on('message',(msg)=>{
    appendMessage(msg, 'incoming')
    down()
})

function down(){
    messagearea.scrollTop = messagearea.scrollHeight

}