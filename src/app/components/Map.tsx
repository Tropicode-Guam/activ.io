'use client'

import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Image from 'next/image';
import ReactDOMServer from 'react-dom/server';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FaDirections } from 'react-icons/fa';

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

export interface Point { 
  id: number, 
  title: string, 
  desc: string, 
  pos: L.LatLngTuple, 
  img: string, 
  type: string, 
  state: string
}

interface MapProps {
    points: Point[]
}

export default function Map({ points }: MapProps
) {
    const mapRef = useRef<L.Map | null>(null)
    const markerRefs = useRef<L.Marker[]>([])

    // init
    useEffect(() => {
        const mapParams: L.MapOptions = {
            center: L.latLng(13.443, 144.7707),
            zoom: 11,
            zoomControl: false,
            maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
            layers: [MAP_TILE]
        }
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
        points.forEach((p: Point) => {
            const icon = (icons as any)[p.type] ?? icons.default;
            const marker = L.marker(p.pos, {icon: icon}).addTo(mapRef.current!)
            
            marker.bindPopup(`
                <div class="bubble">`
                + ReactDOMServer.renderToString(<Image 
                    src={p.img} 
                    alt={p.title} 
                    width={225} 
                    height={100}></Image>) +
                    `<div class="content">` + 
                        ReactDOMServer.renderToString(
                            <div className='bubble-title-container'>
                                <Link href={'/places/' + p.id}><b>{p.title}</b></Link>
                                <a
                                    target='_blank'
                                    href={`https://maps.google.com?q=${(p.title + ' ' + p.state).split(' ').join('+')}`}
                                >
                                    <FaDirections />
                                </a>
                            </div>
                        ) +   
                    `   <p>${p.desc}...</p>
                    <div>
                </div>
            `);
        });
    }, [points])

    //eventhandler
    useEffect(() => {

    }, [])

    return (
        <>
            <div id="map"></div>
        </>
    )
}