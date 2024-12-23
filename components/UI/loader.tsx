import React from 'react'
import { RiLoader5Fill } from 'react-icons/ri'

export const Loader = () => {
  return (
    <div className='w-screen h-screen fixed top-0 left-0 backdrop-blur-xl z-50 flex items-center justify-center'>
        <RiLoader5Fill className='text-4xl animate-spin' />
    </div>
  )
}
