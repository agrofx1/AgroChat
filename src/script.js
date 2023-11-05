document.getElementById('nick').value = localStorage.getItem("nick");
document.getElementById('serv').value = localStorage.getItem("serv");
function saveNick() {
  localStorage.setItem("nick", document.getElementById('nick').value);
}
function saveServ() {
  localStorage.setItem("serv", document.getElementById('serv').value);
}
if (localStorage.getItem("first") == null) {
  localStorage.setItem("first", "false");
  localStorage.setItem("serv", "wss://agrochat.gromov1.repl.co")
  document.getElementById('serv').value = "wss://agrochat.gromov1.repl.co"
}

window.addEventListener("load", (event) => {
  let socket = new WebSocket(localStorage.getItem("serv"));
  
   socket.onopen = function() {
     console.log('Connected!')
     let messageElem = document.createElement("div");
     messageElem.className = "msg"
     messageElem.textContent = "Connected!";
     document.getElementById("js-messages").append(messageElem);
   };

  document.forms.jsForm.onsubmit = function () {
    let outgoingMessage = this.message.value;
    if (document.getElementById('nick').value == "") {
      alert("Set the nick first!");
      return false;
    }
    socket.send(JSON.stringify({"msg":outgoingMessage, "name":document.getElementById('nick').value}));
    return false;
  };
  

  
  socket.onmessage = function (event) {
    let message = event.data;
    let jsonm = JSON.parse(message)
    let messageElem = document.createElement("div");
    messageElem.className = "msg"
    messageElem.textContent = jsonm['name'] + ": " + jsonm['msg'];
    document.getElementById("js-messages").append(messageElem);
    document.getElementById("js-input").value = "";
  };
});