import { dragElement } from "./drag.js";

(function desktop() {

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

   const initialLoad = (desktop_icons) => {
      desktop_icons.forEach(icon => {
         dragElement(icon.icon_element);
      });
   };

   initialLoad(desktop_icons);
   updateTime();
} ());