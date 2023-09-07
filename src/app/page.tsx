import Link from 'next/link'
import { Point } from './components/Map'
import Map from './components/Map'
import Image from "next/image";

const API_BASE = process.env.API_BASE

export default async function Home() {
  const places: Point[] = await fetch(API_BASE + '/places').then((res) => res.json())

  return (
    <div className="mx-auto">
      <Map points={places}/>
      <ul className="grid justify-items-center gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {
          places.map((place: Point ) => (
            <li key={place.id}>
                <Link href={"/places/" + place.id}>
                    <div className="max-w-sm rounded overflow-hidden shadow-lg dark:bg-zinc-800">
                        <Image className="w-full" src={place.img} alt={place.title} width={400} height={100}/>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{place.title}</div>
                            <p className="text-gray-700 text-base card-desc" >{place.desc}...
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{place.type}</span>
                        </div>
                    </div>
                </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
