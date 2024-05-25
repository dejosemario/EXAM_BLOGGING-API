import React from 'react'

export default function container({children}: {children: React.ReactNode}) {
    return (
        <div className='max-w-[1100px] mx-auto bg-white flex flex-col min-h-screen border-x'>{children}</div>
    )
}