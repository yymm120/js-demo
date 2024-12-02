import Walker from "walker-common";

let document = globalThis.document;
if (document === undefined) {
    const { JSDOM } = await import("jsdom");
    document = new JSDOM("").window.document;
}

const menuItem = (props = {}) => {
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

const menuContainer = (props = {}) => {
    const { id, title, icon, subMenu } = props;
    const p = document.createElement("p");
    const div = document.createElement("div");
    div.appendChild(p);

    if (id) {
        p.id = id
    }
    if (title) {
        p.textContent = title
    }
    const ul = document.createElement("ul")
    div.appendChild(ul);
    return { div: div, children: [p, ul] }
}

const menuSubContainer = (props = {}) => {
    const { id, title, icon, subMenu } = props;
    const p = document.createElement("p");
    const li = document.createElement("li");
    li.appendChild(p);
    if (id) {
        p.id = id
    }
    if (title) {
        p.textContent = title
    }
    const ul = document.createElement("ul")
    li.appendChild(ul);
    return { li: li, children: [p, ul] }
}



export const Menu = (data) => {
    const { div, children: [_, ul] } = menuContainer();

    const root = Walker.root(
        { subMenu: data, ul: ul },
        { getChildren: (node) => node.subMenu }
    );

    root.walkEach((node, depth) => {
        if (depth === 1) {
            const { ul } = node;
            if (node.subMenu) {
                node.subMenu.forEach(n => n.ul = ul);
            }
            return
        }
        if (node.subMenu) {
            const { li, children: [_, ul] } = menuSubContainer(node)
            node.subMenu.forEach(n => n.ul = ul);
            node.ul.appendChild(li)
        } else {
            const { li } = menuItem(node)
            node.ul.appendChild(li)
        }
    });
    return div;
}