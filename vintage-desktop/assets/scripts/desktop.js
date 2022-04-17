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

   const createApplicationWindow = (title) => {
      const parentElement = document.createElement("div");
      const applicationWindowBody = `
         <div class="application-window-title">
            <h5>${title}</h5>
            <div class="icons">
               <span class="minimize"></span>
               <span class="maximize"></span>
               <span class="close"></span>
            </div>
         </div>
         <div class="application-window-body">
         
         </div>
         <div class="application-window-footer">
         
         </div>
      `;

      parentElement.classList.add("application-window");
      parentElement.innerHTML = applicationWindowBody;
      desktop.appendChild(parentElement);

      addApplicationIconsEventListeners();
   };

   const addApplicationIconsEventListeners = () => {
      const applicationClosebutton = document.querySelector("span.close");
      const applicationMaximisebutton = document.querySelector("span.maximize");

      applicationMaximisebutton.addEventListener("click", function() {
         this.offsetParent.style.width = "100%";
         this.offsetParent.style.height = "100%";
         this.offsetParent.style.top = 0;
         this.offsetParent.style.left = 0;
         this.offsetParent.style.transform = "unset";
      });

      applicationClosebutton.addEventListener("click", function() {
         this.offsetParent.remove();
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
         createApplicationWindow(desktop_icon.querySelector("div:nth-child(2) span").textContent);
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