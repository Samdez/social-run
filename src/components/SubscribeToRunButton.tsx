'use client'
import { subscribeToRun } from '@/app/(frontend)/(server)/queries/subscribe-to-run'
import { Button } from './ui/button'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export function SubscribeToRunButton({ runId, userId }: { runId: string; userId?: string }) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubscribe(runId: string) {
    if (!userId) {
      toast.error('Vous devez être connecté pour vous inscrire à un run')
      return
    }
    setIsLoading(true)
    await subscribeToRun(runId, userId)
    setIsLoading(false)
  }

  return (
    <Button
      className="flex-1 bg-purple-600 hover:bg-purple-700"
      onClick={() => {
        handleSubscribe(runId)
      }}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "S'INSCRIRE"}
    </Button>
  )
}
