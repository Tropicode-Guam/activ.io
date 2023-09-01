import { places } from '../store'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    // return a list of place ids
    const ids = places.map((place) => ({ 
        id: place.id, 
        title: place.title, 
        pos: place.pos, 
        desc: place.desc.substring(0,60),
        img: place.img
    }))
    return NextResponse.json(ids)
}