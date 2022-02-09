import Head from 'next/head'
import dynamic from 'next/dynamic'

import { meta } from '@data/appData'

import Header from '@components/Header'
import Footer from '@components/Footer'
// import SoundBoard from '@components/SoundBoard'
const SoundBoard = dynamic(() => import('@components/SoundBoard'))

export default function Home() {
  return (
    <div className="w-full h-full absolute">
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Header />

      <SoundBoard />
      <Footer />
    </div>
  )
}
