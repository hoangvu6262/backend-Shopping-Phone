const categoryRef = firebase.firestore().collection("admin");

firebase
  .auth()
  .signInWithEmailAndPassword(u, p)
  .then(function (result) {
    result.getToken().then(function (token) {
      $rootScope.userLoginToken = token;
    });
  });

function login() {
  categoryRef.onSnapshot((snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    var email = document.getElementById("InputEmail").value;
    var password = document.getElementById("InputPassword").value;

    data.forEach(function (item) {
      if (item.email == email && item.password == password) {
        window.location = "/index.html";
        console.log("true");
      } else {
        alert("Incorrect email or password");
      }
    });
  });
}
