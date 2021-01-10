import React from 'react'

import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackBar(props) {
    return (
        <Snackbar open={props.open} autoHideDuration={6000} onClose={props.handlCloseSnackbar}>
            <Alert onClose={props.handlCloseSnackbar} severity={props.severity ? props.severity : "success"}>
                {props.severity === 'success' ? "Added a new item" : "Error Occured"}
            </Alert>
        </Snackbar>
    )
}
