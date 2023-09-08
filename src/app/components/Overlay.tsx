'use client'

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Overlay() {
    const [scroll, setScroll] = useState(0);
    const [overlayAway, setOverlayAway] = useState(false);
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        function handleScroll(e) {
            setScroll(window.scrollY)
            if (window.scrollY>0) {
                setOverlayAway(true)
            }
        }
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        const hash = window.location.hash;
        if (hash == '#top') {
            setOverlayAway(false)
            router.push('/')
        }
    }, [params, router])

    return (
        <div className={'fixed grid bg-gray-200 header-overlay' + (overlayAway? ' away' : '')}>
            <div className="spacer"></div>
            <h1 className="text-center header-title">Activ.io</h1>
            <button id="header-button" onClick={() => {
                window.scroll(0,6)
                setOverlayAway(true)
            }}>V</button>
        </div>
    )
}