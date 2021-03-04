import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {axiosWithAuth} from '../utils/axiosWithAuth';

function Logout() {
    const history = useHistory();

    useEffect(() => {
        axiosWithAuth()
            .get("/logout")
            .then((res) => {
                console.log(res)
            localStorage.removeItem("token");
            history.push('/')
            })
            .catch((error) => {
                console.log(error)
            });
        }, []);

    return (
        <div>
            See you again soon.
        </div>
    )
}

export default Logout
