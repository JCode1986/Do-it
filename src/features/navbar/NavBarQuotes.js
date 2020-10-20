import React, { useEffect, useState, useRef } from 'react'
import { Typography } from '@material-ui/core'
import axios from 'axios'

function NavBarQuotes() {
    const url = "https://type.fit/api/quotes";
    const [quote, setQuote] = useState('');

    useEffect(() => {
        let mounted = true;

        const getQuotes = async () => {
            try {
                await axios.get(url).then((response) => {
                    let quote = response.data[Math.floor(Math.random() * response.data.length)];
                    let { text, author } = quote;
                    if(!author) author = "Anonymous"
                    if(mounted) setQuote(`"${text}" -${author}`);
                })       
            } catch (error) {
                console.log(error);
            }
        }      
        getQuotes();
        
        return () => mounted = false;
    }, [])

    return (
        <div
        style={{marginLeft:'20px'}}
        >
            <Typography >{quote}</Typography>
        </div>
    )
}

export default NavBarQuotes
