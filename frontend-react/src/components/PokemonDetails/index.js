import {useState, useEffect} from 'react';
import {Col, Row, Container, Card, CardImg, ProgressBar} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchPokemon, favoritePokemon, unFavoritePokemon } from '../../redux/ActionCreators';
import { connect } from 'react-redux';
import SoundButton  from '../Atoms/SoundButton';
import Loader from '../Atoms/Loader';
import Error from '../Atoms/Error';

const Evolutions = (props) => {
    if (!props.evolutions || !props.evolutions.length) {
        return null;
    }
    
    const cardsArray = props.evolutions.map(pokemon => {
        const favoriteClass= 'fa fa-heart fa-lg float-right ' + (pokemon.isFavorite && 'text-danger' || 'text-secondary');
        return (
        <Col key={pokemon.name} md={3} sm={2} className="pr-0 pb-2" >
            <Card className="pokemon-card">
                <Link to={`/${pokemon.name}`}>  
                    <CardImg src={pokemon.image || ''} alt={pokemon.name ||  ''}  className="img-thumbnail img-fluid" /> 
                </Link> 
                <Card.Body>
                    <Link to={`/${pokemon.name}`}> 
                        <Card.Title>{pokemon.name ||  ''}</Card.Title>
                    </Link>
                    <Card.Text>
                        <span className={favoriteClass} onClick={()=>{props.favoriteToggle(pokemon.id, pokemon.isFavorite)}} />
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>)
    });

    return (
        <Container>
            <Row>
                <Col className="text-left mt-3">
                <h3>Evolutions</h3>
                </Col>
            </Row>
            <Row>
                {cardsArray}
            </Row>
        </Container>
    );
}

const PokemonDetails = (props) => {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        if(pokemon === null) {
            props.fetchPokemon(props.name);
        }  else {
            document.title = props.name;
        }
    }, [pokemon, props.name]);
    
    if (props.isLoading) {
        return (<Container><Loader /></Container>)
    }

    if (props.error) {
        return (<Container><Error error={props.error} /></Container>)
    }

    const favoriteClass= 'fa fa-heart fa-3x float-right ' + (props.pokemon.isFavorite && 'text-danger' || 'text-secondary');

    const favoriteToggle = (id, isFavorite) => {
        if(isFavorite) {
            props.unFavoritePokemon(id);
        } else {
            props.favoritePokemon(id);
        }
    }

    return (
        <>
            <Row>
               <Col ms={12}>
                    <Card className="text-left pokemon-card">
                        <div className="position-relative">
                            <CardImg src={props.pokemon.image || ''} alt={props.pokemon.name ||  ''} className="img-thumbnail w-100" /> 
                            <SoundButton className="position-absolute left-bottom" soundUrl={props.pokemon.sound || ''} alt={props.pokemon.name ||  ''}  />
                        </div>
                        <Card.Body >
                            <span className={favoriteClass} onClick={()=>{favoriteToggle(props.pokemon.id, props.pokemon.isFavorite)}} />
                            <Card.Title>{props.pokemon.name ||  ''}</Card.Title>
                            <Card.Text>
                                {props.pokemon.types && props.pokemon.types.toString()}
                            </Card.Text>
                        </Card.Body>
                        <Card.Body className="p-1">
                            <Row>
                                <Col sm={11}>      
                                <ProgressBar now={100} className="mt-1 pg-purple" />
                                </Col>
                                <Col sm={1}>
                                    <p>CP: {props.pokemon.maxCP}</p>
                                </Col>
                            </Row>  
                            <Row>
                                <Col sm={11}>      
                                <ProgressBar variant="info" now={100} className="mt-1" />
                                </Col>
                                <Col sm={1}>
                                    <p>HP: {props.pokemon.maxHP}</p>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Body className="p-0">
                        <Row className="text-center">
                                <Col sm={6} className="table-view p-3" >      
                                <h3>Weight</h3>
                                {props.pokemon.weight && props.pokemon.weight.minimum} - {props.pokemon.weight && props.pokemon.weight.maximum}
                                </Col>
                                <Col sm={6} className="table-view p-3">
                                    <h3>Height</h3>
                                    {props.pokemon.height && props.pokemon.height.minimum} - {props.pokemon.height && props.pokemon.height.maximum}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Evolutions evolutions={props.pokemon.evolutions} favoriteToggle={favoriteToggle}/>
        </>
    );
}

 
const mapStateToProps = state => {
    return {
        pokemon: state.pokemon.data,
        error: state.pokemon.errMess,
        isLoading: state.pokemon.isLoading
        
    };
  };
  
  const mapDispatchToProps = dispatch => ({
    fetchPokemon: (name) => dispatch(fetchPokemon(name)),
    favoritePokemon: (id) => dispatch(favoritePokemon(id)),
    unFavoritePokemon: (id) => dispatch(unFavoritePokemon(id))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetails);