const API_BASE = process.env.API_BASE

export async function generateStaticParams() {
    // use environment variables for api url in the future
    const postIds = await fetch(API_BASE + '/places').then((res) => res.json())

    return postIds.map((id: number) => ({ id: `${id}` }))
}

export default async function Page({ params }: { params: { id: string } }) {
    const { id, title, desc } = await fetch(`${API_BASE}/places/${params.id}`).then((res) => res.json())
    
    return (
        <>
            <h1>{title}</h1>
            <pre>{desc}</pre>
        </>
    )
}