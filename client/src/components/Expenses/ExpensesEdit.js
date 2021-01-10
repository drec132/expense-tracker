import { Button, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import instance from '../../service/instance';
import Select from 'react-select'
import SnackBar from '../Snackbar/SnackBar';

const urlExpenses = 'expenses'

export default function ExpensesEdit(props) {
    const { _id, title, value, } = props.expensesData
    const [selectedCategory, setSelected] = useState('');
    const [option, setOptions] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    function handleSubmit() {
        instance.put(`${urlExpenses}/${_id}`, {
            title: item.title,
            category: selectedCategory,
            date: selectedDate,
            value: item.amount
        }).then(res => {
            console.log(res)
            setSnackbarOpen(true)

        }).catch(err => {
            console.log(err)
        });
    }

    function handleSelectedCategory(e) {
        setSelected(e.label)
    }

    useEffect(() => {
        async function getOptions() {
            const res = await instance.get('categories')
            const data = res.data.data

            const options = data.map(d => ({
                "value": d.title,
                "label": d.title
            }))

            setOptions(options)
        }
        getOptions();
    }, [])

    const [selectedDate, setSelectedDate] = useState(new Date());

    const [item, setItem] = useState({
        title: title,
        category: '',
        amount: value
    })

    const handleOnChange = (event) => {
        setItem(prevItem => ({
            ...prevItem, [event.target.id]: event.target.value
        }))
    }

    const handleDate = date => {
        setSelectedDate(date)
    }


    return (
        <>
            <form >
                <Typography variant="h6">Title</Typography>
                <TextField fullWidth id="title" size="small" placeholder='i.e "Internet Bill"' variant="outlined" value={item.title} onChange={handleOnChange} />

                <Typography variant="h6">Category</Typography>
                <Select options={option} onChange={handleSelectedCategory} />

                <Typography variant="h6">Amount</Typography>
                <TextField fullWidth id="amount" size="small" placeholder='i.e "50, 100, 150"' variant="outlined" value={item.amount} onChange={handleOnChange} />

                <Typography variant="h6">Date</Typography>
                <ReactDatePicker selected={selectedDate} onChange={handleDate} />

                <Button color="primary" fullWidth variant="contained" onClick={handleSubmit}>
                    Edit
                </Button>
                <Button color="red" fullWidth variant="contained" onClick={props.closemodal}>
                    Cancel
                </Button>
            </form>
            <SnackBar open={snackbarOpen} handlCloseSnackbar={() => setSnackbarOpen(false)} />
        </>
    )
}
