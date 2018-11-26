// Javascript Document

var nickname;

var users=[];

var chats=[];

var chat={
    text: ""
}

//update the chat data with database in real time
firebase.database().ref('chats').on('value', function (snapshot){
    snapshot.forEach(function(item){
        chats.push(item.val());
        
        var d=document.createElement("div");
        var p=document.createElement("p");

        d.className="container";
        p.textContent=chats[chats.length-1].text;

        d.appendChild(p);

        var di=document.getElementById("chatt");

        di.appendChild(d);
    });
});

function sendMessage(){
    chat.text="Someone said: "+document.getElementById("userMessage").value;
    firebase.database().ref().child('chats').push(chat);
    window.location.reload();
}

function logout(){
    window.location.href="./index.html";
}

function setNickname(){
    window.location="chatmenu.html?nickname="+document.getElementById("nickname").value;
}
