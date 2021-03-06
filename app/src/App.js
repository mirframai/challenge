import reactSvg from './react.svg'
import './App.css'

import React, { PureComponent } from 'react'
import { Modal } from './Modal';
import { TransferModal } from './TransferModal';
const domain = 'http://localhost:3001'

class App extends PureComponent {

  constructor(props) {
    super(props);
    this.toggleModalVisibility = this.toggleModalVisibility.bind(this);
    this.getPichichisName = this.getPichichisName.bind(this);
    this.order = this.order.bind(this);
    this.toggleTransferModal = this.toggleTransferModal.bind(this);
    this.toggleModalTransferVisibility = this.toggleModalTransferVisibility.bind(this);
  }
  state = {
    teams: [],
    players: [],
    pichichis: [],
    isModalVisible: false,
    isTransferModalVisible: false,
  }

  componentDidMount() {
    fetch(`${domain}/players`)
      .then(response => {
        return response.json();
      })
      .then(players => {
          this.setState({ players: players.players });
      });

    fetch(`${domain}/teams`)
      .then(response => {
        return response.json();
      })
      .then(teams => {
        this.setState({ teams })
      });

    fetch(`${domain}/pichichis`)
      .then(response => {
        return response.json();
      })
      .then(pichichis => {
        this.getPichichisName(pichichis);        
      });
  }

  render() {
    const { teams, players, isModalVisible, pichichis, isTransferModalVisible } = this.state;
    let modal, transferModal;
    if (isModalVisible) {
      modal = <Modal toggleModal={this.toggleModalVisibility} pichichis={pichichis} order={this.order}/>
    } else if (isTransferModalVisible) {
      transferModal = <TransferModal toggleModal={this.toggleModalTransferVisibility} teams={teams} players={players}></TransferModal>
    }

    return <div className="App">
      <header className="App-heading App-flex">
        <button onClick={this.toggleModalVisibility}>Pichichis</button>
      </header>
      <div className="App-teams App-flex">
        {/* 
          TODO ejercicio 2
          Debes obtener los players en lugar de los equipos y pintar su nombre. 
          Borra todo el código que no sea necesario. Solo debe existir un título: Los jugadores
          y una lista con sus nombres. 
          ** Los comentarios de los ejercicios no los borres.
        */}
        <h3>Jugadores:</h3>
        <ul>
          {/* 
            TODO ejercicio 3
            Vamos a pasar a darle diseño. Crea el diseño propuesto en el readme con los requerimientos que se necesite.
            Guiate por las imágenes.
           */}
          {players.map((player,index) => 
            <li className="info-player" key={index} onClick={this.toggleTransferModal}>
              <div className="info-player__general">
                <img src={player.img}/>
                <div className="info-player__name">
                  <p className="name"><span>{player.name}</span><span className="position">{player.position}</span></p>
                  <p className="team">{teams.length > 0 ? teams[player.teamId - 1].name : ''}</p>
                </div>
              </div>
              <div className="info-player__shield"><img src={teams.length > 0 ? teams[player.teamId - 1].shield : '#'}/></div>
          </li>)}
        </ul>
      </div>
      <div className="App-instructions App-flex">
        <img className="App-logo" src={reactSvg}/>
        <p>Edit <code>src/App.js</code> and save to hot reload your changes.</p>
      </div>
      {modal}
      {transferModal}
    </div>
  }

  toggleModalVisibility() {
    if (!this.state.isModalVisible && typeof this.state.pichichis[0].name === 'undefined') {
      this.getPichichisName(this.state.pichichis);
    }
    this.setState({isModalVisible: !this.state.isModalVisible});
  }

  toggleModalTransferVisibility() {
    this.setState({isTransferModalVisible: !this.state.isTransferModalVisible});
  }


  getPichichisName(pichichis) {
    let newPichichis = pichichis;
    if (this.state.players.length > 0) {
      newPichichis = newPichichis.map(pichichi => {
        let newPichichi = {...pichichi};
        const pichichiName = this.state.players.find(player => player.id === pichichi.playerId);
        if (pichichiName) {
          newPichichi.name = pichichiName.name;
        }
        return newPichichi;
      });
    }
    this.setState({pichichis: newPichichis});
  }

  order(orderByAsc) {
    let pichichis = this.state.pichichis;
      pichichis = pichichis.sort((pichichi1, pichichi2) => {
        const p1 = parseInt(pichichi1.goals);
        const p2 = parseInt(pichichi2.goals);
        return this.sortArray(p1, p2, orderByAsc);
      });
    this.setState({ pichichis });
  }

  sortArray(p1, p2, sortAsc) {
    if (sortAsc) {
      return (p2 > p1) ? 1 : ((p1 > p2) ? -1 : 0);
    } else {
      return (p1 > p2) ? 1 : ((p2 > p1) ? -1 : 0);
    }
  }

  toggleTransferModal() {
    this.setState({isTransferModalVisible: !this.state.isTransferModalVisible});
  }
}

export default App
