import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import instance from '../../service/instance';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: 2.5,
    },
}));

const urlCategories = 'categories'

function deleteCategories(data) {
    return () => {
        instance.delete(`${urlCategories}/${data._id}`).then(res => {
            console.log(res);
        });
    };
}

export default function CategoriesDetails(props) {
    const classes = useStyles();

    return (
        props.categoriesData.map((data) => {

            return (
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={10} container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="h5">
                                    {data.title}
                                </Typography>

                                <Typography variant="body2" color="textSecondary">
                                    {data.description}
                                </Typography>
                            </Grid>

                        </Grid>
                        <Grid xs={2} item direction="row" justify="flex-end">
                            <Button onClick={deleteCategories(data)}>
                                Remove
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            )
        })
    )
}




