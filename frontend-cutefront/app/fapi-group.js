import { Group } from '../lib/base/group.js';

class FAPIGroup extends Group { /*//DOC
    Like Group widget, but serializes different items for state management with names instead of numbers
    */

    createState() {
        super.createState();
        this.itemNames = [];
    }

    setItemNames(...names) { /*//DOC
        Names used in state management serialization
        */
        this.itemNames = names;
        if (this.itemNames.length !== this.items.length) {
            throw new Error("Assertion failed: item names and items must have the same length");
          }
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

}

export { FAPIGroup }
