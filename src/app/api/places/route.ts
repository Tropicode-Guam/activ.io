import { places } from '../store'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    // return a list of place ids
    const ids = places.map((place) => ({ id: place.id, title: place.title }))
    return NextResponse.json(ids)
}