import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: NextRequest) {
  const body = await req.json()

  const event = body?.meta?.event_name
  const data = body?.data?.attributes
  const subscriptionId = body?.data?.id

  const customerEmail = data?.user_email || data?.customer_email
  const user = await prisma.user.findUnique({ where: { email: customerEmail } })
  if (!user)
    return NextResponse.json(
      { error: "Utilisateur introuvable" },
      { status: 404 }
    )

  switch (event) {
    case "subscription_created":
    case "subscription_updated":
      await prisma.subscription.upsert({
        where: { userId: user.id },
        update: {
          status: data.status,
          isActive: data.status === "active" || data.status === "trialing",
          trialEndsAt: data.trial_ends_at
            ? new Date(data.trial_ends_at)
            : undefined,
          currentPeriodEnd: new Date(data.renews_at),
          lemonsqueezyId: subscriptionId.toString(),
        },
        create: {
          userId: user.id,
          status: data.status,
          isActive: data.status === "active" || data.status === "trialing",
          trialEndsAt: data.trial_ends_at
            ? new Date(data.trial_ends_at)
            : undefined,
          currentPeriodEnd: new Date(data.renews_at),
          lemonsqueezyId: subscriptionId.toString(),
        },
      })
      break

    case "subscription_cancelled":
      await prisma.subscription.updateMany({
        where: { userId: user.id },
        data: { isActive: false, status: "cancelled" },
      })
      break
  }

  return NextResponse.json({ success: true })
}
