import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './styles.css'
import { FiArrowLeft } from 'react-icons/fi'
import { api } from '../../services/api'

export function NewIncident() {
    const history = useHistory()
    const ongId = localStorage.getItem('ongId')
    const [title, setTitle] = useState()
    const [description, setDescripton] = useState()
    const [value, setValue] = useState()

    async function handleSubmit(e) {
        e.preventDefault()
        const data = {
            title,
            description,
            value
        }
        try {
            await api.post('/incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })
            history.push('/profile')
        } catch (err) {
            alert('Ocorreu um erro. Tente novamente')
        }

    }
    return (
        <div className="new-incident-container">
            <div className="content">
                <section className="text">
                    <img src={process.env.PUBLIC_URL + '/assets/logo.svg'} alt="logo" />
                    <h1> Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="profile">  <FiArrowLeft color={'#e02041'} size={16} /> Voltar para home</Link>
                </section>

                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        ea placeholder="Descrição" rows="6"
                        value={description}
                        onChange={e => setDescripton(e.target.value)}
                    />
                    <input
                        placeholder="Valor"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <div className="input-group">
                        <button className="cancel-button" type="reset"> Cancelar</button>
                        <button className="button" type="submit"> Cadastrar</button>
                    </div>

                </form>
            </div>
        </div>

    )
}