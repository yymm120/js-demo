import Walker from "walker-common";
import { Menu } from "../../web01-nav/component/menu";

let document = globalThis.document;
if (document === undefined) {
    const { JSDOM } = await import("jsdom");
    document = new JSDOM("").window.document;
}

const logo = (props = {}) => {
    const { id, title, icon } = props;
    const p = document.createElement("p");
    const li = document.createElement("li");
    li.appendChild(p);
    if (id) {
        p.id = id
    }
    if (title) {
        p.textContent = title
    }
    return { li: li, children: [p] };
}

const menu = (data) => {
    return Menu(data);
    
}

const buttonGroup = () => {

}

export const Header = ({logo, menu, button}) => {
    return {}
}
