import React,{useState} from 'react';
import "bootstrap";
import {Button,Form,Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
export function Appointment(props){

  const [formDetails, setFormDetails] = useState({
    date: "",
    time: "",
  });
const inputChange = (e) => {
    const { name, value } = e.target;
     return setFormDetails({
      ...formDetails,
      [name]: value,
    });
};
const handleClose = () => props.setShow(false);
async function BookAppointment(){
  const userId = props.userId;
  const doctorId = props.doctorId;
  console.log(userId)
  try{
    const response = await axios.patch(`http://localhost:3001/patient/booking/${doctorId}`,
    {
      patientId : userId,
      time : formDetails.time,
      date : formDetails.date
    },
    {
      headers : {
        'Authorization': "Bearer " +localStorage.getItem('token').slice(1,-1),
    }
   })
   console.log(response.data);
  }catch(err){
    console.log(err);
  }

}
    return(
        <Modal show={props.show} onHide={handleClose} size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>date</Form.Label>
              <Form.Control
                type="date"
                name = "date"
                placeholder="select your date"
                value = {formDetails.date}
                onChange = {inputChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
            >
              <Form.Label>select time</Form.Label>
              <Form.Control value = {formDetails.time} name = "time" type = "time"  placeholder="select your time" onChange = {inputChange}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={BookAppointment} >
            Book appointment
          </Button>
        </Modal.Footer>
      </Modal>);
}
