import './App.css'
import ReactDOM from 'react-dom';

import React, { PureComponent } from 'react'
const domain = 'http://localhost:3001'

export class TransferModal extends PureComponent {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        selectedTeam: '',
        selectedPlayer: '',
        filterPlayers: [],
        money: '',
    };

    componentDidMount() {
        this.setState((state, props) => { 
            return { filterPlayers: props.players }});
    }
    render() {
        const { teams, players } = this.props;
        return (
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-scroll">
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label>Select a team:</label>
                                <select id="team" name="selectedTeam" value={this.state.selectedTeam} onChange={this.handleInputChange}>
                                {teams.map(team => 
                                    <option key={team.id} value={team.id}>{team.name}</option>
                                )}
                                </select>
                                <span>Money: {this.state.money}</span>
                            </div>
                            <div>
                                <label>Select a player:</label>
                                <select id="player" name="selectedPlayer" value={this.state.selectedPlayer} onChange={this.handleInputChange}>
                                {this.state.filterPlayers.map(player => 
                                    <option key={player.id} value={player.id}>{player.name}</option>
                                )}
                                </select>
                            </div>
                            <div className="cancel-button">
                                <button onClick={this.props.toggleModal}>Cancelar</button>
                                <button type="submit">Aceptar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    filterPlayers(team) {
        const players = this.props.players;
        return players.filter(player => player.teamId !== parseInt(team));
    }

    handleInputChange(e) {
        const target= e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        if (name === 'selectedTeam') {
            const filterPlayers = this.filterPlayers(value);
            this.setState((state, props) => { return { filterPlayers, money: props.teams[value - 1].money}})
        }
    }

    handleSubmit(e) {
        event.preventDefault();
        const { selectedPlayer, selectedTeam } = this.state;
        if (selectedPlayer && selectedTeam) {
            const body = {
                playerId: selectedPlayer,
                teamId: selectedTeam,
            }
            fetch(`${domain}/transfer`, {
                method: 'POST',
                body: JSON.stringify(body)
            })
            .then(response => {
                return response.json();
            })
            .then(transaction => {
                alert('El jugador ha sido traspasado con exito!');
            })
            .catch(error => {
                alert(`Error en el traspaso: ${error.message}`);
            });
        } else {
            alert('Selecciona un equipo y un jugador!');
        }
        
    }

}