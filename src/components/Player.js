import React from "react";

const Player = (props) => (
    <div>
        {props.target <= props.details.bank && <div>Winner!!!</div>}
        {props.player === 0 && <p>COMPUTER</p>}
        {props.player === 1 && <p>PLAYER 1</p>}
        {props.player === 2 && <p>PLAYER 2</p>}
        
        <p>{props.details.bank}</p>
        <p>{props.details.temp}</p>
    </div>
)

export default Player;