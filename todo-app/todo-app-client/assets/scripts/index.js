(function() {

   const port = 4000
   const form = document.getElementById("form");
   const formSubmitButton = form.querySelector(".submit");
   const root = document.getElementById("todo-root");
   const errorNotification = document.getElementById("error-notification");

   const initialLoad = async () => {
      const itemsArray = await getItemsFrom_db();
      addTodosToScreen(itemsArray);
   };

   const getItemsFrom_db = async () => {
      const data = await fetch(`http://localhost:${port}/get-items`);
      const response = await data.json();
      return response;
   };

   const addItemTo_db = async (formInput) => {
      const itemObject = {
         "todo": formInput
      }
      fetch(`http://localhost:${port}/add-item`, {
         method: 'POST',
         mode: 'cors',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(itemObject)
      });
   };

   const addTodosToScreen = (itemsArray) => {
      itemsArray.forEach(item => {
         createTodoItem(item);
      });
   };

   const createTodoItem = (inputValue) => {
      const newItem = document.createElement("div");
      newItem.classList.add("todo-item");

      const itemParagraph = document.createElement("p");
      (typeof inputValue === "string") ? itemParagraph.textContent = inputValue : itemParagraph.textContent = inputValue.todo

      newItem.append(itemParagraph);
      root.append(newItem);
   };

   const getUsersInputFromForm = () => {
      const formData = new FormData(form);
      return formData.get("user-input");
   };

   const showErrorNotification = () => {
      errorNotification.style.display = "block";
      hideErrorNotification();
   };

   const hideErrorNotification = () => {
      setTimeout(() => {
         errorNotification.style.display = "none";
      }, 4000);
   }

   formSubmitButton.addEventListener("click", (event) => {
      handleFormSubmit(event);
   });

   const handleFormSubmit = async (event) => {
      event.preventDefault();
      const formData = getUsersInputFromForm();
      (formData) ? addItemTo_db(formData) && createTodoItem(formData) : showErrorNotification();
      form.reset();
   };

   initialLoad();
} ());