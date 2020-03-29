import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import './styles.css'
import { api } from '../../services/api'


export function Register() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [whatsapp, setWhatsapp] = useState()
    const [city, setCity] = useState()
    const [uf, setuf] = useState()
    const history = useHistory()

    async function handleRegister(e) {
        e.preventDefault()
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }
        try {
            const response = await api.post('/ongs', data)
            alert(`Seu ID de acesso ${response.data.id}`)
        } catch (err) {
            alert('Ocorreu um erro. Tente novamente')
        }
        history.push('/')
    }


    return (
        <div className="register-container">
            <div className="content">
                <section className="text">
                    <img src={process.env.PUBLIC_URL + '/assets/logo.svg'} alt="logo" />
                    <h1> Cadastro</h1>
                    <p>Faça cadastro, entre na plataforma e ajuda pessoas a encontrarem os casos da sua ONG</p>
                    <Link className="back-link" to="login">  <FiArrowLeft color={'#e02041'} size={16} /> Já tenho cadastro</Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <input
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input
                            placeholder="UF"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setuf(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit"> Cadastrar</button>
                </form>
            </div>
        </div>
    )
}