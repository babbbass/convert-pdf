import { Wrapper } from "@/components/Wrapper"
import { Header } from "@/components/Header"
import { currentUser } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await currentUser()

  if (!user) return null

  const dbUser = await prisma.user.findUnique({
    where: { clerkUserId: user.id },
  })

  if (!dbUser) {
    await prisma.user.create({
      data: {
        clerkUserId: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    })
  }
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  )
}
