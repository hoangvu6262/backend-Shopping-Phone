const productRef = firebase.firestore().collection("products");
productRef.onSnapshot((snapshot) => {
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if(document.getElementById("countProduct") != null ){
    document.getElementById("countProduct").innerHTML = data.length;
  }

  $("#productTable").find("tr:gt(0)").remove();
  var content = "";
  var i = 0;
  data.forEach(function (item) {
    content += "<tr>";
    content += "<td>" + item.id.substring(0, 10) + "..."  + "</td>";
    content += "<td>" + item.title + "</td>";
    content += "<td>" + item.category + "</td>";
    content += "<td>" + item.price + "</td>";
    content += "<td>" + item.description + "</td>";
    content +=
    "<td><image style='width: 150px;' class='img-fluid rounded float-left' src='" +
    item.imageUrl +
    " ' ></td>";
    content +=
      "<td>" +
      '<a href="#" onclick="deleteProduct(&#39;' +
      item.id +
      '&#39;)"><i class="fa fa-trash" style="color:#A9A9A9"></i></a>' +
      "</td>";
      content +=
      "<td>" +
      '<a href="#"  data-id="' +
      item.id +
      '" data-name="' +
      item.title +
      '"  data-image="' +
      item.imageUrl +
      '"  data-price="' +
      item.price +
      '"  data-category="' +
      item.category +
      '"  data-description="' +
      item.description +
      '" onclick="loadDataModal('+ i +')" id="bntEdit'+ i + '" data-toggle="modal" data-target="#editModel"><i class="fa fa-edit" style="color:#A9A9A9"></i></a>' +
      "</td>";
      content +=
      "<td>" +
      '<a href="/product-detail.html?id='+item.id +'" ><i class="fa fa-eye" style="color:#A9A9A9"></i></a>' +
      "</td>";
      
    content += "</tr>";
    i++;
  });
  $("#productTable").append(content);

  $(document).ready(function () {
    $("#productTable").DataTable();
  });
});



// Function: load data to Modal
function loadDataModal(i) {
  var id = document.getElementById('bntEdit'+i).getAttribute("data-id");
  var name = document.getElementById("bntEdit"+ i).getAttribute("data-name");
  var image = document.getElementById("bntEdit"+ i).getAttribute("data-image");
  var category = document.getElementById("bntEdit"+ i).getAttribute("data-category");
  var price = document.getElementById("bntEdit"+ i).getAttribute("data-price");
  var description = document.getElementById("bntEdit"+ i).getAttribute("data-description");
  
  $("#inputID").val(id);
  $("#inputName").val(name);
  $("#inputImage").val(image);
  $("#inputCategory").val(category);
  $("#inputPrice").val(price);
  $("#inputDescription").val(description);


  // Function: load category for edit product
  firebase.firestore().collection("categories").onSnapshot((snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    var select = document.getElementById('inputSelectCategory');

    data.forEach(function (item) {
        var opt = document.createElement('option');
        opt.value = item.name;
        opt.innerHTML = item.name;
        select.appendChild(opt);

        if(category == item.name){
          document.getElementById("inputSelectCategory").value =category;
        }
    });

  });
}

// Function: load category for add product
firebase.firestore().collection("categories").onSnapshot((snapshot) => {
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  var select = document.getElementById('inputSelectCategoryAdd');
  if(select != null){
    data.forEach(function (item) {
      var opt = document.createElement('option');
      opt.value = item.name;
      opt.innerHTML = item.name;
      select.appendChild(opt);
  });
  }
 

});

// Function: edit product
function editProduct() {
  var id = document.getElementById("inputID").value;
  var inputName = document.getElementById("inputName").value;
  var inputImage = document.getElementById("inputImage").value;
  var inputCategory = document.getElementById("inputSelectCategory").value;
  var inputPrice = document.getElementById("inputPrice").value;
  var inputDescription = document.getElementById("inputDescription").value;
  
  const productRef = firebase.firestore().collection("products").doc(id);
  productRef
    .update({
      title: inputName,
      imageUrl: inputImage,
      category: inputCategory,
      price: parseInt(inputPrice),
      description: inputDescription,
    })
    .then(() => {
      $('#editModel').modal('hide');
      alert('Product updated');
    })
    .catch((error) => {
      console.error("Error updating Product", error);
      $('#editModel').modal('hide');
      alert('Error updating Product');
    });
}

// Function: delete product
function deleteProduct(key) {
  firebase.firestore().collection("products")
    .doc(key.trim())
    .delete()
    .then(function () {
      $('#editModel').modal('hide');
      alert('Remove succeeded.');
    })
    .catch(function (error) {
      $('#editModel').modal('hide');
      alert('Remove failed: '+ + error.message);
    });
}

// Function: add product
function addProduct() {
  var inputName = document.getElementById("inputNameAdd").value;
  var inputImage = document.getElementById("inputImageAdd").value;
  var inputCategory = document.getElementById("inputSelectCategoryAdd").value;
  var inputPrice = document.getElementById("inputPriceAdd").value;
  var inputDescription = document.getElementById("inputDescriptionAdd").value;
  
  

  firebase.firestore().collection("products")
    .add({
      title: inputName,
      imageUrl: inputImage,
      category: inputCategory,
      price: parseInt(inputPrice),
      description: inputDescription,
    })
    .then((ref) => {
      firebase.firestore().collection("products").doc(ref.id).update({
        id: ref.id,
      });
      document.getElementById("inputNameAdd").value = '';
      document.getElementById("inputImageAdd").value = '';
      document.getElementById("inputSelectCategoryAdd").value = '';
      document.getElementById("inputPriceAdd").value = '';
      document.getElementById("inputDescriptionAdd").value = '';

      $('#editModel').modal('hide');
      alert('Product add');
    })
    .catch((error) => {
      $('#editModel').modal('hide');
      alert('Error add Product' + error);
    });
}


