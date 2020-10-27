import {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {Toast} from 'react-bootstrap';

function FavToast(props) {
  

  return (
        <Toast onClose={() => props.setShow(false)} show={props.show} transition={false} delay={5000} autohide className="border border-info m-xs-1 m-md-2 toast-fav">
          <Toast.Body>{props.toastText}</Toast.Body>
        </Toast>
  );
}


function Header(props) {
  const [show, setShow] = useState(false);
  const [toastText, setToast] = useState('');
  const [lastToastPockemon, setLastToastPockemon] = useState(null);

  const FavSuccess = (name) => <><i className="fa fa-check fa-lg text-info"></i> Add {name} to favorites </>
  const UnFavSuccess = (name) => <><i className="fa fa-check fa-lg text-info"></i> Remove {name} from favorites </>
  const FavFaild = (name) => <><i className="fa fa-lg fa-times text-danger"></i> Can not  add {name} to favorites </>
  const UnFavFaild = (name) => <><i className="fa fa-lg fa-times text-danger"></i> Can not remove {name} from favorites </>


  useEffect(() => {
      if(props.favoritePokemon.pokemon && 
        (!lastToastPockemon || lastToastPockemon !== props.favoritePokemon.pokemon.name)
        ) {
        setShow(true);
        setLastToastPockemon(props.favoritePokemon.pokemon);
        if (props.favoritePokemon.pokemon.isFavorite === props.favoritePokemon.favorite) {
          if (props.favoritePokemon.favorite) {
            setToast(FavSuccess(props.favoritePokemon.pokemon.name));
          } else {
            setToast(UnFavSuccess(props.favoritePokemon.pokemon.name))
          }
        } else {
          if (props.favoritePokemon.favorite) {
            setToast(FavFaild(props.favoritePokemon.pokemon.name));
          } else {
            setToast(UnFavFaild(props.favoritePokemon.pokemon.name))
          }
        }
      }
  }, [props.favoritePokemon]);

    return (
        <div className="d-flex mx-auto flex-column justify-content-center">
        <FavToast show={show} setShow={setShow} toastText={toastText} />
      </div>
    );
  }
  
  const mapStateToProps = state => {
    return {
      favoritePokemon: state.favoritePokemon
    };
  };
  
  export default connect(mapStateToProps)(Header);
  