import React, {useEffect,useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Player from "./Player";
import one from '../images/dice-1.png';
import two from '../images/dice-2.png';
import three from '../images/dice-3.png';
import four from '../images/dice-4.png';
import five from '../images/dice-5.png';
import six from '../images/dice-6.png';


const Game = () =>{
    const navigate = useNavigate();
    const target = useSelector(state=>state.details.target)
    const opponent = useSelector(state=>state.details.opponent)
    const [image, setImage] = useState(null);
    const [score, setScore] = useState(0);
    const [rolled,setRolled] = useState(0);
    const [activeUser, setActiveUser] = useState(true);
    const [user1, setUser1] = useState({bank:0,temp:0})
    const [user2, setUser2] = useState({bank:0,temp:0})
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [consecSix, setConsecSix] = useState(false);
    const [enough, setEnough] = useState(false);
    const [computerConsecTracker, setComputerConsecTracker] = useState(0);
    const [computerConsec,setComputerConsec] = useState(false);


    useEffect(()=>{
        if(target==='') {
            navigate('/')
        }
    },[])

    useEffect(() => {
        imageSetter();
        operator();
    },[rolled])

    useEffect(()=>{
        if(score===6) {
            setComputerConsecTracker(prev=>prev+1)
        }else {
            setComputerConsecTracker(0);
        }
    },[score,rolled])

    useEffect(()=> {
        if(computerConsecTracker > 1) {
            setComputerConsec(true)
        }
    },[computerConsecTracker])

    useEffect(()=>{
        if(user1.bank>=target || user2.bank>=target) {
            setButtonDisabled(true)
        }
    },[user1,user2])

    useEffect(() => {
        if (opponent === 'computer' && !activeUser) {
            let computerRolls = 0;
            setButtonDisabled(true)
            const expected = Math.ceil(1 + Math.random() * 3)
            const computerRollInterval = setInterval(() => {
                if (activeUser || user1.bank >= target || user2.bank >= target) {
                    clearInterval(computerRollInterval);
                    return;
                }   
                if (computerRolls < expected) {
                    if(enough) {
                        holder();
                        clearInterval(computerRollInterval);
                        return;
                    }
                    if(computerConsec) {
                        setButtonDisabled(true);
                        setUser2({bank:0,temp:0})
                        setTimeout(()=>{
                            setScore(0);
                            userChanger();
                            setButtonDisabled(false)
                            setImage(null)
                            setComputerConsec(false)
                        },1000)
                        clearInterval(computerRollInterval);
                        return;
                    } 
                    roller(); 
                    computerRolls += 1;
                } else {
                    holder(); 
                    clearInterval(computerRollInterval);
                }
            }, 2000);
    
            return () => {
                clearInterval(computerRollInterval); 
            };
        }else{
            setButtonDisabled(false)
        }
    }, [activeUser,enough,computerConsec]);//enough and score were essential for computer part to know see when score has
    //been updated and to know when it has won if it holds without completing the expected number of rolls
    
    
    const numberGenerator = () => {
        return Math.ceil(Math.random()*6)
    }

    const imageSetter = () => {
        switch (score) {
            case 0 :
                setImage(null)
                break;
            case 1:
                setImage(one)
                break;
            case 2 :
                setImage(two)
                break;
            case 3 :
                setImage(three)
                break;
            case 4 : 
                setImage(four)
                break;
            case 5 : 
                setImage(five)
                break;
            case 6 :
                setImage(six)
                break;
            default:
                setImage(null)
        }
    }

    const userChanger = () => {
        if(activeUser) {
            setActiveUser(false)
        }else {
            setActiveUser(true)
        }
    }

    const operator = () => {
        if(activeUser) {
            if(score === 1) {
                setUser1(prev => ({...prev,temp:0}))
                setButtonDisabled(true)
                setTimeout(()=>{
                    setScore(0);
                    userChanger();
                    setButtonDisabled(false)
                    setRolled(prev=>prev+1)//for the image to be null
                },1000)
                return
            }

            if(consecSix) {
                setButtonDisabled(true);
                setUser1({bank:0,temp:0})
                setTimeout(()=>{
                    setScore(0);
                    userChanger();
                    setButtonDisabled(false)
                    setImage(null)
                },1000)
                return
            }
            setUser1(prev=>({...prev,temp:prev.temp + score}))
        }else {
            if(score === 1) {
                setUser2(prev => ({...prev,temp:0}))
                setButtonDisabled(true)
                setTimeout(()=>{
                    setScore(0);
                    userChanger();
                    setButtonDisabled(false)
                    setRolled(prev=>prev+1)
                },1000)
                return
            }

            if(consecSix) {
                setButtonDisabled(true);
                setUser2({bank:0,temp:0})
                setTimeout(()=>{
                    setScore(0);
                    userChanger();
                    setButtonDisabled(false)
                    setImage(null)
                },1000)
                return
            }

            setUser2(prev=>{
                if(prev.bank + prev.temp + score >= target) {
                    setEnough(true)
                }
                return {...prev,temp:prev.temp + score}
            })
        }
    }

    const roller = () => {
        const number = numberGenerator(); 
        if(number===6 && score===6){//to check for consecutive six
            setConsecSix(true)
        }else{
            setConsecSix(false)
        }      
        setScore(number);
        setRolled(prev=>prev+1) //so that the useEffect runs everytime there is a roll even if the number is repeated
    }

    const holder = () => {        
        if(activeUser) {
            setUser1(prev=>({temp:0,bank:prev.bank + prev.temp}))
        }else {
            setUser2(prev=>({temp:0,bank:prev.bank + prev.temp}))
        }
        setScore(0);
        userChanger();
        setRolled(prev=>prev+1)
    }

    const restarter = () => {
        navigate('/')
    }

    return(
        <div id="game">
            <p>Target:{target}</p>
            <div>
                <Player player={1} target = {target} details={user1} active={activeUser}/>
                <Player player={opponent === 'friend' ? 2:0} target = {target} details ={user2} active={activeUser}/>
            </div>
            <img src={image}/>
            <div>
                <button onClick = {roller} disabled={buttonDisabled}>Roll</button>
                <button onClick ={holder} disabled={buttonDisabled}>Hold</button>
                <button onClick={restarter}>Start New Game</button>
            </div>
        </div>
    )
}

export default Game;