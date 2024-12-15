// import { useEffect } from "react";

import React, { useState , useEffect} from "react";
import { useParams } from "react-router-dom"
import { io } from "socket.io-client";
import axios from "axios";

const Message = (props) => {
    return (<p>{props.contents}</p>);
}
export const ChatTest = () => {
    
    const [messages, setMessages] = useState([]);
    const [roomId, setRoomId] = useState("");
    const {patientId, doctorId} = useParams();
    const [doctor, setDoctor] = useState({});
    const [patient, setPatient] = useState({});
    const [message, setMessage] = useState("");
    const socket = io.connect("http://localhost:3001");

    useEffect( () => {
        const setUsers = async () => {
            const doctorObj = await axios.get(`http://localhost:3001/doctor/getDoctor/${doctorId}`, {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem('token').slice(1,-1),
                        },
            });

            const patientObj = await axios.get(`http://localhost:3001/patient/getPatient/${patientId}`, {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem('token').slice(1,-1),
                        },
            });
            
            setDoctor(doctorObj.data);
            setPatient(patientObj.data);
            
        }

        setUsers();

    },[]);

    useEffect( () => {
        const setUsers = async () => {
            if(patient != null && doctor != null && patient._id != undefined && doctor._id != undefined){
                const room = doctor._id.substring(0,14) + patient._id.substring(0,14);
                setRoomId(room);
                socket.emit("join",room);
            }
        }

        setUsers();

    },[patient]);

    useEffect( () => {
        socket.on("receive", (data) => {
            console.log("received");
            setMessages((messagesSoFar) => [...messagesSoFar,data.message]);
        });

    },[socket]);

    const changeHandle = async (event) => {
        setMessage(event.target.value);

        if(event.key === 'Enter'){
            const data = {
                roomId,
                message,
            };
            await socket.emit('message',data);
            event.target.value = "";
            setMessage("");
        }
    }

    return(
        <>
        <ul>
            {messages.map( (curMessage, index) => {
                return < Message key = {index} contents={curMessage} />
            })}
        </ul>
        <input type="text" placeholder="man" onKeyDown={changeHandle} />
        <p>Hello World</p>
        </>
    );
};