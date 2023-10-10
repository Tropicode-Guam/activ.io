const API_BASE = process.env.API_BASE
import { places } from '../../api/store'

interface Place {
    id: number,
    title: string,
    desc: string,
    pos: [number, number],
    type: string,
    state: string,
    img: string,
}

export async function generateStaticParams() {
    const response = await fetch(API_BASE + '/places', { next: { revalidate: 60 } })
    // console.log(await response.text())
    const postIds = await response.json()
    return postIds.map(({ id }: Place) => ({ id: `${id}` }))
}

export default async function Page({ params }: { params: { id: string } }) {

    const response = await fetch(`${API_BASE}/places/${params.id}`, { next: { revalidate: 60 } })

    const { id, title, desc } = await response.json()
    
    return (
        <>
            <h1>{title}</h1>
            <pre>{desc}</pre>
        </>
    )
}