let inputEmailLog = document.querySelector(".email");
let inputPassLog = document.querySelector(".password");

let button = document.querySelector(".site-btn");

let data = [];
fetch("https://64036281302b5d671c4e05dc.mockapi.io/taikhoan")
  .then((response) => response.json())
  .then((products) => {
    data = products;
  });

button.addEventListener("click", () => {
  console.log('24242342342344');

  for (var i = 0; i < data.length; i++) {
    if (
      data[i].email == `${inputEmailLog.value}` &&
      data[i].password == `${inputPassLog.value}`
    ) {
      console.log('24242342342344');
      location.href = "admin.html";
      return;
    }
  }
  alert("Tài khoản hoặc mật khẩu không chính xác!");
});
