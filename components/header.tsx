import logo from '../public/Star-Wars-Logo.png'
import Image from 'next/image'

export const Header = () => {

    return (
        <header className=" border-b-2 border-slate-200 p-4">
            <Image className='h-20 w-auto'  src={ logo } alt="logo"/>
        </header>
    )
}