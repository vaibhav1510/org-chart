const diagram = new dhx.Diagram("diagram", {
    type: "org",
    defaultShapeType: "template"
});

const editor = new dhx.DiagramEditor("editor", {
    type: "org",
    shapeType: "template",
    controls: {
        gridStep: false
    },
});

const template = ({ name, photo, post, phone, mail }) => (`
    <div class="dhx_diagram_template_a_box dhx_diagram_template_a">
        <div class="dhx_diagram_template_a__inside">
            <div class="dhx_diagram_template_a__picture" style="background-image: url(${photo});"></div>
            <div class="dhx_diagram_template_a__body">
                <div class="dhx_diagram_template_a__title">${name}</div>
                <div class="dhx_diagram_template_a__row">
                    <span class="dhx_diagram_template_a__text">${post}</span>
                </div>
                <div class="dhx_diagram_template_a__row">
                    <span class="dhx_diagram_template_a__icon mdi mdi-cellphone-android"></span>
                    <span class="dhx_diagram_template_a__text">${phone}</span>
                </div>
                <div class="dhx_diagram_template_a__row">
                    <span class="dhx_diagram_template_a__icon mdi mdi-email-outline"></span>
                    <span class="dhx_diagram_template_a__text">
                        <a class="dhx_diagram_template_a__link" href="mailto:${mail}" target="_blank">${mail}</a>
                    </span>
                </div>
            </div>
            <div class="toggle_container">
                <img class="template_icon" src="https://snippet.dhtmlx.com/codebase/data/diagram/03/img/menu.svg" alt="toggle"></img>
            </div>
        </div>
    </div>
`);

diagram.addShape("template", {
    template: template,
    defaults: {
        height: 115,
        width: 330
    },
    eventHandlers: {
        onclick: {
            "toggle_container": show,
        }
    },
});

editor.diagram.addShape("template", {
    template: template,
    defaults: {
        name: "Name and First name",
        post: "Position held",
        phone: "(405) 000-00-00",
        mail: "some@mail.com",
        photo: "https://snippet.dhtmlx.com/codebase/data/img/avatars/big_img/big-avatar-1.jpg",

        height: 115, width: 330
    },
  	// The order of the objects in the array defines the order the sidebar options
    // will be displayed in the right panel.
    properties: [
        { type: "position" },
        { type: "size" },
      	// use the "type" attribute together with the "property" one to specify the sidebar option
      	// for editing a custom property
        { type: "text", label: "Name", property: "name" },
        { type: "text", label: "Post", property: "post" },
        { type: "text", label: "Phone", property: "phone" },
        { type: "text", label: "Mail", property: "mail" },
        { type: "img", label: "Photo",  property: "photo" }
    ],
    eventHandlers: {
        onclick: {
            "toggle_container": show,
        }
    },
});

let item;

diagram.events.on("ShapeClick", function (id) {
    item = diagram.data.getItem(id);
});

const contextMenu = new dhx.ContextMenu(null, {
    css: "dhx_widget--bg_gray"
});

contextMenu.data.parse([
    {
        "type": "menuItem",
        "id": "mail",
        "value": "Mail",
        "icon": "mdi mdi-email"
    },
    {
        "type": "menuItem",
        "id": "call",
        "value": "Call",
        "icon": "mdi mdi-phone"
    },
    {
        "type": "menuItem",
        "id": "site",
        "value": "Open Site",
        "icon": "mdi mdi-open-in-new"
    }
]);

contextMenu.events.on("click", function (id) {
    switch (id) {
        case "mail":
            window.open('mailto:' + item.mail + ',_blank');
            break;
        case "call":
            window.open('tel:' + item.phone + ',_blank');
            break;
        case "site":
            window.open('https://dhtmlx.com/docs/products/dhtmlxDiagram/', '_blank');
            break;
    }
});

let toggleItem;

function show(event, shape) {
    console.log(event, shape);
    event.preventDefault();
    contextMenu.showAt(event.target, "bottom");
}

const editorCont = document.querySelector("#editor");
const diagramCont = document.querySelector("#diagram");
const controls = document.querySelector("#control");
const container = document.querySelector("#container");

const WITH_EDITOR = "dhx_sample-container__with-editor";
const WITHOUT_EDITOR = "dhx_sample-container__without-editor";

function expand() {
    diagramCont.style.display = "none";
    controls.style.display = "none";
    editorCont.style.display = "block";
    container.classList.remove(WITHOUT_EDITOR);
    container.classList.add(WITH_EDITOR);
}

function collapse() {
    diagramCont.style.display = "block";
    controls.style.display = "flex";
    editorCont.style.display = "none";
    container.classList.remove(WITH_EDITOR);
    container.classList.add(WITHOUT_EDITOR);
}

function runEditor() {
    expand();
    editor.import(diagram);
}

editor.events.on("ApplyButton", function () {
    collapse();
    diagram.data.parse(editor.serialize());
});

editor.events.on("ResetButton", function () {
    collapse();
});

diagram.data.parse(medCardShape);
