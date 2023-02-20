import { useState, useEffect } from 'react';
import React from 'react';

const fetchUsers = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    return res.json();
};

function User() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers().then((data) => {
            setUsers(data);
        });
    }, []);

    return (
        <div>
            <h2>ユーザ一覧</h2>
            <div>
                {users.map((user, ind) => (
                    <div key={ind}>{user}</div>
                ))}
            </div>
        </div>
    );
}

export default User;