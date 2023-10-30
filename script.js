var gateway = `ws://${window.location.hostname}/ws`;
var websocket;
// Init web socket when the page loads
window.addEventListener('load', onload);

function onload(event) {
    initWebSocket();
    initButtons();
}

function getReadings(){
    websocket.send("getReadings");
}

function initWebSocket() {
    console.log('Trying to open a WebSocket connection…');
    websocket = new WebSocket(gateway);
    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onmessage = onMessage;
}

// When websocket is established, call the getReadings() function
function onOpen(event) {
    console.log('Connection opened');
    getReadings();
}

function onClose(event) {
    console.log('Connection closed');
    setTimeout(initWebSocket, 2000);
}
function initInput() {
    document.getElementById('sleep').addEventListener('change', onChangeInput);
}
function initButtons() {
    document.getElementById('1min').addEventListener('click', buttonClick);
    document.getElementById('1hour').addEventListener('click', buttonClick);
    document.getElementById('6hour').addEventListener('click',buttonClick);
    document.getElementById('12hour').addEventListener('click', buttonClick);
    document.getElementById('24hour').addEventListener('click', buttonClick);
}
function onChangeInput(event) {
    console.log(event)
    websocket.send(event.target.value);
}

function buttonClick(e){

websocket.send(e.target.id);
}
// Function that receives the message from the ESP32 with the readings
function onMessage(event) {
    console.log(event.data);
    var myObj = JSON.parse(event.data);
    var keys = Object.keys(myObj);
try{
    for (var i = 0; i < keys.length; i++){
        var key = keys[i];
        if(typeof(myObj[key])=="number"){
            myObj[key] = myObj[key].toFixed(2)
        }
        document.getElementById(key).innerHTML = myObj[key];
    }
}catch(e){

console.log(e)

}
 
}