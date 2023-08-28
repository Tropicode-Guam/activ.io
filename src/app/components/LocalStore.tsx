'use client'

import { useEffect, useState } from "react"

const STORE = 'counter'

export default function LocalStore() {
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        let ls = localStorage.getItem(STORE);
        if (ls === null) {
            ls = '0'
            localStorage.setItem(STORE, ls);
        }
        const count = parseInt(ls);
        setCounter(count);
    }, [])

    function handleClick() {
        const newCount = counter + 1;
        localStorage.setItem(STORE, `${newCount}`);
        setCounter(newCount);
    }

    return (
        <button onClick={handleClick}>{counter}</button>
    )
}