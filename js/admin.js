var userApi = "https://6288a9b610e93797c15d8515.mockapi.io/api/id";

function start() {
  getUser(function (users) {
    render(users);
  });
  handerCreateForm();
}
start();

function getUser(callback) {
  // console.log(callback)
  fetch(userApi)
    .then(function (reponsive) {
      return reponsive.json();
    })
    .then(callback);
}

function createList(data, callback) {
  console.log(callback);
  console.log(data);
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(userApi, options)
    .then((res) => {
      res.json();
    })
    .then(callback);
}

function deleteUser(id) {
  var user = $("#list-" + id);
  console.log(user);
  // console.log(user)
  if (user) {
    user.remove();
    // console.log(user)
  }
  var options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    // body:JSON.stringify(data)
  };
  fetch(userApi + "/" + id, options)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

function handerCreateForm() {
  let btn = $("#btn-creat");
  btn.on("click", function () {
    $("#modal").modal();

    var add = $('input[name="add"]').val();
    var name = $('input[name="name"]').val();

    var form = {
      name: name,
      add: add,
    };
    createList(form, function () {
      getUser(render);
    });

    $('input[name="add"]').val("");
    $('input[name="name"]').val("");
    $('input[name="name"]').focus();
  });
}

function render(users) {
  var listUser = $(".table");

  var htmls = users.map(function (user) {
    return `
        <tbody  id="list-${user.id}">
            <tr>
            <td>${user.id}</td>
            <td id="name-${user.id}">${user.name}</td>
            <td id="add-${user.id}"><p>${user.link}</p></td>
                <td><div>
                    <button onclick="deleteUser(${user.id})" id="btn-delete" class="btn btn-danger">Xoá</button>
                    <button onclick="editusers(${user.id})" class="btn btn-warning" id="edit-btn">Sửa</button>
                </div></td>
            </tr>
        </tbody>
        
        `;
  });

  listUser.html(htmls);
  var title = $(".table");
  title.append(`<thead>
    <tr class="">
        <th  class="text-center"  >
            Tập
        </th>
        <th class="text-center" >
        Tên video
        </th>
        <th class="text-center" >
            Link
        </th>
        <th class="text-center" >
            <button onclick="runmodal()"class="btn btn-success" id="btn-creat">Thêm</button>
        </th>
    </tr>
</thead>`);
  users.map(function (user) {
    let list = document.getElementById(`add-${user.id}`);
    list.innerText = `${user.link}`;
  });
}

function editusers(id) {
  console.log(id);
  $("#modal").modal();
  $('input[name="name"]').focus();
  $('input[name="name"]').val($("#name-" + id).text());
  $('input[name="add"]').val($("#add-" + id).text());
  let submitEdit = $("#btn-creat");
  var subbtn = $("#edit");
  submitEdit.hide();
  console.log($("#add-" + id));
  subbtn.show();
  subbtn.on("click", function () {
    var name1 = $('input[name="name"]').val();
    var add1 = $('input[name="add"]').val();
    add1.replace(/"/g, "'");

    var form = {
      name: name1,
      link: add1,
    };
    // console.log(form)
    var options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    };
    fetch(userApi + "/" + id, options)
      .then((response) => response.json())
      .then(function () {
        getUser(render);
        submitEdit.show();
        subbtn.hide();
        $('input[name="add"]').val("");
        $('input[name="name"]').val("");
      });
  });
}
function runmodal() {
  $("#modal").modal();
}
