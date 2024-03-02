import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const appSettings = {
  databaseURL:
    "https://playground-99fa1-default-rtdb.europe-west1.firebasedatabase.app/",
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const addBtn = document.getElementById("add-button");
const inputField = document.getElementById("input-field");
const shoppingList = document.getElementById("shopping-list");

addBtn.addEventListener("click", () => {
  let inputValue = inputField.value;
  push(shoppingListInDB, inputValue);
  clearInputField();
  appendItemToShoppingList(inputValue);
});
function appendItemToShoppingList(itemValue) {
  shoppingList.innerHTML += `<li>${itemValue}</li>`;
}

function clearInputField() {
  inputField.value = "";
}
