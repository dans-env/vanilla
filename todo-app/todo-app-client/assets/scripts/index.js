(function() {

   const port = 4000
   const item_count = 0;
   const item_root = document.getElementById("todo-root");
   const item_count_Element = document.getElementById("item-count");
   const form = document.getElementById("form");
   const formSubmitButton = form.querySelector(".submit");
   const errorNotification = document.getElementById("error-notification");

   const initialLoad = async () => {
      try {
         const itemsArray = await getItemsFrom_db();
         addTodosToScreen(itemsArray);
      } catch {
         showServerConnectError();
      }
   };

   formSubmitButton.addEventListener("click", (event) => {
      handleFormSubmit(event);
   });

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

   const handleFormSubmit = async (event) => {
      event.preventDefault();
      const formData = getUsersInputFromForm();
      (formData) ? addItemTo_db(formData) && createTodoItem(formData) : showErrorNotification();
      form.reset();
   };

   const getUsersInputFromForm = () => {
      const formData = new FormData(form);
      return formData.get("user-input");
   };

   const addTodosToScreen = (itemsArray) => {
      itemsArray.forEach((item) => {
         createTodoItem(item);
      });
   };

   const createTodoItem = (inputValue) => {
      const newItem = document.createElement("div");
      newItem.classList.add("todo-item");

      const itemParagraph = document.createElement("p");
      (typeof inputValue === "string") ? itemParagraph.textContent = inputValue : itemParagraph.textContent = inputValue.todo

      newItem.append(itemParagraph);
      item_root.append(newItem);
   };

   const showErrorNotification = () => {
      errorNotification.style.display = "block";
      hideErrorNotification();
   };

   const hideErrorNotification = () => {
      setTimeout(() => {
         errorNotification.style.display = "none";
      }, 4000);
   };

   const showServerConnectError = () => {
      const messageContainer = document.createElement("div");
      messageContainer.classList.add("error-no-items-found");
      
      const messageContainerText = document.createElement("p");
      messageContainerText.textContent = "Sorry, we could not connect to the server."

      messageContainer.append(messageContainerText);
      item_root.append(messageContainer);
   };

   const incrementItemCount = () => {
      item_count ++;
      item_count_Element.innerHTML = item_count;
   };

   const decreaseItemCount = () => {
      item_count --;
      item_count_Element.innerHTML = item_count;
   };

   initialLoad();
} ());