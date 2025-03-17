import { SignUp } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className='flex justify-center flex-1 mt-30'>
      <SignUp />
    </div>
  )
}
