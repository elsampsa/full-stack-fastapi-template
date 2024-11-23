import { Widget, Signal, randomID } from '../lib/base/widget.js';
import { TabWidget } from '../lib/base/tabwidget.js';
import { FAPIListWidget } from './fapi-listwidget.js'
import { FAPIUserInfoWidget } from './userinfowidget.js'
import { ChangePasswordWidget } from './changepassword.js'
import { AppearanceWidget } from './appearancewidget.js'
import { FormWidget } from '../lib/base/formwidget.js';

class HomeWidget extends Widget {
    constructor() {
        super(null); // Creates floating element
        this.createElement();
        this.createState();
    }
    createSignals() {}
    createState() {}
    createElement() {
        this.autoElement();
        const uuid = randomID();
        this.element.id = uuid;
        this.element.innerHTML = `
            <h2>Home</h2>
            <p>Welcome to the home page.</p>
        `;
    }
}

class ItemsWidget extends Widget {
    constructor() {
        super(null);
        this.createElement();
        this.createState();
    }
    createSignals() {}
    createState() {}
    createElement() {
        this.autoElement();
        const uuid = randomID();
        const table_uuid = randomID();
        const button_uuid = randomID();
        this.element.innerHTML = `
            <h2>Items</h2>
            <p>This is the items page.</p>
            <button id="${button_uuid}" class="btn btn-primary mb-3">
                <i class="fas fa-plus"></i> Add Item
            </button>
            <table id="${table_uuid}" class="table table-striped"></table>
        `;
        // Get references
        const table_element = this.element.querySelector(`#${table_uuid}`);
        this.add_button = this.element.querySelector(`#${button_uuid}`);

        // mock data
        var data = [
            {
                "uuid": "123456",
                "title": "title 1",
                "description": "stuff 1",
            },
            {
                "uuid": "223456",
                "title": "title 2",
                "description": "stuff 2",
            }
        ];
        
        this.fapiList = new FAPIListWidget(table_element);
        this.fapiList.datums_slot(data);
        this.form = new FormWidget(randomID(), "Add Item");

        // Add click handler
        this.add_button.onclick = () => {
            this.form.create_slot()
        };
     }
}

/*TODO

Separate widget for each tab

SettingsWidget should inherit TabWidget ..
.. let's write TabWidget accordingly
*/
class SettingsWidget extends Widget {
    constructor() {
        super(null);
        this.createElement();
        this.createState();
    }
    createSignals() {}
    createState() {}
    createElement() {
        this.autoElement();
        const tab_uuid = randomID();
        this.element.innerHTML = `
            <h2>Settings</h2>
            <p>Adjust your settings here.</p>
            <div id="${tab_uuid}"></div>
        `;
    const tab_element = this.element.querySelector(`#${tab_uuid}`);
    this.tabWidget = new TabWidget(tab_element);
    
    this.userInfoWidget = new FAPIUserInfoWidget(null);
    this.passwordWidget = new ChangePasswordWidget(null);
    this.appearanceWidget = new AppearanceWidget(null);

    this.tabWidget.setItems(
        [this.userInfoWidget, "User"],
        [this.passwordWidget, "Password"],
        [this.appearanceWidget, "Appearance"]
    );

    this.tabWidget.show_slot(this.userInfoWidget);
    }
};

class AdminWidget extends Widget {
    constructor() {
        super(null);
        this.createElement();
        this.createState();
    }
    createSignals() {}
    createState() {}
    createElement() {
        this.autoElement();
        const uuid = randomID();
        this.element.id = uuid;
        this.element.innerHTML = `
            <h2>Admin</h2>
            <p>Admin controls and information.</p>
        `;
    }
}

export { HomeWidget, ItemsWidget, SettingsWidget, AdminWidget };
