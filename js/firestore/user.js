const userRef = firebase.firestore().collection("users");
userRef.onSnapshot((snapshot) => {
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if(document.getElementById("countUser") != null ){
    document.getElementById("countUser").innerHTML = data.length;
  }

  $("#userTable").find("tr:gt(0)").remove();
  var content = "";

  data.forEach(function (item) {
    content += "<tr>";
      content += "<td>" + item.id.substring(0, 15) + "..."  + "</td>";
      content += "<td>" + item.name + "</td>";
      content += "<td>" + item.email + "</td>";
    content += "</tr>";
  });
  $("#userTable").append(content);

  $(document).ready(function () {
    $("#userTable").DataTable();
  });
});


