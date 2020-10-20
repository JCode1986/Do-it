import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Typography } from '@material-ui/core'
import Item from './Item';
import './Home.css'

function Hero() {
    var items = [
        <div class="container">
            <img className="items" src={require("./heroImages/school.png")} alt="1" />
            <Typography class="top-left"><strong>School</strong> - Write a detailed description of what needs to be studied</Typography>
            <Typography class="bottom-left"></Typography>
            <Typography class="centered"></Typography>
        </div>,
            <div class="container">
            <img className="items" style={{transform: 'rotateY(180deg)'}} src={require("./heroImages/work.png")} alt="2" />
            <Typography class="top-left"><strong>Work</strong> - Sort work by priority levels</Typography>
            <Typography class="bottom-left"></Typography>
            <Typography class="centered"></Typography>
        </div>,
        <div class="container">
            <img className="items" src={require("./heroImages/chores.png")} alt="3" />
            <Typography class="top-left"><strong>Chores</strong> - Remind yourself of the chores and errands</Typography>
            <Typography class="bottom-left"></Typography>
            <Typography class="centered"></Typography>
        </div>,
        <div class="container">
            <img className="items" src={require("./heroImages/workout.png")} alt="4" />
            <Typography class="top-left"><strong>Fitness</strong> - Check archive section on what was done on a particular workout</Typography>
            <Typography class="bottom-left"></Typography>
            <Typography class="centered"></Typography>
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
