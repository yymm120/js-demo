import { Menu } from "./component/menu.js";
import data from "./mock/mock_header.json";

const container = document.getElementById("container");
const menuElement = Menu(data);
container.appendChild(menuElement);
