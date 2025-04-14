import React from "react"
import prisma from "@/lib/prisma"
import Image from "next/image"
import { currentUser } from "@clerk/nextjs/server"
import { DocumentFilter } from "@/components/DocumentFilter"
import Link from "next/link"

export default async function Page() {
  const user = await currentUser()

  if (!user) return null

  const [, documents] = await Promise.all([
    prisma.user.findUnique({
      where: { clerkUserId: user.id },
      select: { id: true },
    }),
    prisma.document.findMany({
      where: {
        userId: (
          await prisma.user.findUnique({
            where: { clerkUserId: user.id },
            select: { id: true },
          })
        )?.id,
      },
      include: {
        history: {
          orderBy: {
            timestamp: "asc",
          },
          select: {
            id: true,
            timestamp: true,
            action: true,
          },
        },
      },
    }),
  ])

  if (documents.length === 0) {
    return (
      <div className='px-4 py-6 flex-1 overflow-x-auto'>
        <div className='flex items-center gap-2 justify-center mb-4'>
          <Image src='/pdf.png' width={40} height={40} alt='mes documents' />{" "}
          <h1 className='text-2xl md:text-3xl font-bold'>Mes Fichiers</h1>
        </div>
        <p className='text-center'>
          Retrouvez ici tous les documents que vous avez téléchargés
        </p>
        <div className=' flex flex-col gap-3 mb-8 px-4 md:w-4/5 mx-auto text-center mt-20 '>
          <span className='text-xl md:2xl font-semibold'>{`Vous n'avez pas encore converti vos documents`}</span>
          <Link
            href={"/"}
            className='text-secondary text-lg hover:underline hover:text-sky-700'
          >
            Commencer
          </Link>
        </div>
      </div>
    )
  }

  // @ts-expect-error "typage"
  return <DocumentFilter documents={documents} />
}
