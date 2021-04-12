import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { providerFacebook,firebase } from './Firebase/config';

//screens
import Home from './Auth/Home';
import Profile from './Auth/Profile';
import SignInOrUp from './Auth/SignInOrUp';
import SignUp from './Auth/SignUp';
import Auth from './Auth/Auth';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/signin" component={SignInOrUp} />
                    <Route exact path="/signup" component={SignUp} />
                    {/* 以下認証のみ */}
                    <Auth>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/profile" component={Profile} />
                            <Route render={() => <p>not found.</p>} />
                        </Switch>
                    </Auth>
                </Switch>
            </Router>
        );
    }
}

export default App;