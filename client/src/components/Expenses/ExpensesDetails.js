import { Button, Grid, makeStyles, Modal, Paper, Typography } from '@material-ui/core'
import { useState } from 'react';
import instance from '../../service/instance';
import ExpensesEdit from './ExpensesEdit';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: 2.5,
    },
    modal: {
        backgroundColor: 'rgba(52, 52, 52, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    modalPaper: {
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


export default function ExpensesDetails(props) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});

    const handleCloseEditModal = () => setOpen(false);

    const body = (
        <div className={classes.modalPaper}>
            <ExpensesEdit expensesData={data} closemodal={handleCloseEditModal} />
        </div>
    );

    return (
        props.expensesData.map((data) => {
            return (
                <>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item xs={5} container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="h5">
                                        {data.title}
                                    </Typography>

                                    <Typography variant="body2" color="textSecondary">
                                        {data.category ? data.category : "Uncategorized"}
                                    </Typography>
                                </Grid>

                            </Grid>
                            <Grid xs={3} item>
                                <Typography variant="h6"> {new Date(data.date).toDateString()}</Typography>
                            </Grid>
                            <Grid xs item>
                                <Typography variant="h5">PHP {data.value}</Typography>
                            </Grid>
                            <Grid xs={2} item container direction="row" justify="flex-end">
                                <Grid item xs>
                                    <Button fullWidth color="primary" variant='contained' onClick={() => {
                                        setOpen(true)
                                        console.log(data)
                                        setData(data)
                                    }}>
                                        Edit
                                </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button fullWidth color="secondary" variant='contained' onClick={() => {
                                        instance.delete(`expenses/${data._id}`).then(res => {
                                            console.log(res)
                                        });
                                    }}>
                                        Remove
                                </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Modal
                        className={classes.modal}
                        open={open}
                        onClose={handleCloseEditModal}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        {body}
                    </Modal>
                </>
            )
        })
    )
}


