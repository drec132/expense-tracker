import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows'
import { Avatar } from '@material-ui/core'
import { green } from '@material-ui/core/colors'

import { authorizationService } from '../../service/authorization.service'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { useHistory } from 'react-router-dom'
import SnackBar from '../Snackbar/SnackBar'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        marginTop: theme.spacing(0),
        color: '#fff',
        backgroundColor: green[500],
    },
    form: {
        width: '100%', // Fix IE 11 issues
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

function Login(props) {
    let history = useHistory();
    const pageStyle = useStyles()
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [severity, setSeverity] = useState('success');

    const [state, setState] = useState({
        email: '',
        password: '',
    })

    const handleFieldChange = (event) => {
        const { id, value } = event.target
        setState((prevState) => ({
            ...prevState,
            [id]: value,
        }))
    }

    const handleSubmitClick = (event) => {
        event.preventDefault()
        const responseData = authorizationService.login(state.email, state.password);
        console.log(responseData)

        responseData.then((result, err) => {
            if (result.status === 500) {
                setSeverity("error")
                setSnackbarOpen(true)
            } else {
                setSeverity("success")
                setSnackbarOpen(true);

                setTimeout(() => {
                    history.push('/expenses')
                }, 1000)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <Container component='main' maxWidth='xs'>
            <div className={pageStyle.paper}>
                <Avatar variant='rounded' className={pageStyle.avatar}>
                    <DesktopWindowsIcon />
                </Avatar>
                <Typography align='center' component='h5' variant='h5'>
                    Sign-in
                </Typography>
                <ValidatorForm
                    className={pageStyle.form}
                    onSubmit={handleSubmitClick}
                    onError={(errors) => console.log(errors)}
                >
                    <TextValidator
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                        autoFocus
                        value={state.email}
                        onChange={handleFieldChange}
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'email is not valid']}
                    />
                    <TextValidator
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='password'
                        label='Password'
                        name='password'
                        type='password'
                        autoComplete='current-password'
                        value={state.password}
                        onChange={handleFieldChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value='remember' color='primary' />}
                        label='Remember Me'
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={pageStyle.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href='#' variant='body2'>
                                Forgot password?
                        </Link>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            </div>
            <SnackBar open={snackbarOpen} handlCloseSnackbar={() => setSnackbarOpen(false)} severity={severity} />
        </Container>
    )
}

export default Login
