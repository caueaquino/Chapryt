// Javascript Document

var users=[];

var user={
    nickname: "",
    password: ""
};

//update the user data with database in real time
firebase.database().ref('users').on('value', function (snapshot) {
    snapshot.forEach(function(item){
        users.push(item.val());
    });
});

function cleanFields(){
    document.getElementById("nickname").value="";
    document.getElementById("password").value="";
}

function login(){
    if(document.getElementById("nickname").value=="" || document.getElementById("password").value==""){
        alert("Fill the fields to login!");
        cleanFields();
        return false;
    
    }else if(checkLogin()){
        alert("User does not exist or password is wrong!");
        cleanFields();
        return false;

    }else{  
        window.location.href="./html/chatmenu.html";
        return true;
    }
}

function checkLogin(){
    for(i=0;i<users.length;i++){
        if(users[i].nickname==document.getElementById("nickname").value){
            if(users[i].password==sha256(document.getElementById("password").value)){
                return false;
            }
        }
    }
    return true;
}

function clearCreate(){
    document.getElementById("cnickname").value="";
    document.getElementById("cpassword").value="";
}

function createUser(){
    if(document.getElementById("cnickname").value!="" && document.getElementById("cpassword").value!=""){
        if(checkUser()){
            user.nickname=document.getElementById("cnickname").value;
            user.password=sha256(document.getElementById("cpassword").value);
            firebase.database().ref().child('users').push(user);
            clearCreate();
            window.location.reload();
        }else{
            alert("This Nickname already exists!");
            clearCreate();
        }
    }else{
        alert("Fill the fields to create the account!");
        clearCreate();
    }
}

function checkUser(){
    for(i=0;i<users.length;i++){
        if(users[i].nickname==document.getElementById("cnickname").value){
            return false;
        }
    }
    return true;
}