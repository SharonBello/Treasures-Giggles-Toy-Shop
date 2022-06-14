import React from "react"
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

export class Signup extends React.Component {
    state = {
        credentials: {
            username: '',
            password: '',
            fullname: ''
        },
        isSignup: false,
        isSignupModalOpen: false
    }
    
    clearState = () => {
        const clearTemplate = {
            credentials: {
                username: '',
                password: '',
                fullname: ''
            },
            isSignup: false,
            isSignupModalOpen: false
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

    onSignup = (ev = null) => {
        if (!this.state.credentials.username || !this.state.credentials.password || !this.state.credentials.fullname) return;
        if (ev) ev.preventDefault();
        this.props.onSignup(this.state.credentials);
        this.clearState()
    }

    handleOpenSignupDialog = () => {
        this.setState({ isSignupModalOpen: true })
    }

    onHandleCloseSignUpDialog = (ev) => {
        ev.preventDefault()
        this.setState({ isSignupModalOpen: false })
    }
    
    render() {
        const { username, password, fullname } = this.state.credentials;
        const { isSignup } = this.state;
        return (
        <div className="signup-page">
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
                    <Button onSubmit={this.onSignup} type="submit" variant="contained" color="primary" onClick={this.props.onHandleCloseDialog}>
                        Signup
                    </Button>
                    <Button variant="contained" onClick={this.props.onHandleCloseDialog}>
                        Cancel
                    </Button>
                </div>
            </form>}
        </div>
        )
    }
}


// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// function Copyright(props) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Copyright © '}
//             <Link color="inherit" href="https://mui.com/">
//                 Your Website
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

// const theme = createTheme();

// export default function SignUp() {
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const data = new FormData(event.currentTarget);
//         console.log({
//             email: data.get('email'),
//             password: data.get('password'),
//         });
//     };

//     return (
//         <ThemeProvider theme={theme}>
//             <Container component="main" maxWidth="xs">
//                 <CssBaseline />
//                 <Box
//                     sx={{
//                         marginTop: 8,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                     }}
//                 >
//                     <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//                         <LockOutlinedIcon />
//                     </Avatar>
//                     <Typography component="h1" variant="h5">
//                         Sign up
//                     </Typography>
//                     <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//                         <Grid container spacing={2}>
//                             <Grid item xs={12} sm={6}>
//                                 <TextField
//                                     autoComplete="given-name"
//                                     name="firstName"
//                                     required
//                                     fullWidth
//                                     id="firstName"
//                                     label="First Name"
//                                     autoFocus
//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                                 <TextField
//                                     required
//                                     fullWidth
//                                     id="lastName"
//                                     label="Last Name"
//                                     name="lastName"
//                                     autoComplete="family-name"
//                                 />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <TextField
//                                     required
//                                     fullWidth
//                                     id="email"
//                                     label="Email Address"
//                                     name="email"
//                                     autoComplete="email"
//                                 />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <TextField
//                                     required
//                                     fullWidth
//                                     name="password"
//                                     label="Password"
//                                     type="password"
//                                     id="password"
//                                     autoComplete="new-password"
//                                 />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <FormControlLabel
//                                     control={<Checkbox value="allowExtraEmails" color="primary" />}
//                                     label="I want to receive inspiration, marketing promotions and updates via email."
//                                 />
//                             </Grid>
//                         </Grid>
//                         <Button
//                             type="submit"
//                             fullWidth
//                             variant="contained"
//                             sx={{ mt: 3, mb: 2 }}
//                         >
//                             Sign Up
//                         </Button>
//                         <Grid container justifyContent="flex-end">
//                             <Grid item>
//                                 <Link href="#" variant="body2">
//                                     Already have an account? Sign in
//                                 </Link>
//                             </Grid>
//                         </Grid>
//                     </Box>
//                 </Box>
//                 <Copyright sx={{ mt: 5 }} />
//             </Container>
//         </ThemeProvider>
//     );
// }