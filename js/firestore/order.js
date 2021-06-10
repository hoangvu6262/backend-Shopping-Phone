const orderRef = firebase.firestore().collection("orders");
orderRef.onSnapshot((snapshot) => {
  // console.log(snapshot);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  // console.log(data);
  document.getElementById("countOrders").innerHTML = data.length;
  $("#dataTable").find("tr:gt(0)").remove();
  var content = "";
  var i = 0;
  data.forEach(function (item) {
    console.log(item);
    var stringStatus;
    switch (item.status) {
      case "Pending":
        stringStatus = "<span class='badge badge-warning'>Pending</span>";
        break;
      case "Success":
        stringStatus = "<span class='badge badge-success'>Success</span>";
        break;
    }

    content += "<tr>";
    content += "<td>" + item.createdAt + "</td>";
    content += "<td>" + item.id.substring(0, 10) + "..." + "</td>";
    content += "<td>" + item.nameUser + "</td>";
    content += "<td>" + item.phone + "</td>";
    content += "<td>" + item.address + "</td>";
    content += "<td>" + item.amount + "</td>";
    content += "<td>" + stringStatus + "</td>";
    content +=
      "<td>" +
      '<a href="#" onclick="deleteOrder(&#39;' +
      item.id +
      '&#39;)"><i class="fa fa-trash" style="color:#A9A9A9"></i></a>' +
      "</td>";
    content +=
      "<td>" +
      '<a href="#"  data-id="' +
      item.id +
      '" data-name="' +
      item.status +
      '"  data-status="' +
      '" onclick="loadDataModal(' +
      i +
      ')" id="bntEdit' +
      i +
      '" data-toggle="modal" data-target="#editModel"><i class="fa fa-edit" style="color:#A9A9A9"></i></a>' +
      "</td>";
    content += "</tr>";
    i++;
  });
  $("#dataTable").append(content);

  $(document).ready(function () {
    $("#dataTable").DataTable();
  });
});

// Function: load data to Modal
function loadDataModal(i) {
  var id = document.getElementById("bntEdit" + i).getAttribute("data-id");
  var status = document
    .getElementById("bntEdit" + i)
    .getAttribute("data-status");
  $("#selectStatus").val(status);
  $("#inputID").val(id);
}

// Function: edit category
function editOrder() {
  var id = document.getElementById("inputID").value;
  var inputName = document.getElementById("selectStatus").value;
  const orderRef = firebase.firestore().collection("orders").doc(id);
  orderRef
    .update({
      status: inputName,
    })
    .then(() => {
      $("#editModel").modal("hide");
      alert("Order updated");
    })
    .catch((error) => {
      $("#editModel").modal("hide");
      alert("Error updating order");
    });
}

// Function: delete order
function deleteOrder(key) {
  firebase
    .firestore()
    .collection("orders")
    .doc(key.trim())
    .delete()
    .then(function () {
      $("#editModel").modal("hide");
      alert("Remove succeeded.");
    })
    .catch(function (error) {
      $("#editModel").modal("hide");
      alert("Remove failed: " + +error.message);
    });
}
