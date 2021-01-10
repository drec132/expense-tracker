import { Grid, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import instance from '../../service/instance';
import ExpensesDetails from './ExpensesDetails';
import ExpensesAdd from './ExpensesAdd';
import "react-datepicker/dist/react-datepicker.css";


const urlExpenses = 'expenses'

export default function Expenses() {
    const [expenses, setExpenses] = useState([])

    useEffect(() => {
        async function getExpenses() {
            const res = await instance.get(urlExpenses);
            const data = res.data.data
            setExpenses(data);
        }
        getExpenses();
    }, [expenses])

    const [selectedDate, setSelectedDate] = useState(new Date());

    const [item, setItem] = useState({
        title: '',
        category: '',
        amount: ''
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
            <Grid container spacing={2}>
                <Grid item xs >
                    <ExpensesAdd item={item} date={selectedDate} handleDate={handleDate} handleOnChange={handleOnChange} />
                </Grid>
                <Grid item xs={9} >
                    <Paper style={{ maxHeight: 600, overflow: 'auto' }}>
                        <ExpensesDetails expensesData={expenses} />
                    </Paper>
                </Grid>
            </Grid >
        </>
    )
}