import Image from 'next/image';
import Link from 'next/link';


const menuItems = [
    { label: 'Home', url: '/' },
    { label: 'About', url: '/about' },
    { label: 'Contact Us', url: '#contact' }
]

export default function Navbar() {
    return (
        <header className="flex flex-col gap-5 bg-lime-200">
            <div className="py-2 flex items-center place-content-between mx-4">
                <Link href="/">
                    <Image
                        width={40}
                        height={40}
                        src="/favicon.ico"
                        className="w-8 md:w-9"
                        alt="logo"
                    />
                </Link>
                <nav className='ml-8'>
                    <ul className='flex flex-wrap gap-x-8 text-gray-900'>
                        {menuItems.map(({label, url}, index) => (
                            <li key={index}>
                                <Link href={url}>{label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    )
}