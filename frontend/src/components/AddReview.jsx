import React,{useState} from 'react';
import "bootstrap";
import {Button,Form,Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export function AddReview(props){
    console.log(props.patientId);
    console.log(props.doctorId);
    const [formDetails, setFormDetails] = useState({
        rating: "",
        comment: "",
      });
    const inputChange = (e) => {
        const { name, value } = e.target;
         return setFormDetails({
          ...formDetails,
          [name]: value,
        });
    };

    const handleClose = () => props.setShow(false);

    async function AddReviews(){
        const patientId = props.patientId;
        const doctorId = props.doctorId;
        
        try{
            const response = await axios.patch(`http://localhost:3001/patient/review/${doctorId}`,
            {              
              rating : formDetails.rating,
              comment : formDetails.comment,
              patientId : patientId
            },
            {
              headers : {
                'Authorization': "Bearer " + localStorage.getItem('token').slice(1,-1),
            }
           })
           console.log(response.data);
          }catch(err){
            console.log(err);
          }
    }


    return (
        <Modal show={props.show} onHide={handleClose} size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>comment</Form.Label>
              <Form.Control
                type="text"
                name = "comment"
                placeholder="select your comment"
                value = {formDetails.comment}
                onChange = {inputChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
            >
              <Form.Label>Select rating :- </Form.Label>
              <Form.Control value = {formDetails.rating} name = "rating" type = "number"  placeholder="select your rating" onChange = {inputChange} min={1} max={5} 
              onKeyDown={(e) => {
                if (e.key !== "ArrowUp" && e.key !== "ArrowDown") {
                    e.preventDefault(); 
                }
            }}
              />
              <small className="form-text text-muted"> Enter a rating between 1 & 5</small>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={AddReviews} >
            Add Review
          </Button>
        </Modal.Footer>
      </Modal>
      );
    
}