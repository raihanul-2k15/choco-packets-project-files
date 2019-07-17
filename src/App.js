import React, { Component } from 'react'
import { packets, turn, winner, new_game, human_move, AI_move } from './GameLogic'
import MyAppBar from './MyAppBar'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import ChocoIcon from '@material-ui/icons/Favorite'
import ChocoSelectedIcon from '@material-ui/icons/FavoriteBorder'
import Typography from '@material-ui/core/Typography'

export class App extends Component {
  state = {
    packets: [],
    turn: 1,
    winner: null,
    aiEnabled: true,
    selected: false,
    selection: {
      packetIndex: -1,
      chocoIndex: -1
    }
  }

  updateGameState() {
    this.setState({
      packets: packets,
      turn: turn,
      winner: winner
    })
  }

  componentDidMount() {
    new_game()
    this.updateGameState()
  }

  newGameBtnClick = (e) => {
    // TODO: ask the user
    new_game()
    this.updateGameState()
  }

  aiEnabledOnChange = (e) => {
    this.setState({ aiEnabled: e.target.checked })
  }

  hoverChoco = (p, c) => {
    if (p !== null && c !== null) {
      this.setState({
        selected: true,
        selection: {
          packetIndex: p,
          chocoIndex: c
        }
      })
    } else {
      this.setState({
        selected: false,
        selection: {
          packetIndex: -1,
          chocoIndex: -1
        }
      })
    }
  }

  clickChoco = (packetIndex, chocoIndex) => {
    const { aiEnabled, turn } = this.state
    if ((aiEnabled && turn === 1) || (!aiEnabled)) {
      let n_chocos = this.state.packets[packetIndex] - chocoIndex
      human_move(packetIndex, n_chocos)
      this.updateGameState()
      this.hoverChoco(null, null)
      if (aiEnabled)
        setTimeout(() => {
          AI_move()
          this.updateGameState()
        }, 1000);
    }
  }

  render() {
    const { packets, turn, winner, aiEnabled, selected, selection } = this.state

    return (
      <>
        <MyAppBar 
          newGameClick={this.newGameBtnClick} 
          aiEnabledChange={this.aiEnabledOnChange} 
          aiEnabledChecked={this.state.aiEnabled} />
        <Container>
          <Grid container alignItems="center">
            <Grid item xs={12} lg={6} component={Typography} variant="h3">
              {winner !== null ? "Game over" : (aiEnabled ? 
              (turn === 1 ? "Your turn" : "AI's turn...") :
              (turn === 1 ? "Player 1's turn" : "Player 2's turn"))}
            </Grid>
            <Grid item xs={12} lg={6} component={Typography} variant="h3">
              Winner: {winner && (aiEnabled ? 
              (winner === 1 ? "Human" : "AI") :
              ("Player " + winner))}
            </Grid>
          </Grid>
        </Container>
        <Container>
          {packets.map((p, p_idx) => (
            <Grid container key={p_idx}>
              <Grid item xs={1} component={Typography} variant="h2">{p}:</Grid>
              <Grid container item xs={11} alignItems="center" style={{border: "1px solid black"}}>
                {[...new Array(p)].map((c, c_idx) => {
                  let humanCanTurn = (aiEnabled && turn === 1) || (!aiEnabled)
                  let isSelected = selected && selection.packetIndex === p_idx && c_idx >= selection.chocoIndex
                  let shouldHighlight = humanCanTurn && isSelected
                  return (
                  <Grid item xs={3} md={2} lg={1}
                  component={shouldHighlight ? ChocoSelectedIcon : ChocoIcon}
                  key={c_idx}
                  onMouseEnter={() => this.hoverChoco(p_idx, c_idx)}
                  onMouseLeave={() => this.hoverChoco(null, null)}
                  onClick={() => this.clickChoco(p_idx, c_idx)}
                  fontSize="large"
                  color={shouldHighlight  ? "secondary" : "primary"}
                  />
                )})}
              </Grid>
            </Grid>
          ))}
        </Container>
      </>
    )
  }
}

export default App
