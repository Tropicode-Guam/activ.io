import Image from 'next/image'
import Link from 'next/link'

const API_BASE = process.env.API_BASE

export default async function Home() {
  const places = await fetch(API_BASE + '/places').then((res) => res.json())

  return (
    <div>
      <h1>Hello World</h1>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
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
