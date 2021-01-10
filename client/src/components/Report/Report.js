import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import instance from '../../service/instance'


const urlExpenses = 'expenses'
export default function Report() {
    const [expenses, setExpenses] = useState([]);
    const [category, setCategory] = useState([]);

    async function getData() {
        return await instance.get(urlExpenses).then(res => {
            const resData = res.data.data;
            resData.map(d => {
                setExpenses(prevState => ([
                    ...prevState,
                    {
                        value: d.value,
                        category: d.category,
                        date: new Date(d.date)
                    }
                ]))
                // const value = d.value
                setCategory((prevCategory, props) => ({
                    ...prevCategory,
                    [d.category ? d.category : 'Uncategorized']: ''
                }))
                // return console.log();

            })
        })
    }

    useEffect(() => {
        getData();
    }, [])

    const data = {
        labels: expenses.map(d => { return d.category ? d.category : "Uncategorized" }),
        datasets: [
            {
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: expenses.map(d => { return d.value })
            }
        ]
    };

    return (
        <div>
            <Typography variant="h4"> Monthly Expenses </Typography>
            <Bar
                data={data}
                width={100}
                height={500}
                options={{
                    maintainAspectRatio: false
                }}
            />
        </div>
    )
}
