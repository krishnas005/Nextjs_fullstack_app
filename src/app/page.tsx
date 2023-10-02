import Head from "next/head"
import Link from "next/link"

export default function Home() {
  return (
    <main>
      <Head>
        <title>Home Page</title>
      </Head>
      <div className="mt-8 gap-6 flex justify-center text-3xl text-bold">
      <div><Link href={'/login'}>Login</Link></div>
      <div><Link href={'/signup'}>Sign Up</Link></div>
      <div><Link href={'/contact'}>Contact</Link></div>
      </div>
    </main>
  )
}
