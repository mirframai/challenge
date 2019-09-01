import './App.css'
import ReactDOM from 'react-dom';

import React, { PureComponent } from 'react'
const domain = 'http://localhost:3001'

export class Modal extends PureComponent {

    render() {
        const { pichichis } = this.props;

        return (
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th>Player Name</th>
                                    <th>Goals</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pichichis.map(pichichi => 
                                <tr key={pichichi.playerId}>
                                    <td>{pichichi.name}</td>
                                    <td>{pichichi.goals}</td>
                                </tr>
                                )}
                            </tbody>                            
                        </table>
                    </div>
                    <div className="cancel-button">
                        <button onClick={this.props.toggleModal}>Cancelar</button>
                    </div>
                </div>
            </div>
        )
    }
}