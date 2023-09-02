'use client'

import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Image from 'next/image';
import ReactDOMServer from 'react-dom/server';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const MAP_TILE = L.tileLayer(
    `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
    {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
);

interface IconMap {
    [key: string]: L.Icon | undefined
}

export default function Map({ points }: 
    { id: number, title: string, desc: string, pos: number[], img: string, type: string
}) {
    const mapRef = useRef<L.Map | null>(null)
    const markerRefs = useRef<L.Marker[]>([])
    const poppedOut = useRef<L.Marker | null>(null)

    const mapParams: L.MapOptions = {
        center: L.latLng(13.443, 144.7707),
        zoom: 11,
        zoomControl: false,
        maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
        layers: [MAP_TILE]
    }

    // init
    useEffect(() => {
        mapRef.current = L.map('map', mapParams)
        return () => {
            if (mapRef.current) {
                mapRef.current.remove()
            }
        }
    }, [])

    //control
    useEffect(() => {
        // L.control
        //     .layers({
        //         OpenStreetMap: MAP_TILE
        //     })
        //     // ! after a variable asserts that it's not null
        //     .addTo(mapRef.current!)
        
        L.control.zoom({
            position: 'topright'
        })
        .addTo(mapRef.current!)
    }, [])

    //markers
    useEffect(() => {
        const icons: IconMap = {
            hike: L.icon({
                iconUrl: 'hike_marker.png',
                iconSize: [20, 35],
                iconAnchor: [10, 35],
                popupAnchor: [0, -5]
            }),
            default: L.icon({
                iconUrl: 'marker.png',
                iconSize: [20, 35],
                iconAnchor: [10, 35],
                popupAnchor: [0, -5]
            })
        }
        points.forEach((p: { type: string ; pos: L.LatLngExpression; img: string ; title: string; id: number; desc: string; }) => {
            const icon = (icons as any)[p.type] ?? icons.default;
            const marker = L.marker(p.pos, {icon: icon}).addTo(mapRef.current!)
            
            marker.bindPopup(`
                <div class="bubble">`
                + ReactDOMServer.renderToString(<Image 
                    src={p.img} 
                    alt={p.title} 
                    width={150} 
                    height={100}></Image>) +
                    `<div class="content">` + 
                        ReactDOMServer.renderToString(
                            <Link href={'/places/' + p.id}><b>{p.title}</b></Link>
                        ) +   
                    `   <p>${p.desc}...</p>
                    <div>
                </div>
            `);
            marker.on('mouseover', e => {
                if (marker != poppedOut.current) {
                    poppedOut.current = marker
                    marker.openPopup()
                }
            })
        });
    }, [])

    //eventhandler
    useEffect(() => {
        mapRef.current!.on('click', () => {
            poppedOut.current = null
        })
    }, [])

    return (
        <>
            <div id="map"></div>
        </>
    )
}