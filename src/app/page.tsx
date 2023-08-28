import Image from 'next/image'
import LocalStore from './components/LocalStore'

export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      <LocalStore></LocalStore>
    </div>
  )
}
