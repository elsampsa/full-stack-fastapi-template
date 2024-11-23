import { Widget, Signal, randomID } from '../lib/base/widget.js';

class LoginFormWidget extends Widget {
    constructor(id) {
        super(id);
        this.createElement();
        this.createState();
    }
    
    createSignals() {
        this.signals.login = new Signal(); /*//DOC Emitted when the login button is clicked. Carries an object with 'email' and 'password' properties. */
    }
    
    createState() {
        if (this.element == null) { 
            return;
        }
        this.email_field.value = '';
        this.password_field.value = '';
    }
    
    createElement() {
        this.element = document.getElementById(this.id);
        if (this.element == null) {
            this.err("could not find element with id", this.id);
            return;
        }

        let logo_id = randomID();
        let email_id = randomID();  
        let password_id = randomID();

        this.element.innerHTML = `
        <div class="text-center mb-4">
            <img id="${logo_id}" alt="FastAPI" class="mb-4" width="120">
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
        </div>
        <div class="form-floating mb-3">
            <input type="email" class="form-control" id="${email_id}" placeholder="name@example.com" required>
            <label for="${email_id}">Email address</label>
        </div>
        <div class="form-floating mb-3">
            <input type="password" class="form-control" id="${password_id}" placeholder="Password" required>
            <label for="${password_id}">Password</label>
        </div>
        <div class="mb-3">
            <a href="#" class="link-secondary float-end">Forgot password?</a>
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        `;
        
        this.logo = this.element.querySelector(`#${logo_id}`);
        this.logo.src = 'fastapi-logo.svg'; // Assumes logo file is in same directory as HTML

        this.email_field = this.element.querySelector(`#${email_id}`);
        this.password_field = this.element.querySelector(`#${password_id}`);
        
        this.login_button = this.element.getElementsByClassName('btn-lg')[0];
        this.login_button.onclick = () => {
            let email = this.email_field.value.trim();
            let password = this.password_field.value;
            if (email && password) {
                this.signals.login.emit({email: email, password: password});
            }
        };
    }
}

export { LoginFormWidget };
