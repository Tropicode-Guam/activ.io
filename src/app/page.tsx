import Link from 'next/link'
import { Point } from './components/Map'
import Map from './components/Map'
import Image from "next/image";
import Overlay from './components/Overlay'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

async function getUsersLocation() {
  return [13.443, 144.7707];
}

// lazy loading map for now until russ' api done
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./components/Map'), {
  ssr: false,
  loading: () => <div id='map'></div>
});

export default async function Home() {
  const places: Point[] = await fetch(API_BASE + '/places', { next: { revalidate: 60 } }).then((res) => res.json())
  const center: number[] = await getUsersLocation(); 

  return (
    <div className="mx-auto">
      <div className='overlay-container'>
        <Overlay />
      </div>
      <DynamicMap center={center} points={places} />
      {/* <Map center={center} points={places} /> */}
      <div className="flap-container">
        <div className="flap"></div>
      </div>
      <ul className="grid justify-items-center gap-8 mt-8 mx-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {
          places.map((place: Point ) => (
            <li key={place.id}>
                <Link href={"/places/" + place.id}>
                    <div className="card max-w-sm rounded overflow-hidden shadow-lg dark:bg-zinc-800">
                        <Image className="w-full" src={place.img} alt={place.title} width={400} height={100} priority={true}/>
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
