import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import './style.css';

export default function Profile () {

    const history = useHistory();

    const [incidents, setIncidents] = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
            console.log(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (error) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogOut() {
        localStorage.clear();
        history.push('/')
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Heroo"/>
                <span>Bem vinda, { ongName }</span>
                <Link className="button" to="incidents/new">
                    Cadastrar novo caso
                </Link>
                <button onClick={handleLogOut}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <h1>Casos Cadastrados</h1>

            <ul>

                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>Descrição:</strong>
                        <p>{incident.description}</p>
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#A8A8B3" />
                        </button>
                    </li>
                ))}
                

            </ul>
        </div>
    )
}