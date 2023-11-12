'use client'

const API_BASE = process.env.API_BASE

async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement)
    const json: { [key: string]: string | number } = {}

    formData.forEach((value, key) => {
        if (key == 'lat' || key == 'lon') {
            if (~~value) {
                json[key] = ~~value
            }
        } else {
            json[key] = String(value)
        }
    })
    if (json.lat || json.lon) {
        delete json.google_maps_link
    }

    const res = await fetch(`${API_BASE}/places`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(json)
    })

    const url = document.location.href
    document.location.href = url.substring(0, url.lastIndexOf('/') + 1)
}

export default function page() {
    const inputs = {
        'name': 'text',
        'description': 'textarea',
        'short_description': 'textarea',
        'image_link': 'text',
        'google_maps_link': 'text',
        'lat': 'number',
        'lon': 'number',
        'type': 'text',
        // 'lang_pref': 'text',
        // 'author': 'number'
    }

    return (
        <>
            <form method="post" onSubmit={submit}>
                <ul>
                    {Object.entries(inputs).map(([key, value]) => {
                        return <li key={key}>
                            <label>{key}
                                {
                                    value === "textarea" ? 
                                        <textarea className="text-black" name={key}></textarea>
                                    :
                                        <input className="text-black" name={key} type={value}/>
                                }
                            </label>
                        </li>
                    })}
                    <li>
                        <button type="submit">Submit place</button>
                    </li>
                </ul>
            </form>
        </>
    )
}