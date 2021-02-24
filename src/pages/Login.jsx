import React from 'react'
import { render } from 'react-dom'

import Button from '../components/Button'

export default class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: null,
            hasErrors: false,
            randomMame: null,
            randomEmail: null,
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async handleSubmit(e) {
        e.preventDefault()

        if (this.state.randomEmail && this.state.randomEmail === this.state.email) {
            location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'

            return
        }

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
            randomName: this.capitalize(firstName) + ' ' + this.capitalize(lastName),
            randomEmail: firstName + '.' + lastName + '@' + domain,
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
                        You entered <span className="font-semibold">{this.state.randomName}</span>'s password.
                        Maybe your email is <span className="font-semibold">{this.state.randomEmail}</span>?
                    </div>
                }

                <form method="post" onSubmit={this.handleSubmit}>
                    <div className="mt-4">
                        <label htmlFor="email" className="block text-white text-sm">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="mt-1 w-full bg-gray-300 focus:bg-white text-gray-700 border-0 rounded focus:ring-0 transition duration-150 ease-in-out"
                            required
                            value={this.state.email}
                            onChange={this.handleInputChange}
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="password" className="block text-white text-sm">Password</label>
                        <input
                            id="password"
                            name="password"
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
