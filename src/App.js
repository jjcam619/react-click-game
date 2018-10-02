import React, { Component } from "react";
import Card from "./Components/Card";
import Wrapper from "./Components/Wrapper";
import tilesData from "./tiles.json"



const initialState = {
  tiles: tilesData,
  score: 0,
  topScore: 0,
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  resetGame = () => {
    const tiles = this.state.tiles.map(tile => ({ ...tile, clicked: false }))
    this.setState({ score: 0, tiles })
  }

  handleClick = id => {
    let clickedTile = this.state.tiles.find(tile => tile.id === id)

    if (clickedTile.clicked) {
      alert("You lost!! Here is your score: " + this.state.score)
      this.resetGame()
    } else {
      clickedTile.clicked = true
      let newTiles = this.state.tiles.filter(tile => tile.id !== id)
      newTiles.push(clickedTile)
      newTiles.sort(function(a, b){return 0.5 - Math.random()})

      if (this.state.score === 11) {
        alert("You Won!!")
        this.setState({
          ...this.state,
          topScore: this.state.topScore + 1
        })
        this.resetGame()
      }
      else {
        this.setState({
          ...this.state,
          score: this.state.score + 1,
          topScore: this.state.score === this.state.topScore
            ? this.state.topScore + 1
            : this.state.topScore,
          tiles: newTiles
        })
      }
     
      
    }
  }

  render() {
    return (
    <div className="wrap">
      <div>
        <div className="scores">
          <h1 style={{textAlign: "center"}}>Score: { this.state.score }</h1>
          <h1 style={{textAlign: "center"}}>Top Score: { this.state.topScore }</h1>
        </div>
        <div className="description">
          <p>
            Try to click on all 12 different pictures! If you click on a picture that you have already clicked, you lose.
          </p>
        </div>
      </div>
      <div>
        <Wrapper>
          {
            this.state.tiles.map(tile => (
              <Card 
                key={tile.id} 
                onClick={ () => this.handleClick(tile.id) }
                imgsrc= {tile.src}
              />
            ))
          }
        </Wrapper>
        
      </div>
    </div>
    );
  }
}

export default App;