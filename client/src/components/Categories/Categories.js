import { Grid, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import instance from '../../service/instance';
import CategoriesAdd from './CategoriesAdd'
import "react-datepicker/dist/react-datepicker.css";
import CategoriesDetails from './CategoriesDetails';

export default function Categories() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        async function getExpenses() {
            const res = await instance.get("categories");
            const data = res.data.data
            setCategories(data);
        }
        getExpenses();
    }, [categories])


    const [item, setItem] = useState({
        title: '',
        description: '',
    })

    const handleOnChange = (event) => {
        setItem(prevItem => ({
            ...prevItem, [event.target.id]: event.target.value
        }))
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs >
                <CategoriesAdd item={item} handleOnChange={handleOnChange} />
            </Grid>
            <Grid item xs={9} >
                <Paper style={{ maxHeight: 600, overflow: 'auto' }}>
                    <CategoriesDetails categoriesData={categories} />
                </Paper>

            </Grid>
        </Grid>
    )
}