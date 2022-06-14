import React from "react"
import { connect } from 'react-redux'

import { userService } from '../services/user.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

class _UserProfile extends React.Component {

    state = {
        user: this.props.user
    }

    onHandleChange = ({ target }) => {
        const { value } = target
        let key = target.name
        key === 'fullname'
            ?
            this.setState({ user: { ...this.state.user, fullname: value } })
            :
            this.setState((prevState) => ({
                user: {
                    ...prevState.user,
                    prefs: {
                        ...prevState.user.prefs,
                        [key]: value
                    }
                }
            }))
    }

    onSaveUser = (ev) => {
        ev.preventDefault()
        const userTosave = this.state.user
        userService.save(userTosave)
            .then(savedUser => {
                this.props.dispatch({
                    type: 'SET_USER',
                    user: savedUser
                })
                showSuccessMsg('User saved')
            })
            .catch(err => {
                console.error('Error:', err)
                showErrorMsg('Cannot save user')
            })
    }

    render() {
        const { user } = this.state
        return (
            <section style={{ color: user.prefs.color, backgroundColor: user.prefs.bgColor }}>
                <h2>Profile</h2>
                {user &&
                    <form onSubmit={this.onSaveUser}>
                        <label htmlFor="name">Name</label>
                        <input id="name" name="fullname" type="text" value={user.fullname} onChange={this.onHandleChange} />
                        <label htmlFor="color">Color</label>
                        <input id="color" name="color" type="color" value={user.prefs.color} onChange={this.onHandleChange} />
                        <label htmlFor="bg-color">BG Color</label>
                        <input id="bg-color" name="bgColor" type="color" value={user.prefs.bgColor} onChange={this.onHandleChange} />
                        <button>Save</button>
                    </form>}
            </section>
        )
    }
}

const mapStateToProps = (storeState) => {
    return {
        user: storeState.user,
    }
}

export const UserProfile = connect(
    mapStateToProps,
)(_UserProfile)