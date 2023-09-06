import Link from 'next/link'
import Map from './components/Map'
import { Point } from './components/Map'

const API_BASE = process.env.API_BASE

export default async function Home() {
  const places: Point[] = await fetch(API_BASE + '/places').then((res) => res.json())

  return (
    <div>
      <Map points={places}/>
      <ul>
        {
          places.map((place: { id: number; title: string }) => (
            <li key={place.id}>
              <Link href={"/places/" + place.id}>
                {place.title}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
