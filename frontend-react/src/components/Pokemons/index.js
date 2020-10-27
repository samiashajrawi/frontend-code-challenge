import {useState, useEffect} from 'react';
import {Col, Row, Media, Card, CardImg, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ListHeader from './ListHeader';
import { fetchPokemonTypes, fetchPokemons, updateSearchParam, favoritePokemon, unFavoritePokemon } from '../../redux/ActionCreators';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from '../Atoms/Loader';
import Error from '../Atoms/Error';


const LIMIT = 20;

const GridCard = (props) =>  {
    const pokemon =  props.pokemon;
    const favoriteClass= 'fa fa-heart fa-lg float-right ' + (pokemon.isFavorite && 'text-danger' || 'text-secondary');
    return (
    <Col key={pokemon.name} md={3} xs={12} className="pb-2 col-content">
        <Card className="pg-light text-left text-dark pokemon-card">
            <Link to={`/${pokemon.name}`} className="text-dark">  
                <CardImg src={pokemon.image || ''} alt={pokemon.name ||  ''}  className="img-thumbnail img-fluid" /> 
            </Link> 
            <Card.Body>
                <Link to={`/${pokemon.name}`}> 
                    <Card.Title >{pokemon.name ||  ''}</Card.Title>
                </Link>
                <Card.Text>
                    {pokemon.types.join(', ')  || ''} 
                    <span className={favoriteClass}  onClick={()=>{ props.favoriteToggle(pokemon.id, pokemon.isFavorite); }} ></span>
                </Card.Text>
            </Card.Body>
        </Card>
    </Col>)
}

const ListCard = (props) =>  {
    const pokemon =  props.pokemon;
    const favoriteClass= 'fa fa-heart fa-lg float-right ' + (pokemon.isFavorite && 'text-danger' || 'text-secondary');
    return (
        <Col sm={12}  className="mb-2" key={pokemon.name}>
            <Media className="media-card " >
                <Link to={`/${pokemon.name}`}>  
                    <img width={64} height={64} src={pokemon.image || ''} alt={pokemon.name ||  ''}  /> 
                </Link> 
                <Media.Body className="pl-2 pt-2 text-left pr-3">
                    <Link to={`/${pokemon.name}`} className="media-card-link" > 
                        <h5 className="mb-0">{pokemon.name ||  ''}</h5>
                    </Link>
                    <p>{pokemon.types.join(', ')  || ''} 
                        <span className={favoriteClass}  onClick={()=>{ props.favoriteToggle(pokemon.id, pokemon.isFavorite); }} ></span>
                    </p>
                </Media.Body>
            </Media>
        </Col>
    )
}

const Pokemons = (props) => {
    const [pokemonsList, setList] = useState(null);
    const [pokemonTypes, setTypes] = useState(null);
    const [view, setView] = useState('default');

    useEffect(() => {
        if(pokemonTypes === null) {
            props.fetchPokemonTypes();
        }
    }, [pokemonTypes]);
    useEffect(() => {
        if(pokemonsList === null && view  === 'default') {
            props.fetchPokemons(LIMIT, 0, '', '', false);
        }
    },[pokemonsList, view]);

    if (props.isLoading) {
        return (<Container><Loader /></Container>)
    }

    if (props.error) {
        return (<Container><Error error={props.error} /></Container>)
    }

    const pageChangedHandler = page => {
        if (props.pokemonsList.isLoading || page <= currentPage) return;

        props.fetchPokemons(LIMIT, props.pokemonsList.data.length, props.searchText , props.pokemonType , props.isFavorite);
    }
    const selectTabHandler = e => {
        if (e === 'favorite' && !props.isFavorite ) {
            props.updateSearchParam(LIMIT, 0, props.searchText , props.pokemonType , true);
        } else if (e === 'all' && props.isFavorite) {
            props.updateSearchParam(LIMIT, 0, props.searchText , props.pokemonType , false);
        }
    }

    const selectTypeHandler = type => {
        if (type !== props.pokemonType ) {
            props.updateSearchParam(LIMIT, 0, props.searchText , type , props.isFavorite);
        }
    }

    const enterSearchTextHandler = e => {
        if (e.target.value !== props.searchText ) {
            props.updateSearchParam(LIMIT, 0, e.target.value , props.pokemonType , props.isFavorite);
        }
    }

    const favoriteToggle = (id, isFavorite) => {
        if(isFavorite) {
            props.unFavoritePokemon(id);
        } else {
            props.favoritePokemon(id);
        }
    }

    const setViewToGrid = () => {
        setView('grid');
    }

    const setViewToList = () => {
        setView('list');
    }

    const cardsArray = props.pokemonsList.data.map((pokemon, index) => {
        return view === "list" ?  <ListCard pokemon={pokemon} key={index} favoriteToggle={favoriteToggle} /> : <GridCard key={index} pokemon={pokemon} favoriteToggle={favoriteToggle} />;
    });

    const totalPages = Math.ceil(props.pokemonsList.count/LIMIT);
    const currentPage = Math.ceil(props.pokemonsList.data.length/LIMIT);

    return (
        <>
            <ListHeader {... props} 
                selectTabHandler={selectTabHandler}
                selectTypeHandler={selectTypeHandler}
                enterSearchTextHandler={enterSearchTextHandler}
                setViewToList={setViewToList}
                setViewToGrid={setViewToGrid}
            />
            <InfiniteScroll
                pageStart={1}
                loadMore={pageChangedHandler}
                hasMore={totalPages >  currentPage}
                initialLoad={false}
                loader={<div className="loader" key={0}><Loader /></div>}
            >
                <Row className="row-content">
                    {cardsArray}
                </Row>
            </InfiniteScroll>
            
        </>
    );
}

 
const mapStateToProps = state => {
    return {
        pokemonsList: state.pokemonsList,
        pokemonTypes: state.pokemonTypes,
        searchText: state.pokemonsList.searchText,
        pokemonType: state.pokemonsList.pokemonType,
        isFavorite: state.pokemonsList.isFavorite
    };
  };
  
  const mapDispatchToProps = dispatch => ({
    fetchPokemons: (limit, offset, searchText, pokemonType, isFavorite) => dispatch(fetchPokemons(limit, offset, searchText, pokemonType, isFavorite)),
    fetchPokemonTypes: () => dispatch(fetchPokemonTypes()),
    unFavoritePokemon: (id) => dispatch(unFavoritePokemon(id)),
    favoritePokemon: (id) => dispatch(favoritePokemon(id)),
    updateSearchParam: (limit, offset, searchText, pokemonType, isFavorite) => dispatch(updateSearchParam(limit, offset, searchText, pokemonType, isFavorite))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Pokemons);
  