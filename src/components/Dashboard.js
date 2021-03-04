import React, {useState, useEffect} from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth';
import {
    Card,CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    Form, FormGroup, Label, Input,
  } from 'reactstrap';


const initialUser = {
    username: '',
    userid: '', 
    potlucks: []
}

const initialUserPotlucks = [];

const initialPotluckFormState = {
    name: '',
    location: '',
    date: '',
    time: '',
    organizer: '',
}

function Dashboard() {
    const [user, setUser] = useState(initialUser);
    const [userPotlucks, setUserPotlucks] = useState(initialUserPotlucks);
    const [update, setIsUpdate] = useState(true);
    const [editing, isEditing] = useState(false);
    const [potluckFormValues, setPotluckFormValues] = useState(initialPotluckFormState);

    useEffect(() => {
        if (update){
            axiosWithAuth().get("https://potluck-tt11.herokuapp.com/users/getuserinfo")
            .then(res => {
                console.log(res.data);
                setIsUpdate(false);
                setUser({
                    username: res.data.username,
                    userid: res.data.userid,
                    potlucks: res.data.potlucks
                })
            })
            .catch(err => console.log(err))
        } 
    }, [update]);

    useEffect(() => {
        if(update)
        {
            axiosWithAuth().get("https://potluck-tt11.herokuapp.com/potlucks/getpotluckinfo")
            .then(res => {
                console.log("userorganizer", res.data);
                setUserPotlucks(res.data);
                setIsUpdate(false);
            })
            .catch(err => console.log(err));
        }
    }, [update]);

    const handleRemove = (potluckid, guestid) => {
        axiosWithAuth().delete(`https://potluck-tt11.herokuapp.com/potlucks/potluck/${potluckid}/removeguest/${guestid}`)
            .then(res => {
                console.log(res);
                setIsUpdate(true);
            })
            .catch(err => console.log(err));
    }

    const handleEdit = (potluckid) => {
        return null;
    }
    const handleDelete = (potluckid) => {
        axiosWithAuth().delete(`https://potluck-tt11.herokuapp.com/potlucks/potluck/${potluckid}`)
            .then(res => {
                console.log(res);
                setIsUpdate(true);
            })
            .catch(err => console.log(err));
    }

    const handleChange = (e) => {
        setPotluckFormValues({
          ...potluckFormValues,
          [e.target.name]: e.target.value,
        });
      };

    const updateEvent = (e) => {
        e.preventDefault();
        const newPotluck = potluckFormValues;
        newPotluck.organizer = user.username;
        console.log(newPotluck);
        axiosWithAuth().post("https://potluck-tt11.herokuapp.com/potlucks/potluck", newPotluck)
        .then(res => {
            console.log(res);
            setIsUpdate(true);
            setPotluckFormValues(initialPotluckFormState);
        })
    }
    return (
        <div className="userdashboard">
            <h2>{user.username}'s Potluck Dashboard - Create and/or Edit your Events</h2>
            <div className='cardcontainer'>
            {userPotlucks.length > 0 && userPotlucks.map(potluck => (
                <Card style={{width: "30%"}}key={potluck.potluckid}>
                    <CardBody style={{margin: "0 auto"}}>
                    <CardTitle>{potluck.name}</CardTitle>
                    <CardText>{potluck.location}</CardText>
                    <CardText>{potluck.date}</CardText>
                    <CardText>{potluck.time}</CardText>
                    <CardSubtitle>Current Guests</CardSubtitle>
                    <ul>
                    {potluck.users.length > 0  && potluck.users.map(guest => (
                        <li key={guest.user.userid}>
                        {guest.user.username}
                        </li> 
                    ))
                    }
                    </ul>
                    <CardSubtitle>Food Items</CardSubtitle>
                    <ul>
                    {potluck.items.length > 0 && potluck.items.map(item => (
                        <li key={item.itemid}>
                            {item.name}
                        </li>
                    ))}
                    </ul>
                        <Button onClick={() => handleEdit(potluck.potluckid)} >Edit</Button>
                        <Button onClick={() => handleDelete(potluck.potluckid)} >Delete</Button>
                    </CardBody>
                </Card>
            ))}
            </div>
            <div className="form-wrapper">
                <h2>Create a New Event</h2>
                <Form className="form" onSubmit={updateEvent}>
                    <FormGroup>
                        <Label for="name">
                            Name:
                        </Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder='name'
                        value={potluckFormValues.name}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="location">
                        Location:
                    </Label>
                    <Input
                        type="location"
                        id="location"
                        name="location"
                        placeholder='location'
                        value={potluckFormValues.location}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="date">
                        Date:
                    </Label>
                    <Input
                        type="date"
                        id="date"
                        name="date"
                        placeholder='date'
                        value={potluckFormValues.date}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="time">
                        Time:
                    </Label>
                    <Input
                        type="time"
                        id="time"
                        name="time"
                        placeholder='time'
                        value={potluckFormValues.time}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <div className='btn-wrapper'>
                    <Button color="secondary" type="submit">
                    Create Potluck
                    </Button>
                </div>
            </Form> 
        </div>
    </div>
    )
}

export default Dashboard;
