import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './styles.css'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import { api } from '../../services/api'

export function Profile() {
    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')
    const history = useHistory()
    const [incidents, setIncidents] = useState([])

    useEffect(getIncidents, [ongId])

    function getIncidents() {
        api.get('incidents', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }

    function deleteIncident(id) {
        try {
            api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })
            getIncidents()
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.')
        }
    }
    function handleLogout() {
        localStorage.clear();
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <div className="welcome">
                    <img src={process.env.PUBLIC_URL + '/assets/logo.svg'} alt="Be The Hero" />
                    <span> Bem vinda, {ongName}!</span>
                </div>
                <div className="action-buttons">
                    <Link className="button" to="incidents/new">Cadastrar novo caso</Link>
                    <button className="logout" type="button" onClick={() => handleLogout()}>
                        <FiPower color="#e02041" />
                    </button>
                </div>
            </header>

            <h1> Casos cadastrados</h1>

            <ul className="incidents-list">
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <div className="info">
                            <strong>CASO</strong>
                            <p>{incident.title}</p>
                        </div>
                        <div className="info">
                            <strong>DESCRICAO</strong>
                            <p>{incident.description}</p>
                        </div>
                        <div className="info">
                            <strong>VALOR</strong>
                            <p>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                        </div>
                        <FiTrash2 color="#bababa" onClick={() => deleteIncident(incident.id)} />
                    </li>
                ))}

            </ul>
        </div>

    )
}