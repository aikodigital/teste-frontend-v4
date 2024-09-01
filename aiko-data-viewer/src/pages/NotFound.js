import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import errorRobot from '../assets/icons/error-robot.svg'

import s from './NotFound.module.css'

export function NotFound() {
  const navigate = useNavigate()

  function goToHomePage() {
    navigate(ROUTES.HOME)
  }

  return (
    <div className={s.notFound}>
      <div className={s.container}>
        <div className={s.imageWrapper}>
          <p className={s.errorCode}>404</p>
          <img
            src={errorRobot}
            alt='Uma ilustração de um robô com expressão triste e um sinal de alerta, indicando que ocorreu um erro'
            className={s.errorRobot}
          />
        </div>
        <div className={s.errorText}>
          <p className={s.ops}>Ooops...</p>
          <p>
            Parece que a página que você estava procurando, está indisponível ou não pode ser
            encontrada
          </p>
        </div>
        <button onClick={goToHomePage}>Voltar a tela inicial</button>
      </div>
    </div>
  )
}
