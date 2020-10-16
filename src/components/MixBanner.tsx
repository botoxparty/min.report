import React, { useState } from 'react';
import styled from 'styled-components';

const StyledMixBanner = styled.div`
    position: relative;
`;

const MixOverlay = styled.div`
    width: 100%;
    min-height: 150px;
    margin: 1em 0;
    background: lightcyan;
    cursor: pointer;
    display: flex;
    .title {
        padding: 1em;
        flex: 1;
    }
    .actions {
        font-size: 1.5em;
        /* background-color: black; */
        /* a { color: white; } */
        margin: 1em;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    h2 {
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
    }
    h4 {
        margin-top: 0;
    }
`

function MixBanner() {

    const [showOverlay, setShowOverlay] = useState(true);

    const src = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/854935270&amp;color=%23ff5500&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true&amp;visual=true';
    return  <StyledMixBanner >
            {showOverlay ? <MixOverlay onClick={() => setShowOverlay(false)}>
                <div className="title">
                <h4>MIX</h4>
                <h2>Bossy’s Gallery DJs: Lockdown Lounge (The Chillout Mix…) by Bossy's Gallery</h2>
                </div>
                <p className="actions">
                <a>Listen now &#9658;</a>
                <br></br>
                <a>... read the full story</a>
                </p>
                </MixOverlay> :
                <iframe scrolling="no" allow="autoplay" src={src} width="100%" height="200" frameBorder="no"><title>Mix</title></iframe>}
            </StyledMixBanner>
}

export default MixBanner;