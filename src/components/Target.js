import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTarget } from "../detailsReducer";


const Target = () => {
    const navigate = useNavigate();
    const opponent = useSelector(state=>state.details.opponent)
    const dispatch = useDispatch();
    const [value, setValue] = useState('');

    useEffect(()=>{
        if(opponent === '') {
            navigate('/')
        }
    },[])

    const update = (e) => {
        if(/^[0-9]+$/.test(e.target.value) || e.target.value ===''){
            setValue(e.target.value);
        }
    }

    const startGame = () => {
        if(Number(value) > 9) {
            dispatch(setTarget(value));
            navigate('/game');
        }else {
            alert('Target must be greater than 9');
        }
    }

    return (
        <div id="target">
            <div>
                <p>Set Target</p>
                <input 
                    value={value}
                    onChange={update}
                />
                <button onClick={startGame}>Start Game</button>
            </div>
        </div>
    )
}

export default Target