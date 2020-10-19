import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Typography } from '@material-ui/core'
import Item from './Item';
import './Home.css'

function Hero() {
    var items = [
        <div class="container">
            <img className="items" src={require("./heroImages/school.png")} alt="1" />
            <Typography class="bottom-left">Bottom Left</Typography>
            <Typography class="top-left">School</Typography>
            <Typography class="centered">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
        </div>,
            <div class="container">
            <img className="items" src={require("./heroImages/work.png")} alt="2" />
            <Typography class="top-right">Work</Typography>
            <Typography class="bottom-right">Bottom Right</Typography>
            <Typography class="centered">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
        </div>,
        <div class="container">
            <img className="items" style={{transform: 'rotateY(180deg)'}}src={require("./heroImages/chores.png")} alt="3" />
            <Typography class="bottom-left">Bottom Left</Typography>
            <Typography class="top-left">Chores</Typography>
            <Typography class="centered">Centered</Typography>
        </div>,
        <div class="container">
            <img className="items" src={require("./heroImages/workout.png")} alt="4" />
            <Typography class="top-right">Fitness</Typography>
            <Typography class="bottom-right">Bottom Right</Typography>
            <Typography class="centered">Centered</Typography>
        </div>,

    ]
    return (
        <Carousel
            style={{display:"none"}}
        >
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

export default Hero
