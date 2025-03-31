import { Wrapper } from "@/components/Wrapper"
import { currentUser } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"
import Providers from "./providers"

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
      <Providers>{children}</Providers>
    </Wrapper>
  )
}
