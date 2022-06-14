import React from "react"
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'


export class LoginSignup extends React.Component {
    state = {
        credentials: {
            username: '',
            password: '',
            fullname: ''
        },
        isSignup: false,
        // isSignupModalOpen: false
    }

    clearState = () => {
        const clearTemplate = {
            credentials: {
                username: '',
                password: '',
                fullname: ''
            },
            isSignup: false,
            // isSignupModalOpen: false
        }
        this.setState({ clearTemplate })
    }

    handleChange = (ev, fieldName) => {
        const value = ev.target.value;
        if (fieldName === 'username') {
            this.setState({ credentials: { ...this.state.credentials, username: value } });
        } else if (fieldName === 'password') {
            this.setState({ credentials: { ...this.state.credentials, password: value } });
        }
    }

    onLogin = (ev = null) => {
        if (!this.state.credentials.username || !this.state.credentials.password) return;
        if (ev) ev.preventDefault();
        this.props.onLogin(this.state.credentials);

        this.clearState()
        this.props.onCloseModal(ev)
    }

    // onSignup = (ev = null) => {
    //     if (!this.state.credentials.username || !this.state.credentials.password || !this.state.credentials.fullname) return;
    //     if (ev) ev.preventDefault();
    //     this.props.onSignup(this.state.credentials);
    //     this.clearState()
    // }

    // handleOpenSignupDialog = () => {
    //     this.setState({ isSignupModalOpen: true })
    // }

    // onHandleCloseSignUpDialog = (ev) => {
    //     ev.preventDefault()
    //     this.setState({ isSignupModalOpen: false })
    // }

    // renderSignupModal = () => {
    //     if (this.state.isSignupModalOpen) {
    //         return (
    //             <Dialog onClose={this.onHandleCloseSignUpDialog} open={true} >{this.renderSignup()}
    //             </Dialog>
    //         )
    //     }
    // }

    render() {
        const { username, password, fullname } = this.state.credentials;
        const { isSignup } = this.state;
        return (
            <div className="login-page">
                {!isSignup && <form>
                    <TextField
                        label="username"
                        variant="filled"
                        required
                        value={username}
                        onChange={(ev) => this.handleChange(ev, 'username')}
                    />
                    <TextField
                        label="Password"
                        variant="filled"
                        type="password"
                        required
                        value={password}
                        onChange={(ev) => this.handleChange(ev, 'password')}
                    />
                    <div>
                        <Button onClick={this.onLogin} type="submit" variant="contained" color="primary" >
                            SignIn
                        </Button>
                        <Button variant="contained">Cancel</Button>
                    </div>
                </form>}
                <div className="signup-section">
                    {isSignup && <form>
                        <TextField
                            label="fullname"
                            variant="filled"
                            required
                            value={fullname}
                            onChange={(ev) => this.handleChange(ev)}
                        />
                        <TextField
                            label="username"
                            variant="filled"
                            required
                            value={username}
                            onChange={(ev) => this.handleChange(ev)}
                        />
                        <TextField
                            label="Password"
                            variant="filled"
                            type="password"
                            required
                            value={password}
                            onChange={(ev) => this.handleChange(ev)}
                        />
                        <div>
                            <Button onClick={this.onSignup} type="submit" variant="contained" color="primary">
                                Signup
                            </Button>
                            <Button variant="contained" >
                                Cancel
                            </Button>
                        </div>
                    </form>}
                </div>
            </div>
        )
    }
}
