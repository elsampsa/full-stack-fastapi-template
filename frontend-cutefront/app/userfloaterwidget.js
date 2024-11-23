import { Widget, Signal } from '../lib/base/widget.js';

class UserFloaterWidget extends Widget {
    constructor(id) {
        super(id);
        this.createElement();
        this.createState();
    }

    createSignals() {
        this.signals.profileClicked = new Signal();
        this.signals.logoutClicked = new Signal();
    }

    createState() {
        this.isMenuOpen = false;
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.style = "position: fixed; top: 20px; right: 20px; z-index: 1000;";
        document.body.appendChild(this.element);

        this.element.innerHTML = `
            <button class="btn btn-primary rounded-circle" style="width: 50px; height: 50px;">
                <i class="bi bi-person-fill"></i>
            </button>
            <div class="card d-none" style="position: absolute; top: 60px; right: 0; min-width: 200px;">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" id="profile-item" style="cursor: pointer; padding: 10px 15px;">
                        <i class="bi bi-person-circle"></i> My Profile
                    </li>
                    <li class="list-group-item" id="logout-item" style="cursor: pointer; padding: 10px 15px;">
                        <i class="bi bi-box-arrow-right"></i> Logout
                    </li>
                </ul>
            </div>
        `;

        this.button = this.element.querySelector('button');
        this.menu = this.element.querySelector('.card');
        this.profileItem = this.element.querySelector('#profile-item');
        this.logoutItem = this.element.querySelector('#logout-item');

        this.button.onclick = (event) => {
            event.stopPropagation();
            this.toggleMenu();
        };
        this.profileItem.onclick = () => this.profileClicked();
        this.logoutItem.onclick = () => this.logoutClicked();

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!this.element.contains(event.target) && this.isMenuOpen) {
                this.toggleMenu();
            }
        });
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.menu.classList.toggle('d-none', !this.isMenuOpen);
    }

    profileClicked() {
        this.signals.profileClicked.emit();
        this.toggleMenu();
    }

    logoutClicked() {
        this.signals.logoutClicked.emit();
        this.toggleMenu();
    }
}

export { UserFloaterWidget };