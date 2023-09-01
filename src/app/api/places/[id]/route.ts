import { NextResponse } from 'next/server'

import { places } from '../../store'

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const place = places.filter((place) => (`${place.id}` == params.id))[0]
    return NextResponse.json(place)
}