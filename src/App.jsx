import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

import Login from './pages/Login'
import Logo from './components/Logo'

export default function App() {
    return (
        <div className="min-h-screen backrgound flex flex-col sm:justify-center items-center py-6 sm:py-0">
            <Logo className="w-16 h-16 mx-auto text-white mb-6" />

            <Router>
                <Switch>
                    <Route path="/">
                        <Login />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}
