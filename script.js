import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
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
});
function appendItemToShoppingList(item) {
  let itemID = item[0];
  let itemValue = item[1];
  let newEl = document.createElement("li");
  newEl.classList.add(
    "bg-[#DCE1EB]",
    "shadow-md",
    "p-4",
    "rounded-lg",
    "text-[#131314]",
    "text-xl",
    "font-[Rubik]",
    "flex-grow",
    "text-center",
    "hover:bg-[#C2F7FF]",
    "hover:cursor-pointer"
  );
  newEl.textContent = itemValue;
  newEl.addEventListener("click", () => {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
    remove(exactLocationOfItemInDB);
  });
  shoppingList.append(newEl);
}

onValue(shoppingListInDB, (snapshot) => {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());
    clearShoppingList();
    for (let i = 0; i < itemsArray.length; i++) {
      const currentItem = itemsArray[i];
      appendItemToShoppingList(currentItem);
    }
  } else {
    shoppingList.innerHTML = "No items here... yet";
  }
});
function clearShoppingList() {
  shoppingList.innerHTML = "";
}
function clearInputField() {
  inputField.value = "";
}
const toggleButton = document.getElementById("toggle");
const toggleLabel = document.getElementById("toggle-label");
const body = document.body;
toggleButton.addEventListener("click", () => {
  body.classList.toggle("bg-[#131314]");
  toggleLabel.classList.toggle("text-white");
});
