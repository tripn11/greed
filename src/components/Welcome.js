import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { setOpponent } from "../detailsReducer";

const Welcome = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [modalState, setModalState] = useState(false);

    const openModal = () => {
        setModalState(true);
    }

    const closeModal = () => {
        setModalState(false)
    }

    const chooser = (opponent) => {
        dispatch(setOpponent(opponent));
        navigate('/setTarget');
    }

    return (
        <div>
            <div>
                <p>Welcome</p>
                <p>to the</p>
                <p>GREED GAME</p>
            </div>
            <div>
                <button onClick={()=>chooser('computer')}>Play with Computer</button>
                <button onClick={()=>chooser('friend')}>Play with Friend</button>
                <button onClick={openModal}>Rules</button>
            </div>
            <Modal
                isOpen={modalState}
                className='modal-content'
                overlayClassName='modal-overlay'
            >
                <h2>RULES</h2>
                <ol>
                    <li>Each player tosses the dice as many times as possible</li>
                    <li>Rolling the number 1 on the dice means everything 
                    in your temporary bank gets wiped and the game is passed on to your opponent</li>
                    <li>Rolling consecutive 6 means everything in your main bank gets wipped and 
                        the game is passed on to your opponent</li>
                    <li>first to reach the set target from the main bank wins the game</li>
                </ol>
                <button onClick={closeModal}>CLOSE</button>   
            </Modal>
        </div>
    )   
}

export default Welcome;