import React, {useEffect, useState} from 'react';
import classes from './Main.module.css'
import {API_URL, FILE_URL} from "../../utils/consts"
import arrowDown from '../../assets/images/down-arrow-svgrepo-com.svg'
import {Link} from "react-router-dom"

const Main = () => {
  const [salons, setSalons] = useState([])
  useEffect(() => {
    fetch(`${API_URL}/client/getSalons`, {
      method: 'GET'
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        setSalons(data)
      })
  }, [])
  return (
    <div className={classes.main}>
      <div className={classes.wrapper}>
        <h1>Сервис по записи в салоны красоты, барбершопы</h1>
        <p>Пролистните и выберите себе салон для записи</p>
        <img src={arrowDown} alt=""/>
      </div>
      <div className={classes.salons}>
        {salons.map(salon => (
          <div key={salon.id} className={classes.salon}>
            <Link to={`/client/createRecord/${salon.id}`}>
              <img src={`${FILE_URL}${salon.photo}`} alt=""/>
              <p>{salon.name}</p>
              <p>{salon.address}</p>
              <p>{salon.description}</p>
              <p>{salon.phoneNumber}</p>
              <Link to={`/client/createRecord/${salon.id}`}><span>Записаться</span></Link>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
