import { dragElement } from "./drag.js";

(function desktop() {

   const desktop = document.querySelector(".desktop");
   const desktop_icons = [
      {icon_element: document.querySelector(".recycle-bin")},
      {icon_element: document.querySelector(".my-computer")}
   ]
   const start_button = document.querySelector(".start");
   const time_element = document.querySelector(".time--text");

   const updateTime = () => {
      let today = new Date();
      let hours = today.getHours();
      let minutes = (today.getMinutes().toString().length === 1) ? `0${today.getMinutes()}` : today.getMinutes();
      let meridiem = (today.getHours() > 11) ? "PM" : "AM";
      let time = `${hours}:${minutes} ${meridiem}`;

      time_element.textContent = `${time}`;
      setInterval(updateTime, 10000)
   };

   desktop.addEventListener("contextmenu", function(event) {
      event.preventDefault();

      const menu = this.querySelector(".right-click-menu");
      const mouseX = event.pageX;
      const mouseY = event.pageY;

      menu.style.top = `${mouseY}px`;
      menu.style.left = `${mouseX}px`;

      (menu.classList.contains("active")) ? menu.classList.remove("active") : menu.classList.add("active");
   });

   desktop.addEventListener("click", function() {
      const menu = this.querySelector(".right-click-menu");
      if(menu.classList.contains("active")) menu.classList.remove("active");
   });

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