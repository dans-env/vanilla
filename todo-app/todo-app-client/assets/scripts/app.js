(function() {

   let item_count = 0;

   const port = 4000
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

   const removeItemFrom_db = (textString) => {
      const itemObject = {
         "todo": textString
      };
      fetch(`http://localhost:${port}/remove-item`, {
         method: 'Delete',
         mode: "cors",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(itemObject)
      });
   };

   const handleFormSubmit = async (event) => {
      event.preventDefault();
      const formData = getUsersInputFromForm();
      (formData) ? addItemTo_db(formData) && createTodoItem(formData) && incrementItemCount() : showErrorNotification();
      form.reset();
   };

   const getUsersInputFromForm = () => {
      const formData = new FormData(form);
      return formData.get("user-input");
   };

   const addTodosToScreen = (itemsArray) => {
      itemsArray.forEach((item) => {
         incrementItemCount();
         createTodoItem(item);
      });
   };

   const createTodoItem = (inputValue) => {
      const newItem = document.createElement("div");
      newItem.classList.add("todo-item");

      const itemParagraph = document.createElement("p");
      (typeof inputValue === "string") ? itemParagraph.textContent = inputValue : itemParagraph.textContent = inputValue.todo

      const itemDeleteButton = document.createElement("span");
      itemDeleteButton.classList.add("delete");

      newItem.append(itemParagraph);
      newItem.append(itemDeleteButton);
      item_root.append(newItem);

      addDeleteEventListener(itemDeleteButton);
   };

   const addDeleteEventListener = (item) => {
      item.addEventListener("click", () => {
         deleteItem(item);
      });
   };

   const deleteItem = (item) => {
      const todoItem = item.parentNode;
      removeItemFrom_db(todoItem.children[0].textContent);
      todoItem.remove();
      decreaseItemCount();
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