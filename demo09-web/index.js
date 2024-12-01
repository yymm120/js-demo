
import { Menu } from "./web01-nav/component/component";
import data from "./web01-nav/mock/mock_header.json";

const menuElement = Menu(data);
const container = document.getElementById("web-container");
container.appendChild(menuElement);


