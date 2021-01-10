import { Button, TextField, Typography } from '@material-ui/core';
import React, { } from 'react'
import instance from '../../service/instance';

const urlExpenses = 'categories'

export default function CategoriesAdd(props) {
    const { item, handleOnChange } = props
    function handleSubmit() {
        instance.post(urlExpenses, {
            title: item.title,
            description: item.description
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h6">Title</Typography>
            <TextField fullWidth id="title" size="small" placeholder='i.e "Internet, Health"' variant="outlined" value={item.title} onChange={handleOnChange} />

            <Typography variant="h6">Description</Typography>
            <TextField fullWidth id="description" size="small" placeholder='i.e "Payment for..."' variant="outlined" value={item.description} onChange={handleOnChange} />

            <Button color="primary" fullWidth variant="contained" onClick={handleSubmit}>
                Add
            </Button>
        </form>
    )
}
