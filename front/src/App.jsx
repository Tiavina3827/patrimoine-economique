import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import info from '../../data/data.json'
const App = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [patrimoineValue, setPatrimoineValue] = useState(null);
    const data = info;

    const calculatePatrimoineValue = () => {
        const possessions = data[1].data.possessions;
        const selectedTime = selectedDate.getTime();

        const value = possessions.reduce((acc, possession) => {
            const dateDebut = new Date(possession.dateDebut).getTime();
            const dateFin = possession.dateFin ? new Date(possession.dateFin).getTime() : null;

            if (selectedTime < dateDebut || (dateFin && selectedTime > dateFin)) {
                return acc;
            }

            let currentValue = possession.valeur;

            if (possession.tauxAmortissement) {
                const amortissementYears = (selectedTime - dateDebut) / (1000 * 60 * 60 * 24 * 365);
                const amortissementAmount = currentValue * (possession.tauxAmortissement / 100) * amortissementYears;
                currentValue = Math.max(0, currentValue - amortissementAmount);
            }

            if (possession.valeurConstante) {
                currentValue += possession.valeurConstante;
            }

            return acc + currentValue;
        }, 0);

        setPatrimoineValue(value);
    };

    return (
        <div className="App">
            <h1>Tableau des Possessions de {data[1].data.possesseur.nom}</h1>
            <table>
                <thead>
                <tr>
                    <th>Libelle</th>
                    <th>Valeur Initiale</th>
                    <th>Date Début</th>
                    <th>Date Fin</th>
                    <th>Amortissement</th>
                    <th>Valeur Actuelle</th>
                </tr>
                </thead>
                <tbody>
                {data[1].data.possessions.map((possession, index) => {
                    const dateDebut = new Date(possession.dateDebut).toLocaleDateString();
                    const dateFin = possession.dateFin ? new Date(possession.dateFin).toLocaleDateString() : 'N/A';
                    let valeurActuelle = possession.valeur;

                    if (possession.tauxAmortissement) {
                        const amortissementYears = (new Date().getTime() - new Date(possession.dateDebut).getTime()) / (1000 * 60 * 60 * 24 * 365);
                        const amortissementAmount = valeurActuelle * (possession.tauxAmortissement / 100) * amortissementYears;
                        valeurActuelle = Math.max(0, valeurActuelle - amortissementAmount);
                    }

                    if (possession.valeurConstante) {
                        valeurActuelle += possession.valeurConstante;
                    }

                    return (
                        <tr key={index}>
                            <td>{possession.libelle}</td>
                            <td>{possession.valeur}</td>
                            <td>{dateDebut}</td>
                            <td>{dateFin}</td>
                            <td>{possession.tauxAmortissement ? `${possession.tauxAmortissement}%` : 'N/A'}</td>
                            <td>{valeurActuelle}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <div>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="yyyy-MM-dd"
                />
                <button onClick={calculatePatrimoineValue}>Valider</button>
            </div>
            {patrimoineValue !== null && (
                <h2>Valeur du patrimoine: {patrimoineValue}</h2>
            )}
        </div>
    );
};

export default App;
