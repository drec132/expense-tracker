import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { authorizationService } from '../../service/authorization.service'
import { Link, NavLink, useRouteMatch } from 'react-router-dom'
import { fade, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 550,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: '20ch',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        marginRight: '25px'
    },
    sectionDesktop: {
        display: 'flex',
    },
}))


export default function MenuAppBar(props) {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null)

    const isMenuOpen = Boolean(anchorEl)

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const menuId = 'primary-search-account-menu'
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                <AccountCircle />
                <Typography variant={'caption'}>{''}</Typography>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem
                onClick={handleMenuClose}
                to={'/login'}
                component={NavLink}
            >
                Logout
      </MenuItem>
        </Menu>
    )
    const matchLogin = useRouteMatch(["/expenses", "/categories", "/reports"]);

    return (
        <div className={classes.grow}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography className={classes.title} variant='h4' noWrap>
                        Expenses Tracker
                    </Typography>

                    {matchLogin ? (matchLogin.isExact && <>
                        <Link to="categories" >
                            <Typography style={{ margin: 10, color: 'white' }} variant="h5">
                                Category
                            </Typography>
                        </Link>
                        <Link to="expenses">
                            <Typography style={{ margin: 10, color: 'white' }} variant="h5">
                                Expenses
                            </Typography>
                        </Link>
                        <Link to="reports">
                            <Typography style={{ margin: 10, color: 'white' }} variant="h5">
                                Reports
                            </Typography>
                        </Link>

                        <div className={classes.grow} />

                        <div className={classes.sectionDesktop}>
                            <Typography value={props.email} />
                            <IconButton
                                edge='end'
                                aria-label='account of current user'
                                aria-controls={menuId}
                                aria-haspopup='true'
                                onClick={handleProfileMenuOpen}
                                color='inherit'
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                    </>) : <> </>}


                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    )
}
