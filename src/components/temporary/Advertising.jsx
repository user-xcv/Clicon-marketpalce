import React, { useState } from 'react'
import ShopBtn from '../buttons/ShopBtn'
import { X } from 'lucide-react'

const Advertising = () => {
    const [close, SetClose] = useState(true)

    return (
        <>
            {close && (<div className='bg-[#191C1F] py-3 relative flex items-center'>
                <div className="mx-auto container">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="bg-[#F3DE6D] text-black -rotate-2 px-2 py-1 font-semibold">
                                Black
                            </div>
                            <p className='text-[#FFFFFF] text-xl '>Friday</p>
                        </div>
                        <div className="flex items-center gap-2 ">
                            <p className='font-medium text-white items-center'>Up to <span className='text-3xl text-yellow-400 '>59%</span>OFF</p>
                        </div>
                        <ShopBtn className='bg-yellow-400 px-3 py-2' />
                        <X className='absolute top-4 right-5 p-1 bg-[#303639] rounded-sm cursor-pointer ' onClick={() => SetClose(false)} color='white' size={30} />
                    </div>
                </div>
            </div>)}
        </>
    )
}

export default Advertising
