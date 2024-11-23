import { Widget, Signal } from '../lib/base/widget.js';

class FAPIUserInfoWidget extends Widget {
    constructor(id) {
        super(id);
        this.createElement();
        this.createState();
    }

    createSignals() {
        this.signals.save = new Signal(); // Carries an object with name and email
    }

    set_datum_slot(datum) {
        this.uuid = datum.uuid;
        this.nameInput.value = datum.name;
        this.emailInput.value = datum.email;
        this.updateDisplay();
    }

    createState() {
        this.isEditing = false;
        this.datum = null;
        this.originalName = '';
        this.originalEmail = '';
    }

    createElement() {
        this.autoElement();
        this.element.innerHTML = `
            <h2>User Information</h2>
            <div class="mb-3">
                <label for="fullName" class="form-label">Full name</label>
                <input type="text" class="form-control" id="fullName" readonly>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" readonly>
            </div>
            <button id="editBtn" class="btn btn-primary">Edit</button>
            <button id="saveBtn" class="btn btn-success d-none" disabled>Save</button>
            <button id="cancelBtn" class="btn btn-secondary d-none">Cancel</button>
        `;

        this.nameInput = this.element.querySelector('#fullName');
        this.emailInput = this.element.querySelector('#email');
        this.editBtn = this.element.querySelector('#editBtn');
        this.saveBtn = this.element.querySelector('#saveBtn');
        this.cancelBtn = this.element.querySelector('#cancelBtn');

        this.editBtn.onclick = () => this.startEditing();
        this.saveBtn.onclick = () => this.save();
        this.cancelBtn.onclick = () => this.cancel();

        this.nameInput.oninput = () => this.checkChanges();
        this.emailInput.oninput = () => this.checkChanges();
    }

    startEditing() {
        this.isEditing = true;
        this.originalName = this.nameInput.value;
        this.originalEmail = this.emailInput.value;
        this.updateDisplay();
    }

    save() {
        this.isEditing = false;
        this.updateDisplay();
        this.signals.save.emit({
            uuid: this.uuid,
            name: this.nameInput.value,
            email: this.emailInput.value
        });
    }

    cancel() {
        this.isEditing = false;
        this.nameInput.value = this.originalName;
        this.emailInput.value = this.originalEmail;
        this.updateDisplay();
    }

    checkChanges() {
        const hasChanges = this.nameInput.value !== this.originalName || 
                           this.emailInput.value !== this.originalEmail;
        this.saveBtn.disabled = !hasChanges;
    }

    updateDisplay() {
        this.nameInput.readOnly = !this.isEditing;
        this.emailInput.readOnly = !this.isEditing;
        this.editBtn.classList.toggle('d-none', this.isEditing);
        this.saveBtn.classList.toggle('d-none', !this.isEditing);
        this.cancelBtn.classList.toggle('d-none', !this.isEditing);
    }
}

export { FAPIUserInfoWidget };
