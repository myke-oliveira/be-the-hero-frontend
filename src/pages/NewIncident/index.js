import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft} from 'react-icons/fi'

import api from '../../services/api'

import LogoImg from '../../assets/logo.svg'

import './style.css';

export default function NewIncident() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        };

        console.log(data)

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization:  ongId,
                }
            });
            history.push('/profile');
        } catch (error) {
            console.log('Não foi possível criar novo caso, tente novamente mais tarde.')
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={LogoImg} alt="Be The Hero"/>
                    <h1>Cadastrar Novo Caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>

                </section>

                <form onSubmit={handleNewIncident} action="">
                <input type="text"
                        placeholder="Título do Caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição do Caso"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input type="text"
                        placeholder="Valor Em Reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}