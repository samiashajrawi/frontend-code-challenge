

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Pokemons from './Pokemons';
import PokemonDetails from './PokemonDetails';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Switch, Route, Redirect } from 'react-router-dom';

function Main(props) {
    
    const pokemonsPage = () => {
        return (
            <Pokemons 
                tab={props.tab||'tab'}
                search={props.search||'search'}
                type={props.type||'type'}
                view={props.view||'view'}
                pokemonsList={props.pokemonsList}
                pokemonTypes={props.pokemonTypes}
            />
        );
    }
    
    return (
        <>
            <Header />
            <TransitionGroup>
            <CSSTransition classNames="page" timeout={200}>
                <Switch>
                <Route path="/pokemons" component={pokemonsPage} />
                <Route exact path="/:name" component={({match}) => <PokemonDetails name={match.params.name}/>} />
                <Redirect to="/pokemons" />
                </Switch>
            </CSSTransition>
            </TransitionGroup>
            <Footer />
        </>
    );
  }

  export default Main;
  