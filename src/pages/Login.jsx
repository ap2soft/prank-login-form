import React from 'react'
import { render } from 'react-dom'

import Button from '../components/Button'

export default class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hasErrors: false,
            name: 'John Smith',
            email: 'john.smith@example.com'
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(e) {
        e.preventDefault()

        await this.randomize()

        this.setState({
            hasErrors: true
        })
    }

    async randomize() {
        let firstName = this.randomItemOf(await this.fetchData('first-names.txt'))
        let lastName = this.randomItemOf(await this.fetchData('last-names.txt'))
        let domain = this.randomItemOf(await this.fetchData('domains.txt'))

        this.setState({
            name: this.capitalize(firstName) + ' ' + this.capitalize(lastName),
            email: firstName + '.' + lastName + '@' + domain,
        })
    }

    async fetchData(filename) {
        return (await fetch(`/data/${filename}`).then(response => response.text()))
            .trim()
            .replace(/\r/g, '')
            .split('\n')
    }

    randomItemOf(array) {
        return array[
            Math.floor(
                Math.random() * array.length
            )
        ]
    }

    capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1)
    }

    render() {
        return (
            <div className="w-full sm:max-w-sm sm:mx-auto bg-white bg-opacity-25 sm:rounded shadow-xl p-10">
                <h1 className="text-white text-2xl font-bold uppercase tracking-wide text-center">Login</h1>

                {this.state.hasErrors &&
                    <div className="mt-4 bg-red-200 bg-opacity-70 text-red-900 leading-tight rounded text-center p-4">
                        You entered <span className="font-semibold">{this.state.name}</span>'s password.
                        Maybe your email is <span className="font-semibold">{this.state.email}</span>?
                    </div>
                }

                <form method="post" onSubmit={this.handleSubmit}>
                    <div className="mt-4">
                        <label htmlFor="email" className="block text-white text-sm">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="mt-1 w-full bg-gray-300 focus:bg-white text-gray-700 border-0 rounded focus:ring-0 transition duration-150 ease-in-out"
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="password" className="block text-white text-sm">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="mt-1 w-full bg-gray-300 focus:bg-white text-gray-700 border-0 rounded focus:ring-0 transition duration-150 ease-in-out"
                            required
                        />
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                        <Button onClick={this.handleSubmit}>Login</Button>
                    </div>
                </form>
            </div>
        )
    }
}
