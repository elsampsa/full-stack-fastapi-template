import { Widget, Signal } from '../lib/base/widget.js';

class ChangePasswordWidget extends Widget {
    constructor(id) {
        super(id);
        this.createElement();
        this.createState();
    }

    createSignals() {
        this.signals.passwordChanged = new Signal(); // Carries the new password
    }

    createState() {
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
        this.newPasswordTimer = null;
    }

    createElement() {
        this.autoElement()
        this.element.innerHTML = `
            <h2>Change Password</h2>
            <div class="mb-3">
                <label for="currentPassword" class="form-label">Current Password</label>
                <input type="password" class="form-control" id="currentPassword">
            </div>
            <div class="mb-3">
                <label for="newPassword" class="form-label">New Password</label>
                <input type="password" class="form-control" id="newPassword">
                <div id="newPasswordFeedback" class="invalid-feedback"></div>
            </div>
            <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm New Password</label>
                <input type="password" class="form-control" id="confirmPassword">
                <div id="confirmPasswordFeedback" class="invalid-feedback"></div>
            </div>
            <button id="saveBtn" class="btn btn-primary" disabled>Save</button>
        `;

        this.currentPasswordInput = this.element.querySelector('#currentPassword');
        this.newPasswordInput = this.element.querySelector('#newPassword');
        this.confirmPasswordInput = this.element.querySelector('#confirmPassword');
        this.newPasswordFeedback = this.element.querySelector('#newPasswordFeedback');
        this.confirmPasswordFeedback = this.element.querySelector('#confirmPasswordFeedback');
        this.saveBtn = this.element.querySelector('#saveBtn');

        this.currentPasswordInput.oninput = () => this.validateInputs();
        this.newPasswordInput.oninput = () => this.handleNewPasswordInput();
        this.confirmPasswordInput.oninput = () => this.validateInputs();
        this.saveBtn.onclick = () => this.savePassword();
    }

    handleNewPasswordInput() {
        clearTimeout(this.newPasswordTimer);
        this.newPasswordTimer = setTimeout(() => {
            this.validateInputs();
        }, 1000); // Wait for 1 second after the user stops typing
    }

    validateInputs() {
        this.currentPassword = this.currentPasswordInput.value;
        this.newPassword = this.newPasswordInput.value;
        this.confirmPassword = this.confirmPasswordInput.value;

        let isValid = true;

        // Validate new password
        if (this.newPassword && !this.isPasswordValid(this.newPassword)) {
            this.newPasswordInput.classList.add('is-invalid');
            this.newPasswordFeedback.textContent = 'Password must be at least 8 characters long and contain a number, special character, and uppercase letter.';
            isValid = false;
        } else {
            this.newPasswordInput.classList.remove('is-invalid');
        }

        // Validate confirm password
        if (this.newPassword !== this.confirmPassword) {
            this.confirmPasswordInput.classList.add('is-invalid');
            this.confirmPasswordFeedback.textContent = 'Passwords do not match.';
            isValid = false;
        } else {
            this.confirmPasswordInput.classList.remove('is-invalid');
        }

        // Enable/disable save button
        this.saveBtn.disabled = !isValid || !this.currentPassword || !this.newPassword || !this.confirmPassword;
    }

    isPasswordValid(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
        return regex.test(password);
    }

    savePassword() {
        if (this.saveBtn.disabled) return;
        this.signals.passwordChanged.emit(this.newPassword);
        this.resetForm();
    }

    resetForm() {
        this.currentPasswordInput.value = '';
        this.newPasswordInput.value = '';
        this.confirmPasswordInput.value = '';
        this.validateInputs();
    }
}

export { ChangePasswordWidget };
