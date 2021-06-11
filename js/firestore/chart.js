const orderReportRef = firebase.firestore().collection("orders");
const productReportRef = firebase.firestore().collection("products");

// Order Report
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

  // thống kê người mua

  let labelsUser = [];
  data.forEach((item) => {
    if (!labelsUser.includes(item.nameUser)) {
      labelsUser.push(item.nameUser);
    }
  });
  console.log(labelsUser);
  let userCount = data.reduce((acc, item) => {
    if (typeof acc[item.nameUser] == "undefined") {
      acc[item.nameUser] = 1;
    } else {
      acc[item.nameUser] += 1;
    }

    return acc;
  }, {});

  console.log(Object.values(userCount));

  const userOrderID = document
    .getElementById("userOrderChart")
    .getContext("2d");

  new Chart(userOrderID, {
    type: "doughnut",
    data: {
      labels: labelsUser,
      datasets: [
        {
          data: Object.values(userCount),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(0, 159, 64, 0.2)",
            "rgba(54, 0, 235, 0.2)",
            "rgba(255, 206, 0, 0.2)",
            "rgba(0, 0, 192, 0.2)",
            "rgba(0, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(0, 159, 64, 1)",
            "rgba(54, 0, 235, 1)",
            "rgba(255, 206, 0, 1)",
            "rgba(0, 0, 192, 1)",
            "rgba(0, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
          hoverOffset: 4,
        },
      ],
    },
  });
});

// Product Report
productReportRef.onSnapshot((snapshot) => {
  // console.log(snapshot);
  const dataProduct = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // console.log(dataProduct);

  let labels = [];

  dataProduct.forEach((product) => {
    if (!labels.includes(product.category)) {
      labels.push(product.category);
    }
  });
  // console.log(labels);
  let a = dataProduct.reduce((acc, product) => {
    if (typeof acc[product.category] == "undefined") {
      acc[product.category] = 1;
    } else {
      acc[product.category] += 1;
    }

    return acc;
  }, {});

  // console.log(Object.values(a));

  const ctx = document.getElementById("productChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "thống kê sản phẩm",
          data: Object.values(a),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(0, 159, 64, 0.2)",
            "rgba(54, 0, 235, 0.2)",
            "rgba(255, 206, 0, 0.2)",
            "rgba(0, 0, 192, 0.2)",
            "rgba(0, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            display: true,
            ticks: {
              beginAtZero: true,
              max: 20,
              min: 0,
            },
          },
        ],
      },
    },
  });
});
