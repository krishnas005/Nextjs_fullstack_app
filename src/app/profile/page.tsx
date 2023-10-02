"use client"

import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

export default function Page() {

    const router = useRouter();

    const logout = async() => {
        try {
            await fetch('http://localhost:3000/api/users/logout');
            alert('Logout successful');
            router.push('/login');
        } catch (error:any) {
            console.log(error.message);
        }
    }

    return (
    <div>
        <h1>Successfully logged in!!</h1>
        <hr/>
        <button
        onClick={logout}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
        >
            Logout
        </button>
    </div>
    )
}

