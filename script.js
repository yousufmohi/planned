 const email = document.getElementById("email");
 const name = document.getElementById("name");
 const password = document.getElementById("password");
 const btn = document.getElementById("submit-btn");

 btn.addEventListener("click", function(e) {
    e.preventDefault();
    console.log(email.value);
    console.log(name.value);
    console.log(password.value);
 });

