function deleteItem() {
  let btn = event.target;
  let parent = btn.parentNode.parentNode.parentNode; // get parent div with class="food-selector-row"
  console.log(parent);
  parent.remove(); // remove the parent div from the DOM
}

function addNextItem() {
  var container = document.querySelector(".food-selector-container"); // get the container element
  var newRow = document.createElement("div"); // create new row element
  newRow.classList.add("food-selector-row", "row"); // add classes to new row element

  // create the HTML for the new row element
  newRow.innerHTML = `
    <div class="col">
      <input class="form-control" type="text" id="search-input" name="food-selection" onkeyup="searchFood(this.parentNode.parentNode, this.value)" placeholder="Search for item">
      <input type="hidden" name="food_id" id="food-id-input">
    </div>
    <div class="col">
      <button type="button" class="btn" onclick="deleteItem()">
        <i class="fa-solid fa-trash" style="color: #e01b24"></i>
      </button>
      <button type="button" class="btn" onclick="addNextItem()">
        <i class="fa-solid fa-check" style="color: #33d17a"></i>
      </button>
    </div>
    <ul class="p-2" id="search-results"></ul>
  `;
  container.appendChild(newRow); // append the new row to the container
}

async function searchFood(foodSelectorRow, searchTerm) {
  /* console.log(inputElement) */
  const APP_ID = "17ef13d8";
  const APP_KEY = "1cd19810edca849183d418491db87c92";
  const API_ENDPOINT = "https://api.edamam.com/api/food-database/v2/parser";

  const searchResults = foodSelectorRow.querySelector("#search-results");
  console.log(searchResults);
  searchResults.innerHTML = "";

  if (searchTerm.length < 3) {
    return;
  }

  const response = await fetch(
    `${API_ENDPOINT}?ingr=${searchTerm}&app_id=${APP_ID}&app_key=${APP_KEY}`
  );
  const data = await response.json();

  const foodItems = data.hints.map((hint) => {
    return {
      label: hint.food.label,
      id: hint.food.foodId,
    };
  });

  foodItems.forEach((foodItem) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.classList.add("col-6");
    listItem.textContent = foodItem.label;
    listItem.addEventListener("click", () => {
      foodSelectorRow.querySelector("#search-input").value = foodItem.label;
      foodSelectorRow.querySelector("#food-id-input").value = foodItem.id;
      searchResults.innerHTML = "";
    });
    searchResults.appendChild(listItem);
  });
}
