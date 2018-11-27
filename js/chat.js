// Javascript Document

var nickname;

var users=[];

var chats=[];

var chat={
    text: "",
    id: 0
}

//update the chat data with database in real time
firebase.database().ref('chats').on('value', function (snapshot){
    snapshot.forEach(function(item){
        chats=item.val();
        
        if(document.getElementById(chats[chats.length-1].id)==null){
            
            var d=document.createElement("div");
            var p=document.createElement("p");

            d.id=chats[chats.length-1].id;
            d.className="container";
            p.textContent=chats[chats.length-1].text;
            d.appendChild(p);

            var di=document.getElementById("chatt");

            di.appendChild(d);
        }
    });
});

function clearMessageField(){
    document.getElementById("userMessage").value="";
}

function sendMessage(){
    if(document.getElementById("userMessage").value!=""){    
        chat.text="Someone said: "+document.getElementById("userMessage").value;
        chat.id=chats.length;   
        chats.push(chat);
        firebase.database().ref().child('chats').push(chats);
        clearMessageField();
    }
}

function logout(){
    window.location.href="../index.html";
}
