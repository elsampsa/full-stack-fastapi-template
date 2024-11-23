import { Widget, Signal } from '../lib/base/widget.js';

class AppearanceWidget extends Widget {
    constructor(id) {
        super(id);
        this.createElement();
        this.createState();
    }

    createSignals() {
        this.signals.modeChanged = new Signal(); // Carries the selected mode ('light' or 'dark')
    }

    createState() {
        this.currentMode = 'light'; // Default mode
    }

    createElement() {
        this.autoElement();
        this.element.innerHTML = `
            <h2>Appearance</h2>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="appearanceMode" id="lightMode" value="light" checked>
                <label class="form-check-label" for="lightMode">
                    Light mode
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="appearanceMode" id="darkMode" value="dark">
                <label class="form-check-label" for="darkMode">
                    Dark mode
                </label>
            </div>
        `;

        this.lightModeInput = this.element.querySelector('#lightMode');
        this.darkModeInput = this.element.querySelector('#darkMode');

        this.lightModeInput.onchange = () => this.handleModeChange('light');
        this.darkModeInput.onchange = () => this.handleModeChange('dark');
    }

    handleModeChange(mode) {
        if (mode !== this.currentMode) {
            this.currentMode = mode;
            this.signals.modeChanged.emit(this.currentMode);
        }
    }

    // Optional: Method to programmatically set the mode
    setMode(mode) {
        if (mode === 'light') {
            this.lightModeInput.checked = true;
        } else if (mode === 'dark') {
            this.darkModeInput.checked = true;
        }
        this.handleModeChange(mode);
    }
}

export { AppearanceWidget };
