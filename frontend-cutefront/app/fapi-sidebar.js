// this is a template file you can use as a basis to create your own widget
//
// choose import scheme:
import { Signal, randomID } from '../lib/base/widget.js';
import { SidebarMenu } from '../lib/base/sidebarwidget.js';

class FapiSidebar extends SidebarMenu { /*//DOC
    Explain here what your widget does
    */
    constructor(id) {
        super(id); // calls createSignals automagically
        this.createElement();
        this.createState();
    }
    createSignals() { // called automagically by super() in the ctor
        this.signals.some_signal = new Signal(); /*//DOC 
        Explain what this signal carries & when it is emitted
        */
    }
    some_slot(par) { /*//DOC
        Explain what kind of data this slot expects
        and when the slot is used
        */
        // permute state, send signals, do something with the elements
        // call methods that does all those things..
    }
    createElement() {
        super.createElement();
        let uuid = randomID();
        this.container.insertAdjacentHTML('afterbegin',
            `
            <div class="text-center mb-3">
            <a href="/" class="d-inline-block">
                <img id="logo-${uuid}" alt="FastAPI" width="200" class="img-fluid">
            </a>
            </div>
            `
        );
        this.container.insertAdjacentHTML('beforeend',
            `
            <hr>
            <div class="dropdown">
                <div class="text-dark">
                    <strong>Logged in as:</strong>
                    <span id="email-${uuid}" class="d-block mt-2"></span>
                </div>
            </div>
            `
        );
        this.logo = this.element.querySelector(`#logo-${uuid}`);
        this.logo.src = 'fastapi-logo.svg';
        this.userEmailElement = this.element.querySelector(`#email-${uuid}`);
    }

    setUserEmail_slot(email) {
        this.userEmail = email;
        this.userEmailElement.textContent = this.userEmail;
    }

    stateToPar() { 
        /* state is encoded like this:
        0_name1_name2_ etc. i.e. some names of
        all visible elements, separated with "_"
        */
        var s="";
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i]
            var itemName = this.itemNames[i]
            if (item.isVisible()) {
                s=s.concat(`${itemName}_`)
            }
        }
        if (s.length > 0) { // remove trailing _
            s = s.slice(0, -1);
        }
        this.log(-1, "stateToPar", s)
        return s
    }
    validatePar(s) {
        // not a comprehensive check.. check at least it's a string
        this.log(-2, "validatePar", s)
        this.log(-2, "validatePar", typeof s === "string")
        return (typeof s === "string")
    }
    parToState(s) {
        this.log(-1, "parToState", s)
        // hide all
        for (const item of this.items) {
            item.setVisible(false);
        }
        // pick up which ones to show
        var itemNames=s.split("_")
        this.log(-1, "parToState: itemNames:", itemNames);
        this.log(-1, "parToState: this.itemNames:", itemNames);
        for (const itemName of itemNames) {
            const i=this.itemNames.indexOf(itemName)
            if (i>=0) {
                this.items[i].setVisible(true);
            }
            else {
                this.log(-1, "parToState failed with", itemName)
            }
        }
    }
    
} // fapi-sidebar

export { FapiSidebar }
