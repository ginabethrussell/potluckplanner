import React from 'react';
import {useHistory} from 'react-router-dom';
import {
    Button
} from 'reactstrap';
function Home() {
    const history = useHistory();

    return (
        <div className='home'>
            <h1>The Easy Way to Plan Your Next Potluck</h1>
            <Button onClick ={() => {history.push('/signup')}}>Get Started Today</Button>
        </div>
    )
}

export default Home
