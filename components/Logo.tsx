import Link from "next/link"
import Image from "next/image"

export function Logo() {
  return (
    <>
      <Link href={"/"} className='flex items-center'>
        <Image
          src='/logo.png'
          alt='logo'
          width={30}
          height={30}
          className='rounded-2xl mr-2'
        />
        <p className='text-xl md:text-3xl italic font-bold text-primary text-center md:text-left'>
          SmartDocs
        </p>
      </Link>
    </>
  )
}
