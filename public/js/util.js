/**
 * Created by Ray on 2016/11/25.
 */
function getHostIP() {
    return "http://localhost:3000/";
}

function getUser() {
    if (sessionStorage.getItem('user') == null){
        return null;
    }else{
        return JSON.parse(sessionStorage.getItem('user'));
    }
}

function setUser(user) {
    sessionStorage.setItem("user", JSON.stringify(user));
}

function setToken(token) {
    sessionStorage.setItem("token", token);
}

function getToken() {
    if (sessionStorage.getItem('token') == null){
        return null;
    }else{
        return sessionStorage.getItem('token');
    }
}

function checkLogin() {
    if(getUser() == null || getToken() == null){
        window.location.href = "/";
    }
}

function logout() {
    sessionStorage.clear();
}