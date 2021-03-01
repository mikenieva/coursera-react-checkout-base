import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {
    useParams
  } from 'react-router-dom'

import { Line } from 'react-chartjs-2';
  
export default function CurrenciesRates() {

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [date, setDate] = useState({
        startDate: "2020-01-01",
        endDate: "2020-02-28"
    })

    const {currency} = useParams()
    
    useEffect( () => {
        const getRates = async (cur) => {
            const res = await axios.get(`https://api.exchangerate.host/timeseries?start_date=${date.startDate}&end_date=${date.endDate}&base=USD&symbols=${cur}`)
            
            const rates = await res.data.rates
            
            const values = Object.keys(rates).map((e,i) => {
                return rates[e][cur]
            })

            setData({
                labels: Object.keys(rates),
                datasets: [{
                    label: `Un dólar, vale en ${cur}`,
                    data: values,
                    borderColor: "#000a8b",
                    pointBackgroundColor: "#f42534",
                    pointRadius: 7
                }]
            })
            setLoading(false)
        }

        getRates(currency)
    }, [currency, date]) 


    const handleDate = (e) => {
        console.log(e.target.value)
        setDate({
            ...date,
            [e.target.name]: e.target.value
        })
    }

    
    return (
        <div className="w-full">
            <div className="w-80 px-10 pb-10 pt-5">
                <label for="location" className="text-sm font-medium text-gray-700">Escoge una fecha de inicio</label>
                <input 
                    type="date"
                    onChange={(e) => handleDate(e)}
                    value={date.startDate}
                    name="startDate"
                    className="flex-1 block w-full border-2 min-w-0 rounded text-sm border-gray-300"
                />
                <label for="location" className="text-sm font-medium text-gray-700 mt-10">Escoge una fecha de término</label>
                <input 
                    type="date"
                    onChange={(e) => handleDate(e)}
                    value={date.endDate}
                    name="endDate"
                    className="flex-1 block w-full border-2 min-w-0 rounded text-sm border-gray-300"
                />
            </div>
            
            {
                loading ? 
                    <h1>Cargando...</h1> 
                : 
                    <Line data={ data }
                    options={{
                        responsive: true,
                    }}
                />  
            }
            
        </div>
    )
}
