import React, { useState } from 'react'
import { FiLogIn } from 'react-icons/fi'
import './styles.css'
import { Link, useHistory } from 'react-router-dom'
import { api } from '../../services/api'


export function Logon() {
    const [id, setId] = useState()
    const history = useHistory()


    async function handleLogin(e) {
        e.preventDefault()

        try {
            const response = await api.post('sessions', { id })
            localStorage.setItem('ongId', response.data.id)
            localStorage.setItem('ongName', response.data.name)
            history.push('/profile')
        } catch (err) {
            alert('Falha no login. Tente novamente.')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={process.env.PUBLIC_URL + '/assets/logo.svg'} alt="Be The Hero" />
                <form onSubmit={handleLogin}>
                    <h1> Faça seu logon</h1>

                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit"> Entrar</button>
                    <Link className="back-link" to="/register">  <FiLogIn color={'#e02041'} size={16} /> Não tenho cadastro </Link>

                </form>
            </section>
            <img src={process.env.PUBLIC_URL + '/assets/heroes.png'} alt="Be The Hero" />
        </div>
    )
}