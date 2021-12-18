// client-side js

//ITEM List Form
const itemsForm = document.forms[0];
const titleInput = itemsForm.elements["title"];
const descInput = itemsForm.elements["description"];
const priceInput = itemsForm.elements["price"];
const contactInput = itemsForm.elements["contact"];
const categoryInput = itemsForm.elements["category"];
const itemList = document.getElementById("item");

const category2Form = document.forms[1];
const category2Input = category2Form.elements["category2"];


//updates the user table on the page
const appendNewItem = item => {
  const newTrItem = document.createElement("tr");
  const titleTdItem = document.createElement("td");
  titleTdItem.innerHTML = item.title;
  const descTdItem = document.createElement("td");
  descTdItem.innerHTML = item.description;
  const priceTdItem = document.createElement("td");
  priceTdItem.innerHTML = item.price;
  const contactTdItem = document.createElement("td");
  contactTdItem.innerHTML = item.contact;
  const dateTdItem = document.createElement("td");
  dateTdItem.innerHTML = item.date;
  const idTdItem = document.createElement("td");
  idTdItem.innerHTML = item.id;

  newTrItem.appendChild(idTdItem);
  newTrItem.appendChild(titleTdItem);
  newTrItem.appendChild(descTdItem);
  newTrItem.appendChild(priceTdItem);
  newTrItem.appendChild(contactTdItem);
  newTrItem.appendChild(dateTdItem);

  const tbItem = document.getElementById("item_table");
  tbItem.appendChild(newTrItem);
};
/////
const appendNewItem2 = item => {
  const newTrItem = document.createElement("tr");
  const titleTdItem = document.createElement("td");
  titleTdItem.innerHTML = item.title;
  const descTdItem = document.createElement("td");
  descTdItem.innerHTML = item.description;
  const priceTdItem = document.createElement("td");
  priceTdItem.innerHTML = item.price;
  const contactTdItem = document.createElement("td");
  contactTdItem.innerHTML = item.contact;
  const dateTdItem = document.createElement("td");
  dateTdItem.innerHTML = item.date;
  const idTdItem = document.createElement("td");
  idTdItem.innerHTML = item.id;

  newTrItem.appendChild(idTdItem);
  newTrItem.appendChild(titleTdItem);
  newTrItem.appendChild(descTdItem);
  newTrItem.appendChild(priceTdItem);
  newTrItem.appendChild(contactTdItem);
  newTrItem.appendChild(dateTdItem);

  const tbItem = document.getElementById("search_table");
  tbItem.appendChild(newTrItem);
};

//add a new user to the list when submitted
itemsForm.onsubmit = event => {
  //stop the form submission from refreshing the page
  event.preventDefault();
  const date = new Date().toLocaleDateString();
  const data = {
    title: titleInput.value,
    description: descInput.value,
    price: priceInput.value,
    contact: contactInput.value,
    //maybe
    category: categoryInput.value,
    date: date
  };

  fetch("/addItem", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(response => {
      console.log(JSON.stringify(response));
    });

  fetch("/getItems", {})
    .then(res => res.json())
    .then(response => {
      response.forEach(row => {
        appendNewItem({
          id: row.id,
          title: row.title,
          description: row.description,
          price: row.price,
          contact: row.contact,
          //maybe
          //category: row.category,
          date: row.datejoined
        });
      });
    });

  
  //reset form
  titleInput.value = "";
  titleInput.focus();
  descInput.value = "";
  priceInput.value = "";
  contactInput.value = "";
  categoryInput.value = 0;
};



category2Form.onsubmit = event => {
  event.preventDefault();

  const data = {
    Category2: category2Input.value
  };

  fetch("/getByCategory", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json"}
  })
    .then(res => res.json())
    .then(response => {
      response.forEach(row => {
        appendNewItem2({
          id: row.id,
          title: row.title,
          description: row.description,
          price: row.price,
          contact: row.contact,
          date: row.datejoined
        });
      });
    });
  //reset form
  categoryInput.value = 0;
};