import { Button, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import instance from '../../service/instance';
import Select from 'react-select'
import SnackBar from '../Snackbar/SnackBar';

const urlExpenses = 'expenses'
const urlCategories = 'categories'

export default function ExpensesAdd(props) {
    const { date, handleDate, item, handleOnChange } = props
    const [selected, setSelected] = useState('');
    const [option, setOptions] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [severity, setSeverity] = useState('success');

    function handleSubmit() {
        instance.post(urlExpenses, {
            title: item.title,
            category: selected,
            date: date,
            value: item.amount
        }).then(res => {
            console.log(res)
            setSeverity('success')
            setSnackbarOpen(true)
        }).catch(err => {
            setSeverity('error')
            setSnackbarOpen(true)
            console.log(err)
        });
    }

    function handleSelectedCategory(e) {
        setSelected(e.label)
    }

    useEffect(() => {
        async function getOptions() {
            const res = await instance.get(urlCategories)
            const data = res.data.data

            const options = data.map(d => ({
                "value": d.title,
                "label": d.title
            }))

            setOptions(options)
        }
        getOptions();
    }, [])


    return (
        <>
            <form onSubmit={handleSubmit}>
                <Typography variant="h6">Title</Typography>
                <TextField fullWidth id="title" size="small" placeholder='i.e "Internet Bill"' variant="outlined" value={item.title} onChange={handleOnChange} />

                <Typography variant="h6">Category</Typography>
                <Select options={option} onChange={handleSelectedCategory} />

                <Typography variant="h6">Amount</Typography>
                <TextField fullWidth id="amount" size="small" placeholder='i.e "50, 100, 150"' variant="outlined" value={item.amount} onChange={handleOnChange} />

                <Typography variant="h6">Date</Typography>
                <ReactDatePicker selected={date} onChange={handleDate} />

                <Button color="primary" fullWidth variant="contained" onClick={handleSubmit}>
                    Add
                </Button>
            </form>
            <SnackBar open={snackbarOpen} handlCloseSnackbar={() => setSnackbarOpen(false)} severity={severity} />
        </>
    )
}
