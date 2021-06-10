const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productID = urlParams.get('id')

const productRef = firebase.firestore()
.collection("products")
.where("id", "==", productID.toString());



console.log(productID);
productRef.onSnapshot((snapshot) => {
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  
  data.forEach(function (item) {
    document.getElementById("title").innerHTML = item.title;
    document.getElementById("titleID").innerHTML = item.title;
    document.getElementById("priceProduct").innerHTML = item.price +" <span class='badge bg-primary text-white'>$</span>";
    document.getElementById("categoryProduct").innerHTML = "Category: "+item.category;
    document.getElementById("imageProduct").src = item.imageUrl;
    document.getElementById("descriptionProduct").innerHTML = item.description;

    var ul = document.getElementById("listReview");
    while (ul.lastElementChild) {
      ul.removeChild(ul.lastElementChild);
    }


    if(item.rate != null){
      item.rate.forEach(function(item){
        
        var li = document.createElement("li");
        li.setAttribute("class", "media list-group-item");
        var div = document.createElement("div");
        div.setAttribute("class", "media-body");
        var h5 = document.createElement("h5");
        h5.setAttribute("class", "mt-0 mb-1");
        var p = document.createElement(p);
        p.appendChild(document.createTextNode(item.rate));
        var star = document.createElement("span");
        star.setAttribute("class", "fa fa-star checked");
        star.setAttribute("style", "color:orange");


        p.appendChild(star);
        h5.setAttribute("class", "mt-0 mb-1");
        h5.appendChild(document.createTextNode(item.comment));
        li.appendChild(div);
        div.appendChild(h5);
        div.appendChild(p);
        var reply = document.createElement("input");
        reply.setAttribute("class", "form-control ml-4 mr-4");
        reply.setAttribute("id", item.id);
        reply.setAttribute("value",item.reply??"");
        div.appendChild(reply);

        var button = document.createElement("input");
        button.setAttribute("class", "btn btn-primary mb-2 mt-2 ml-4");
        button.setAttribute("value", "Reply");
        button.setAttribute("type", "button");
        var replyContent = item.reply ?? 'no';
        button.setAttribute("onclick", "replyFunction('"+ productID + "' , '" + item.id + "', '" + item.rate + "', '" + item.comment + "', '" + replyContent + "')");
        div.appendChild(button);

        ul.appendChild(li);
       
      });
    }
  });

});


function replyFunction(productID, itemID, itemRate, itemComment, itemReply) {
  console.log(typeof(itemRate));
  let productRef = firebase.firestore().collection('products').doc(productID.toString())
  var replyInput = document.getElementById(itemID.toString()).value;
  let updateData = {
    comment: itemComment,
    rate:  parseFloat(itemRate),
    id: itemID,
    reply: replyInput,
  };
  let deleteData;
  if(itemReply == "no"){
    deleteData = {
      comment: itemComment,
      rate:  parseFloat(itemRate),
      id: itemID,
    };
  }else{
    deleteData = {
      comment: itemComment,
      rate: parseFloat(itemRate),
      id: itemID,
      reply: itemReply
    };
  }
 

  productRef.update({
    rate: firebase.firestore.FieldValue.arrayRemove(deleteData)
  });

  productRef.update({
    rate: firebase.firestore.FieldValue.arrayUnion(updateData)
  });
  console.log("click " + productID +  " " +replyInput);
}