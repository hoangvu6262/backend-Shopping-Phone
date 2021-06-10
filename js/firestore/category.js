const categoryRef = firebase.firestore().collection("categories");
categoryRef.onSnapshot((snapshot) => {
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (document.getElementById("countCategory") != null) {
    document.getElementById("countCategory").innerHTML = data.length;
  }

  $("#categoryTable").find("tr:gt(0)").remove();
  var content = "";
  var i = 0;
  data.forEach(function (item) {
    content += "<tr>";
    content += "<td>" + item.id.substring(0, 10) + "..." + "</td>";
    content += "<td>" + item.name + "</td>";
    content +=
      "<td><image style='width: 150px;' class='img-fluid rounded float-left' src='" +
      item.image +
      " ' ></td>";
    content +=
      "<td>" +
      '<a href="#" onclick="deleteCategory(&#39;' +
      item.id.toString() +
      '&#39;)"><i class="fa fa-trash" style="color:#A9A9A9"></i></a>' +
      "</td>";
    content +=
      "<td>" +
      '<a href="#" data-id="' +
      item.id +
      '" data-name="' +
      item.name +
      '"  data-image="' +
      item.image +
      '" onclick="loadDataModal(' +
      i +
      ')" id="bntEdit' +
      i +
      '"  data-toggle="modal" data-target="#editModel"><i class="fa fa-edit" style="color:#A9A9A9"></i></a>' +
      "</td>";
    content += "</tr>";
    i++;
  });
  $("#categoryTable").append(content);
});

// Function: load data to Modal
function loadDataModal(i) {
  var categoryName = document
    .getElementById("bntEdit" + i)
    .getAttribute("data-name");
  var categoryImage = document
    .getElementById("bntEdit" + i)
    .getAttribute("data-image");
  var categoryID = document
    .getElementById("bntEdit" + i)
    .getAttribute("data-id");
  $("#inputName").val(categoryName);
  $("#inputImage").val(categoryImage);
  $("#inputID").val(categoryID);
}

// Function: delete category
function deleteCategory(key) {
  console.log(key);
  categoryRef
    .doc(key.trim())
    .delete()
    .then(function () {
      console.log("Remove succeeded.");
      $("#editModel").modal("hide");
      alert("Remove succeeded.");
    })
    .catch(function (error) {
      $("#editModel").modal("hide");
      alert("Remove failed.");
    });
}

// Function: edit category
function editCategory() {
  var id = document.getElementById("inputID").value;
  var inputName = document.getElementById("inputName").value;
  var inputImage = document.getElementById("inputImage").value;
  const categoryRef = firebase.firestore().collection("categories").doc(id);
  categoryRef
    .update({
      name: inputName,
      image: inputImage,
    })
    .then(() => {
      console.log("Document updated");
      $("#editModel").modal("hide");
      alert("Document updated");
    })
    .catch((error) => {
      console.error("Error updating doc", error);
      $("#editModel").modal("hide");
      alert("Error updating doc");
    });
}

// Function: add category
function addCategory() {
  var inputNameAdd = document.getElementById("inputNameAdd").value;
  var inputImageAdd = document.getElementById("inputImageAdd").value;
  firebase
    .firestore()
    .collection("categories")
    .add({
      name: inputNameAdd,
      image: inputImageAdd,
    })
    .then((ref) => {
      firebase.firestore().collection("categories").doc(ref.id).update({
        id: ref.id,
      });
      document.getElementById("inputNameAdd").value = "";
      document.getElementById("inputImageAdd").value = "";
      $("#editModel").modal("hide");
      alert("Document add");
    })
    .catch((error) => {
      console.error("Error add doc", error);
      $("#editModel").modal("hide");
      alert("Error add doc");
    });
}
