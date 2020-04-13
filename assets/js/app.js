import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route} from "react-router-dom";

// any CSS you import will output into a single css file (app.css in this case)
import '../css/app.css';
import Navbar from "./components/Navbar";
import Homepage from "./pages/HomePage";
import PeoplePage from "./pages/People";
import PeoplePageWithPagination from "./pages/PeopleWithPagination";

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

console.log('Hello Webpack Encore!! Edit me in assets/js/app.js');

const App = () => {
    return (
        <HashRouter>
            <Navbar/>
            <main className="container pt-5">
                <Switch>
                    <Route path="/people" component={PeoplePageWithPagination} />
                    <Route path="/" component={Homepage} />

                </Switch>
            </main>
        </HashRouter>
    )

};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement);
