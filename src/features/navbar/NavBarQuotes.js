import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import axios from 'axios'
import LoadFunction from '../loading/loadFunction';

function NavBarQuotes() {
    const url = "https://type.fit/api/quotes";
    const [quote, setQuote] = useState('');
    const [loader, showLoader, hideLoader] = LoadFunction();

    useEffect(() => {
        let mounted = true;
        const getQuotes = async () => {
            showLoader();
            try {
                await axios.get(url).then((response) => {
                    let quote = response.data[Math.floor(Math.random() * response.data.length)];
                    let { text, author } = quote;
                    if(!author) author = "Anonymous"
                    //only set data if still mounted
                    if(mounted) setQuote(`"${text}" -${author}`);
                    if(quote.text.split(' ') >= 20) console.log('hey there')
                })       
            } catch (error) {
                console.log(error);
            }
            hideLoader();
        }      
        getQuotes();

        //clean up
        return () => mounted = false;
    }, [])


    return (
        <div
        style={{marginLeft:'20px', width:'70%'}}
        >
        {loader || <Typography
                        style={{float:'left'}}
                    >
                        {quote}
                    </Typography>}
        </div>
    )
}

export default NavBarQuotes
