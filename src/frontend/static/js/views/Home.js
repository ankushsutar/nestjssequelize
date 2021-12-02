import AbstractView from "./AbstractView.js";

export default class extends AbstractView {

        constructor(){
            super();
            this.setTitle("Home");
        }
        async getHtml() {
            return `
            <h1>Welcome back, Ankush</h1>
            <p>
                This is Home page !
            </p>
            <p>
                    <a href="/users" class='nav__link' data-link>Users</a>.
            </p>


            `;
            


        }
}   