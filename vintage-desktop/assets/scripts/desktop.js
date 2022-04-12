import { dragElement } from "./drag.js";

(function desktop() {

   const start_button = document.querySelector(".start");
   const time_element = document.querySelector(".time--text");
   const desktop_icons = [
      {icon_element: document.querySelector(".recycle-bin")},
      {icon_element: document.querySelector(".my-computer")}
   ]

   const updateTime = () => {
      let today = new Date();
      let hours = today.getHours();
      let minutes = (today.getMinutes().toString().length === 1) ? `0${today.getMinutes()}` : today.getMinutes();
      let meridiem = (today.getHours() > 11) ? "PM" : "AM";
      let time = `${hours}:${minutes} ${meridiem}`;

      time_element.textContent = `${time}`;
      setInterval(updateTime, 10000)
   };

   start_button.addEventListener("click", function() {
      (this.classList.contains("active")) ? this.classList.remove("active") : this.classList.add("active")
   });

   const initialLoad = (desktop_icons) => {
      desktop_icons.forEach(icon => {
         dragElement(icon.icon_element);
      });
   };

   initialLoad(desktop_icons);
   updateTime();
} ());