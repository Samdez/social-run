'use client'
import { subscribeToRun } from '@/app/(frontend)/(server)/queries/subscribe-to-run'
import { Button } from './ui/button'

export function SubscribeToRunButton({ runId, userId }: { runId: string; userId: string }) {
  async function handleSubscribe(runId: string) {
    await subscribeToRun(runId, userId)
  }

  return (
    <Button
      className="flex-1 bg-purple-600 hover:bg-purple-700"
      onClick={() => {
        handleSubscribe(runId)
      }}
    >
      S&apos;INSCRIRE
    </Button>
  )
}
