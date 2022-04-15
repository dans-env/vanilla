import { dragElement } from "./drag.js";

(function desktop() {

   const desktop = document.querySelector(".desktop");
   const desktop_icons = document.querySelectorAll(".desktop--icon");
   const start_button = document.querySelector(".start");

   const updateTime = () => {
      const time_element = document.querySelector(".time--text");
      const today = new Date();
      const hours = today.getHours();
      const minutes = (today.getMinutes().toString().length === 1) ? `0${today.getMinutes()}` : today.getMinutes();
      const meridiem = (today.getHours() > 11) ? "PM" : "AM";
      const time = `${hours}:${minutes} ${meridiem}`;

      time_element.textContent = `${time}`;
      setInterval(updateTime, 10000)
   };

   const makeDesktopIconsDragable = () => {
      desktop_icons.forEach(desktop_icon => {
         dragElement(desktop_icon);
      });
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

   desktop_icons.forEach(desktop_icon => {
      desktop_icon.addEventListener("dblclick", function() {
         // Double click functionality stills needs work
      });
   });

   start_button.addEventListener("click", function() {
      (this.classList.contains("active")) ? this.classList.remove("active") : this.classList.add("active")
   });

   const startUpApp = () => {
      makeDesktopIconsDragable();
      updateTime();
   };

   startUpApp();
} ());