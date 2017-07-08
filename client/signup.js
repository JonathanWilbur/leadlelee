function submit(event) {
    event.preventDefault();
    var formdata = {
        name: document.getElementById("username").value,
        password: document.getElementById("password").value,
        weight: Number(document.getElementById("weight").value),
        height: Number(document.getElementById("height").value),
        deadlift: Number(document.getElementById("deadlift").value || 0),
        bench: Number(document.getElementById("bench").value || 0),
        squat: Number(document.getElementById("squat").value || 0)
    };
    if (!formdata.name || !formdata.password || !formdata.weight || !formdata.height) {
        alert("Supply a username, password, height, and weight, you cunt.");
        return;
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                window.location.pathname = "/index.html";
            } else if (this.status == 500) {
                alert("Something went wrong with the server. Please alert ZanzAbteilung.");
            } else if (this.status == 401) {
                alert("Nice try, Schlomo.");
            } else {
                alert("Something went wrong. You probably did something dumb.");
            }
        }
    };
    xhttp.open("POST", "signup", false);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(formdata));
}
document.getElementById("submitbutton").addEventListener("click", function (event) { submit(event); }, false);