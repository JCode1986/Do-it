import React from 'react'
import DoIt from './do-it.mp4';
import { withRouter } from 'react-router-dom';

function Video() {
    const playVideo = () => {
        return (
            <div>
                <video
                    autoPlay
                    loop
                    style={{
                        width: "100%"
                    }}
                >
                    <source src={DoIt} type="video/mp4" />
                </video>
            </div>
        )
    }

    return (
        <>
        {playVideo()}
        </>
    )
}

export default withRouter(Video);
