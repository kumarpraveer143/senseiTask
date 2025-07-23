"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Gamepad, Lock, User } from "lucide-react"
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center">
            {/* Game Icon */}
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gamepad className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Welcome to Sensei Game
              </h1>
              <p className="text-slate-600 dark:text-slate-300">
                Ready to challenge your mind?
              </p>
            </div>

            {session?.user ? (
              // User is logged in - Show game access
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-3 text-green-600 dark:text-green-400">
                  <User className="w-5 h-5" />
                  <span className="font-medium">Hello, {session.user.name}!</span>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <p className="text-green-800 dark:text-green-200 font-medium">
                    You can start the game!
                  </p>
                </div>
                <Link href="/game" className="block">
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    Start Game
                  </Button>
                </Link>
              </div>
            ) : (
              // User is not logged in - Show login requirement
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-3 text-amber-600 dark:text-amber-400">
                  <Lock className="w-5 h-5" />
                  <span className="font-medium">Login Required</span>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                  <p className="text-amber-800 dark:text-amber-200 font-medium">
                    You need to login first to play the game!
                  </p>
                </div>
                <Link href="/signin" className="block">
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    Login to Play
                  </Button>
                </Link>
              </div>
            )}

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {session?.user 
                  ? "Your progress will be saved automatically."
                  : "Create an account to save your progress and compete with others."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
