import React, {useEffect, useState} from 'react';
import classes from './Records.module.css'
import fetchIntercept from "../../utils/fetchIntercept"
import DatePicker from "sassy-datepicker"
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material"
import {graphic} from "../../utils/graphic"
import {Navigate} from "react-router-dom"

const Records = () => {
  const [date, setDate] = useState(new Date())
  const [specialistId, setSpecialistId] = useState(null)
  const [salonId, setSalonId] = useState(null)
  const [salons, setSalons] = useState([])
  const [specialists, setSpecialists] = useState([])
  const [records, setRecords] = useState([])
  const [graphics, setGraphics] = useState(graphic)
  /*  useEffect(() => {
      if (salonId !== null) {
        const request = {
          salonId,
          date
        }
        fetchIntercept(`/client/getSalons`, {
          method: 'POST',
          headers: {
            'Content-Type': 'Application/json'
          },
          body: JSON.stringify(request)
        }).then(({response, data}) => {
          setRecords(data)
        })
      }
    }, [])*/
  useEffect(() => {
    fetchIntercept(`/client/getSalons`, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json'
      }
    }).then(({response, data}) => {
      setSalons(data)
    })
  }, [])
  useEffect(() => {
    if (salonId !== null) {
      fetchIntercept(`/client/getSpecialists/${salonId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'Application/json'
        }
      }).then(({response, data}) => {
        setSpecialists(data)
        console.log(specialists)
      })
    }
  }, [salonId])
  useEffect(() => {

    if (salonId !== null) {
      fetchIntercept(`/admin/getRecords`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify({date, specialistId, salonId}),
      }).then(({response, data}) => {
        setRecords(data)
        console.log(records)
      })
    }
  }, [date, specialistId])
  const cancelRecord = (id) => {
    fetchIntercept(`/admin/cancelRecord`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({id})
    }).then(({response, data}) => {
      if (response.status === 200) setRecords(records.filter(record => record.id !== id));

    })
  }
  return (
    <div className={classes.records}>
      <h1>Выберите дату</h1>
      <DatePicker
        style={{
          width: '100%'
        }}
        minDate={new Date()}
        maxDate={new Date(new Date().getTime() + (86400 * 3 * 1000))}
        onChange={(date) => {
          setDate(date)
        }}
      />
      <br/>
      <InputLabel id="salons-select-autowidth-label">Салоны</InputLabel>
      <Select
        style={{width: '280px'}}
        labelId="salons-select-autowidth-label"
        id="salons-select-autowidth"
        value={salonId}
        onChange={(event) => setSalonId(event.target.value)}
        label="Салоны"
      >
        {salons.map(salon => (
          <MenuItem value={salon.id}>{salon.name}</MenuItem>
        ))}
      </Select>
      <br/>
      <InputLabel id="specialists-select-autowidth-label">Специалисты</InputLabel>
      <Select
        style={{width: '280px'}}
        labelId="specialists-select-autowidth-label"
        id="specialists-select-autowidth"
        value={specialistId}
        onChange={(event) => setSpecialistId(event.target.value)}
        label="Специалисты"
      >
        {salonId !== null ? specialists.map(specialist => (
            <MenuItem value={specialist.id}>{specialist.firstName + ' ' + specialist.lastName}</MenuItem>
          ))
          :
          <MenuItem value={1}>Выберите салон</MenuItem>
        }
      </Select>
      <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
          <tr>
            <th scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Клиент
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Время</th>
          </tr>
          </thead>
          <tbody>
          {records.length !== 0 ? records.map(record => (
              <tr>
                <td className="relative py-4 pl-4 sm:pl-6 pr-3 text-sm">
                  <div className="font-medium text-gray-900">{record.firstName + ' ' + record.lastName}</div>
                  <div className="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
                    <span>{record.phoneNumber}</span></div>
                </td>
                <td className="px-3 py-3.5 text-sm text-gray-500">
                  {graphics[record.dateId].start_time + ' - ' + graphics[record.dateId].end_time}
                </td>
                <td className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-medium">
                  <button type="button"
                          value={record.id}
                          onClick={(event => cancelRecord(event.target.value))}
                          className="bg-indigo-600 inline-flex items-center rounded-md border border-gray-300 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Отменить
                  </button>
                </td>
              </tr>
            ))
            :
            <tr>
              <td className="relative py-4 pl-4 sm:pl-6 pr-3 text-sm">
                Записи отсутствуют
              </td>
            </tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Records;
