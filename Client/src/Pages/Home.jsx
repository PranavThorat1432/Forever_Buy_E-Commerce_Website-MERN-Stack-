import React from 'react'
import Hero from '../MyComponents/Hero'
import LatestCollection from '../MyComponents/LatestCollection'
import BestSeller from '../MyComponents/BestSeller'
import OurPolicy from '../MyComponents/OurPolicy'
import NewLetterBox from '../MyComponents/NewLetterBox'

const Home = () => {
  return (
    <div>
        <Hero/>

        <LatestCollection/>

        <BestSeller/>

        <OurPolicy/>

        <NewLetterBox/>
    </div>
  )
}

export default Home
