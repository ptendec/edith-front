import React, {useEffect, useState} from 'react';
import classes from './CreateRecord.module.css'
import {Link, useParams} from "react-router-dom"
import {API_URL, FILE_URL} from "../../utils/consts"
import DatePicker from "sassy-datepicker"
import {graphic} from "../../utils/graphic"
import {data} from "autoprefixer"
import {Alert, Snackbar} from "@mui/material"

const CreateRecord = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [isSuccessfullySent, setIsSuccessfullySent] = useState(false)
  const [salon, setSalon] = useState({})
  const [specialists, setSpecialists] = useState([])
  const [chosenSpecialist, setChosenSpecialist] = useState(null)
  const [date, setDate] = useState(new Date())
  const [freeTime, setFreeTime] = useState([])
  const [chosenTime, setChosenTime] = useState(null)
  const [isSpecialistChosen, setIsSpecialistChosen] = useState(null)
  const [isTimeChosen, setIsTimeChosen] = useState(null)
  const params = useParams();
  useEffect(() => {
    fetch(`${API_URL}/client/getSalon/${params.salonId}`, {
      method: 'GET'
    }).then(response => response.json())
      .then(data => {
        setSalon(data)
        setSpecialists(data.specialists)
      })
  }, [])
  useEffect(() => {
    const request = {
      date: date,
      specialistId: chosenSpecialist,
      salonId: params.salonId
    }
    fetch(`${API_URL}/client/getRecords`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify(request)
    }).then(response => response.json())
      .then(data => {
        const busyTime = data
        const filteredArray = graphic.filter(time => busyTime.every(busy => busy.dateId !== time.id))
        setFreeTime(filteredArray)
        setChosenTime(null)
      })
  }, [date, chosenSpecialist])

  const createRecordHandler = () => {
    const request = {
      firstName,
      lastName,
      email,
      phoneNumber,
      salonId: params.salonId,
      specialistId: chosenSpecialist,
      dateId: chosenTime,
      date
    }
    fetch(`${API_URL}/client/createRecord`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify(request)
    }).then(response => {
      if (response.status === 200) {
        setIsSuccessfullySent(true)
        console.log(isSuccessfullySent)
      }
      return response.json()
    })
      .then(data => console.log(data))
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSuccessfullySent(false);
  };

  return (
    <div className={classes.createRecord}>
      <Snackbar open={isSuccessfullySent} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
          Вы успешно записаны
        </Alert>
      </Snackbar>
      <div key={salon.id} className={classes.salon}>
        <img src={`${FILE_URL}${salon.photo}`} alt=""/>
        <p>{salon.name}</p>
        <p>{salon.address}</p>
        <p>{salon.description}</p>
        <p>{salon.phoneNumber}</p>
      </div>
      <div className={classes.createRecordForm}>
        <h2>Выберите мастера</h2>
        <ul role="list" className="-my-5 divide-y divide-gray-200">
          {isSpecialistChosen ? <>
              <h1>Вы выбрали уже специалиста</h1>
              <button onClick={() => setIsSpecialistChosen(false)}>Перевыбрать специалиста</button>
              <br/>
            </>
            :
            specialists.map(specialist => (
              <li key={specialist.id} className="py-4">
                <div className="flex justify-center items-center ">
                  <div className="flex-shrink-0">
                    <img className="h-16 w-16 rounded-full"
                         src={`${FILE_URL}/${specialist.avatar}`}
                         alt=""/>
                    <div>
                      <p
                        className="text-sm font-medium text-gray-900 truncate">{specialist.firstName + ' ' + specialist.lastName}</p>
                      <p className="text-sm text-gray-500 truncate">{specialist.experience.split('  ')[0]}
                        <br/> {specialist.experience.split('  ')[1]}</p>
                    </div>
                  </div>
                  <button value={specialist.id} onClick={(event) => {
                    setChosenSpecialist(event.target.value)
                    setIsSpecialistChosen(true)
                  }}>Выбрать
                  </button>
                </div>
              </li>
            ))}
        </ul>
        <h3>Данные клиента</h3>
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Ваше имя</label>
          <div className="my-3">
            <input value={firstName} onChange={event => setFirstName(event.target.value)} type="text" name="firstName"
                   id="firstName"
                   className="border-2 py-2 px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                   placeholder="Абай"/>
          </div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Ваше фамилия</label>
          <div className="my-3">
            <input value={lastName} onChange={event => setLastName(event.target.value)} type="text" name="lastName"
                   id="lastName"
                   className="border-2 py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                   placeholder="Кайратулы"/>
          </div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Ваше номер телефона</label>
          <div className="my-3">
            <input value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)} type="text"
                   name="phoneNumber" id="phoneNumber"
                   className="border-2 py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                   placeholder="+7 708 116 74 96"/>
          </div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Ваш email</label>
          <div className="my-3">
            <input value={email} onChange={event => setEmail(event.target.value)} type="email" name="email" id="email"
                   className="border-2 py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                   placeholder="you@example.com"/>
          </div>
        </div>
      </div>
      <div className={classes.calendar}>
        <h3>Выберите дату</h3>
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
      </div>
      <div className={classes.freeTime}>
        <h3>Выберите свободное время</h3>
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
              <tr>
                <th scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Время
                </th>
              </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
              {!isTimeChosen ? chosenSpecialist !== null ? freeTime.map(time => (
                    <tr key={time.id}>
                      <td
                        className="whitespace-nowrap py-4 pl-4 pr-3  font-medium text-gray-900 sm:pl-6 font-semibold text-md">{time.start_time + ' - ' + time.end_time}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button value={time.id} onClick={event => {
                          setChosenTime(event.target.value)
                          setIsTimeChosen(true)
                        }}>Выбрать</button>
                      </td>
                    </tr>
                  ))
                  :
                  <tr>
                    <td
                      className="whitespace-nowrap py-4 pl-4 pr-3  font-medium text-gray-900 sm:pl-6 font-semibold text-md">
                      Выберите специалиста
                    </td>
                  </tr>
                :
                <>
                  <h1>Вы выбрали время. Хотите изменить время?</h1>
                  <button onClick={() => setIsTimeChosen(false)}
                          style={{margin: '0 auto', display: 'block', float: 'none'}}>Перевыбрать время
                  </button>
                  <br/>
                </>
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <button onClick={createRecordHandler} className={classes.createRecordBtn}>Записаться</button>
    </div>
  );
};

export default CreateRecord;
