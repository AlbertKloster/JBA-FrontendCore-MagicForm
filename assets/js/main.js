window.addEventListener("storage", storageEventHandler);
function storageEventHandler(event){
  if (event.key === "lastForm") {
    loadLastForm();
  }
  if (event.key === "history") {
    removeAllCards();
    loadHistory();
  }
}

const removeAllCards = () => {
  const cards = getAllCards();
  for (let card of cards) {
    card.remove();
  }
  if (getAllCards().length !== 0) removeAllCards();
};

function Form(firstName, lastName, email, phone, company, address) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
  this.phone = phone;
  this.company = company;
  this.address = address;
}

const saveLastForm = () => {
  window.localStorage.setItem("lastForm", JSON.stringify(getLastForm()));
};

const saveHistory = () => {
  const history = getHistory();
  localStorage.removeItem("lastForm");
  history.push(getLastForm());
  window.localStorage.setItem("history", JSON.stringify(history));
}

const updateHistory = () => {
  const updatedHistory = getUpdatedHistory();
  window.localStorage.setItem("history", JSON.stringify(updatedHistory));
}

const getUpdatedHistory = () => {
  const cards = getAllCards();
  const updatedHistory = [];
  for (let card of cards) {
    updatedHistory.push(getForm(card));
  }
  return updatedHistory;
}

const getForm = (card) => {
  const firstName = card.getElementsByClassName("card-first-name")[0].textContent;
  const lastName = card.getElementsByClassName("card-last-name")[0].textContent;
  const email = card.getElementsByClassName("card-email")[0].textContent;
  const phone = card.getElementsByClassName("card-phone")[0].textContent;
  const company = card.getElementsByClassName("card-company")[0].textContent;
  const address = card.getElementsByClassName("card-address")[0].textContent;
  return new Form(firstName, lastName, email, phone, company, address);
}

const getLastForm = () => {
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const company = document.getElementById("company").value;
  const address = document.getElementById("address").value;
  return new Form(firstName, lastName, email, phone, company, address);
}

const loadLastForm = () => {
  const lastForm = JSON.parse(localStorage.getItem("lastForm"));
  if (lastForm === null) return;
  parse(lastForm);
};

const getHistory = () => {
  return JSON.parse(localStorage.getItem("history")) || [];
};

const parse = (lastForm) => {
  document.getElementById("first-name").value = getField(lastForm.firstName);
  document.getElementById("last-name").value = getField(lastForm.lastName);
  document.getElementById("email").value = getField(lastForm.email);
  document.getElementById("phone").value = getField(lastForm.phone);
  document.getElementById("company").value = getField(lastForm.company);
  document.getElementById("address").value = getField(lastForm.address);
};

const getField = (field) => {
  return field === undefined || null ? "" : field;
}

const loadHistory = () => {
  const history = getHistory();
  history.forEach(getCard);
}

const getCard = (form) => {
  const cards = document.getElementById("cards");
  const card = document.createElement("div");
  card.classList.add("card", "shadow-sm", "p-3", "mb-5", "bg-body", "rounded", "mt-3", "submit-history-card")
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const firstNameTitle = document.createElement("p");
  firstNameTitle.classList.add("card-title", "fs-5", "fw-bold");
  firstNameTitle.textContent = "First Name";
  const firstNameText = document.createElement("p");
  firstNameText.classList.add("card-text", "card-first-name", "fs-5");
  firstNameText.textContent = getField(form.firstName);

  const lastNameTitle = document.createElement("p");
  lastNameTitle.classList.add("card-title", "fs-5", "fw-bold");
  lastNameTitle.textContent = "Last Name";
  const lastNameText = document.createElement("p");
  lastNameText.classList.add("card-text", "card-last-name", "fs-5");
  lastNameText.textContent = getField(form.lastName);

  const emailTitle = document.createElement("p");
  emailTitle.classList.add("card-title", "fs-5", "fw-bold");
  emailTitle.textContent = "Email";
  const emailText = document.createElement("p");
  emailText.classList.add("card-text", "card-email", "fs-5");
  emailText.textContent = getField(form.email);

  const phoneTitle = document.createElement("p");
  phoneTitle.classList.add("card-title", "fs-5", "fw-bold");
  phoneTitle.textContent = "Phone";
  const phoneText = document.createElement("p");
  phoneText.classList.add("card-text", "card-phone", "fs-5");
  phoneText.textContent = getField(form.phone);

  const companyTitle = document.createElement("p");
  companyTitle.classList.add("card-title", "fs-5", "fw-bold");
  companyTitle.textContent = "Company";
  const companyText = document.createElement("p");
  companyText.classList.add("card-text", "card-company", "fs-5");
  companyText.textContent = getField(form.company);

  const addressTitle = document.createElement("p");
  addressTitle.classList.add("card-title", "fs-5", "fw-bold");
  addressTitle.textContent = "Address";
  const addressText = document.createElement("p");
  addressText.classList.add("card-text", "card-address", "fs-5");
  addressText.textContent = getField(form.address);

  const containerBtn = document.createElement("div");
  containerBtn.classList.add("d-flex", "justify-content-center");
  const button = document.createElement("button");
  button.classList.add("btn", "btn-danger", "delete-button");
  button.setAttribute("type", "button");
  button.textContent = "Delete";
  button.onclick = deleteCard;
  containerBtn.append(button);

  cardBody.append(firstNameTitle);
  cardBody.append(firstNameText);
  cardBody.append(lastNameTitle);
  cardBody.append(lastNameText);
  cardBody.append(emailTitle);
  cardBody.append(emailText);
  cardBody.append(phoneTitle);
  cardBody.append(phoneText);
  cardBody.append(companyTitle);
  cardBody.append(companyText);
  cardBody.append(addressTitle);
  cardBody.append(addressText);
  cardBody.append(containerBtn);
  card.append(cardBody);
  cards.append(card);
}

const deleteCard = (event) => {
  event.target.parentElement.parentElement.parentElement.remove();
  updateHistory();
}

const getAllCards = () => {
  return document.getElementsByClassName("card") || [];
}
