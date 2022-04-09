(function() {

   const port = 4000
   
   const form = document.getElementById("form");
   const formSubmitButton = form.querySelector(".submit");

   formSubmitButton.addEventListener("click", (event) => {
      handleFormSubmit(event);
   });

   const handleFormSubmit = (event) => {
      event.preventDefault()
      
      const formData = new FormData(form);
      const inputValue = formData.get("user-input");

      (inputValue) ? validData(inputValue) : invalidData();
   };

   const validData = (value) => {
      const processedValue = {
         "todo": value
      }

      const response = fetch(`http://localhost:${port}/add-item`, {
         method: 'POST',
         mode: 'cors',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(processedValue)
      });
      //const data = response.json();
      //console.log(data);
   };

   const invalidData = () => {
      const errorNotification = document.getElementById("error-notification");
      const message = document.createElement("p");

      message.textContent = "Sorry you input was invalid";
      errorNotification.appendChild(message);
      errorNotification.style.display = "block";

      setTimeout(() => {
         message.remove();
         errorNotification.style.display = "none";
      }, 5000);
   };

} ());