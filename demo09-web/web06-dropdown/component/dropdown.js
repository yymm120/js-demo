/**
<div>
    <input id="input"></input>
    <div id="options">
        <ul>
            <li>
                <p>Group1 Label</p>
                <ul>
                    <li>group1 option 1</li>
                    <li>group1 option 2</li>
                </ul>
            </li>
            <li>no group option 1</li>
            <li>no group option 2</li>
        </ul>
    </div>
</div>
*/
import Walker from "walker-common";
import options from "../mock.json";

const dropdownContainer = () => {
    const dropdown = document.createElement("div");
    const input = document.createElement("input");
    const optionContainer = document.createElement("div");
    const optionMainGroup = document.createElement("ul");
    dropdown.appendChild(input);
    optionContainer.appendChild(optionMainGroup);
    dropdown.appendChild(optionContainer);
    return {dropdown, input, optionContainer, optionMainGroup};
}

export const Dropdown = (options) => {
    const {dropdown, input, optionContainer, optionMainGroup: ul} = dropdownContainer()    
    const root = Walker.root(
        { options: options, ul: ul },
        { getChildren: (node) => node.options },
    );
    root.walkEach((node, depth) => {
        if (depth === 1) {

        }
    })
    return 
};


Dropdown(options)