import React from 'react'
import Navbar from '../../components/Navbar';
import { fetchNosaltres } from './api/fetching';

export default function Nosaltres () {
  return (
    <>
    <Navbar/>
    </>
  )
}

export async function getStaticProps(){
  return fetchNosaltres();
}