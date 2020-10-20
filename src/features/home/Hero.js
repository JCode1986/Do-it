import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Typography } from '@material-ui/core'
import Item from './Item';
import './Home.css'

function Hero() {
    var items = [
        <div className="container">
            <img className="items" src={require("./heroImages/school.png")} alt="1" />
            <Typography className="top-left"><strong>School</strong> - Write a detailed description of what needs to be studied</Typography>
            <Typography className="bottom-left"></Typography>
            <Typography className="centered"></Typography>
        </div>,
            <div className="container">
            <img className="items" style={{transform: 'rotateY(180deg)'}} src={require("./heroImages/work.png")} alt="2" />
            <Typography className="top-left"><strong>Work</strong> - Sort work by priority levels</Typography>
            <Typography className="bottom-left"></Typography>
            <Typography className="centered"></Typography>
        </div>,
        <div className="container">
            <img className="items" src={require("./heroImages/chores.png")} alt="3" />
            <Typography className="top-left"><strong>Chores</strong> - Remind yourself of the chores and errands</Typography>
            <Typography className="bottom-left"></Typography>
            <Typography className="centered"></Typography>
        </div>,
        <div className="container">
            <img className="items" src={require("./heroImages/workout.png")} alt="4" />
            <Typography className="top-left"><strong>Fitness</strong> - Check archive section on what was done on a particular workout</Typography>
            <Typography className="bottom-left"></Typography>
            <Typography className="centered"></Typography>
        </div>,

    ]
    return (
        <Carousel
            style={{display:"none"}}
            interval="8000"
        >
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

export default Hero
