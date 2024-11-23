import { ListItemWidget, ListWidget } from '../lib/base/listwidget.js'
import { PopupList } from '../lib/base/popuplist.js'
import { Signal, randomID, isDOMElement } from '../lib/base/widget.js';
/* Let's implement the following hierarchy/HIMO diagram

FAPIListWidget(ListWidget)
    UP:
        signals.edit_datum
        signals.delete_datum

    IN:
        menu_slot(obj):
            call FAPIItemPopupList.show_slot using obj.rect coords
            call FAPIItemPopupList.set_datum_slot using obj.datum
        popup_item_slot(obj):
            obj.item: string: delete/edit
            obj.datum: current datum
            emit signals.edit_datum/delete_datum

    FAPIItemPopupList(PopupList)
        UP:
            signals.itemSelected --> connect to FAPIListWidget.popup_item_slot
                carries item: string, datum: obj
            signals.closed
        IN:
            show_slot(x,y)
                show popup at certain xy
            set_datum_slot(datum)
                set the current active datum of the popup list

    FAPIListItemWidget(ListItemWidget)
        UP:
            signals.clicked: carries current datum
            signals.menu_action --> connect to FAPIListWidget.menu_slot
                indicates that three-dot menu-symbol was clicked
                carries rect: rect, datum: datum
    FAPIListItemWidget
        ...
    FAPIListItemWidget
    ...
*/

class FAPIItemPopupList extends PopupList {
}


class FAPIListItemWidget extends ListItemWidget {

    createSignals() {
        this.signals.clicked = new Signal() /*//DOC Emitted when this list item is clicked.  Carries datum UUID.*/
        this.signals.menu_action = new Signal(); /*//DOC Indicates that 3-dot menu was clicked.  Carries:
        {
            rect: rect of the click
            datum: datum of this item
        }
        */
    }

    createElement() {
        this.element = document.createElement("tr");
        this.element.innerHTML = `
            <th scope="row">${this.datum.uuid}</th>
            <td>${this.datum.title}</td>
            <td>${this.datum.description}</td>
            <td> 
                <i class="bi bi-three-dots-vertical" style="cursor: pointer;"></i> 
            </td>
            `
        this.menu = this.element.getElementsByTagName("i").item(0)
        this.menu.onclick = (event) => {
            console.log("menu click");
            this.signals.menu_action.emit({
                rect: event.target.getBoundingClientRect(),
                datum: this.datum
            })
        }
        /*
        this.element.onmouseover = (event) => {
            this.element.classList.add("table-primary");
        }
        this.element.onmouseout = (event) => {
            this.element.classList.remove("table-primary");
        }
        */
    }
}


class FAPIListWidget extends ListWidget {
    listItemClass = FAPIListItemWidget;

    createSignals() {
        this.signals.edit_datum = new Signal(); /*//DOC Carries the datum to be edited.  If nothing chosen, the carries null. */
        this.signals.delete_datum = new Signal(); /*//DOC Carries the datum to be deleted.  If nothing chosen, the carries null. */
    }

    menu_slot(obj) { /*//DOC
        obj:
        {
            datum: the current active datum from ListItemWidget
            rect: the coordinates of the 3-dot menu of that ListItemWidget
        }
        Inform the popup menu where to popup & the current
        target datum
        */
        this.log(-1, "menu_slot")
        this.popup_list.set_datum_slot(obj.datum)
        this.popup_list.show_slot(
            obj.rect.left,
            obj.rect.bottom
        )
    }

    popup_item_slot(obj) { /*//DOC
        obj:
        - item: delete or edit
        - datum: complete datum to be deleted or edited

        Emits either signal delete_datum or edit_datum with the datum
        */
        if (obj.item == "delete") {
            this.signals.delete_datum.emit(obj.datum);
        }
        else if (obj.item == "edit") {
            this.signals.edit_datum.emit(obj.datum);
        }
        else {
            this.log(-1, "popup_item_slot: no such item/action", obj);
        }
    }

    createElement() {
        super.createElement();
        // add the popup menu into the table html
        this.element.insertAdjacentHTML('beforeend', '<div></div>');
        this.popup_div = this.element.lastElementChild;
        this.popup_list = new FAPIItemPopupList(this.popup_div);
        this.popup_list.setItems(["delete","edit"]);
        this.popup_list.signals.itemSelected.connect(
            this.popup_item_slot.bind(this)
        )
    }

    getHeaderHTML() {
        return `
        <tr>
        <th scope="col">ID</th>
        <th scope="col">Title</th>
        <th scope="col">Description</th>
        <th scope="col">Actions</th>
        </tr>
        `
    }

    generateList(datums) {
        // close & remove earlier ListItemWidget(s):
        this.list_items.forEach(item => {
            this.body.removeChild(item.getElement());
            item.close();
        });
        delete this.list_items;
        this.list_items = new Array()
        var cc=0;
        datums.forEach(datum => {
            var item = new this.listItemClass(cc, datum);
            item.signals.clicked.connect(
                this.activate_slot.bind(this)
            );
            item.signals.menu_action.connect(
                this.menu_slot.bind(this)
            );
            this.list_items.push(item);
            this.body.appendChild(item.getElement());
            cc = cc+1;
        }
        )
    }


}

export { FAPIListWidget }

