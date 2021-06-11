const orderReportRef = firebase.firestore().collection("orders");
const productReportRef = firebase.firestore().collection("products");

orderReportRef.onSnapshot((snapshot) => {
  // console.log(snapshot);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // console.log(data);

  let listPendingOrder = [];

  data.forEach((item) => {
    if (item.status === "Pending") {
      listPendingOrder.push(item);
    }
  });
  // console.log(typeof data.length);
  // console.log(typeof listPendingOrder.length);

  // console.log(document.getElementById("myChart"));
  const ctx = document.getElementById("myChart").getContext("2d");

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Pending", "Success"],
      datasets: [
        {
          data: [
            listPendingOrder.length,
            data.length - listPendingOrder.length,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      cutout: true,
    },
  });
});

productReportRef.onSnapshot((snapshot) => {
  // console.log(snapshot);
  const dataProduct = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log(dataProduct);

  let labels = [];

  dataProduct.forEach((product) => {
    if (!labels.includes(product.category)) {
      labels.push(product.category);
    }
  });
  console.log(labels);
});
