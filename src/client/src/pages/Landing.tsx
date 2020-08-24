import React from 'react';
import { scaleDown as Menu, State } from 'react-burger-menu';

import LoginForm from '../components/Form/LoginForm';
import GameControl from '../components/Prompt/GameControl';
import Tetris from '../components/Game/Tetris';
import './Landing.css';

type LandingState = {
  formOpened: boolean;
  gamePaused: boolean;
  gameRestart: boolean;
  gameOver: boolean;
};

class Landing extends React.Component<{}, LandingState> {
  constructor(props: {}) {
    super(props);

    this.handleFormState = this.handleFormState.bind(this);

    this.state = {
      formOpened: false,
      gamePaused: true,
      gameRestart: false,
      gameOver: false,
    };
  }

  /**
   * @brief: handleFormState: Callback to sync the state being set
   * using our own onClick event with the state being set using the
   * default means in the react-burger-menu module
   * @param[in]: state - The state of the menu
   */
  handleFormState(state: State): void {
    this.setState({ formOpened: state.isOpen });
  }

  render(): JSX.Element {
    const {
      formOpened, gamePaused, gameRestart, gameOver,
    } = this.state;

    return (
      <div id="outer-container">
        <Menu
          customBurgerIcon={false}
          isOpen={formOpened}
          onStateChange={(state: State): void => this.handleFormState(state)}
          outerContainerId="outer-container"
          pageWrapId="game-container"
          width="600px"
        >
          <LoginForm />
        </Menu>
        <div id="game-container">
          <GameControl
            isOver={gameOver}
            openForm={(): void => this.setState({ formOpened: true })}
            toggleGame={(): void => this.setState({ gamePaused: !gamePaused })}
            restartGame={(): void => this.setState({
              gamePaused: false,
              gameRestart: !gameRestart,
            })}
          />
          <Tetris
            boardWidth={14}
            boardHeight={20}
            gamePaused={gamePaused}
            gameRestart={gameRestart}
            gameState={(isOver: boolean): void => this.setState({ gameOver: isOver })}
          />
        </div>
      </div>
    );
  }
}

export default Landing;
