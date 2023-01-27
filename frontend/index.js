var Uname = ""
var myname = ""
var myemail = ""
var myjobtype = ""
async function PersonalhandleSubmit(event) {
    const username = localStorage.getItem("username");
    event.preventDefault()
    let name = document.getElementById("Name").value
    let email = document.getElementById("Email").value
    let jobtype = document.getElementById("jobType").value
    res = await
        axios.put('http://localhost:3000/update', { username: username, name: name, email: email, jobtype: jobtype })
    console.log("new register")
}

async function loginhandleSubmit(event) {
    event.preventDefault()
    document.getElementById("invalid").innerHTML = ""
    var username = document.getElementById("UserName").value
    var password = document.getElementById("Password").value
    document.getElementById("UserName").value = ""
    document.getElementById("Password").value = ""
    const res = await
        axios.post('http://localhost:3000/Login', { username: username, password: password })
    if (res.data == "invalid") {
        document.getElementById("invalid").innerHTML = "invalid userName or Passward"
    } else {
        localStorage.setItem("Uname", username);
        Mydata(username)
        window.location.href = "./employee_detail.html";
    }
}
async function Mydata(username) {
    console.log("call to Mydata:", username)
    const res = await
        axios.post('http://localhost:3000/mydata', { username: username })
    localStorage.setItem("myname", res.data[0].Name)
    localStorage.setItem("myemail", res.data[0].Email)
    localStorage.setItem("myjobtype", res.data[0].Job_type)
}
function getdata() {
    const myname = localStorage.getItem("myname");
    const myemail = localStorage.getItem("myemail");
    const myjobtype = localStorage.getItem("myjobtype");
    document.getElementById("Name").value = myname
    document.getElementById("Email").value = myemail
    document.getElementById("jobType").value = myjobtype
}

async function registerhandleSubmit(event) {
    event.preventDefault()
    var username = document.getElementById("UserName").value
    var password = document.getElementById("Password").value
    document.getElementById("UserName").value = ""
    document.getElementById("Password").value = ""
    const res = await
        axios.post('http://localhost:3000/ispresent', { username: username })
    if (res.data.count > 0) {
        console.log("already used")
        document.getElementById("result").innerHTML = "user name already exist"
    } else {
        Uname = username
        axios.post('http://localhost:3000/addUser', { username: username, password: password })
        console.log("new register")
    }
    console.log(res.data)
}



