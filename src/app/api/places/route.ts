import { places } from '../store'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    // return a list of place ids
    const ids = places.map((place) => ({ 
        ...place,
        desc: place.desc.substring(0,60),
    }))
    return NextResponse.json(ids)
}