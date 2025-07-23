"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function LeaderboardPage() {
  const { data: session } = useSession();
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [user, setUser] = useState<{ rank: number; maxScore: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/quiz/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        setLeaderboard(data.leaderboard || []);
        setUser(data.user || null);
        setLoading(false);
      })
      .catch((e) => {
        setError("Failed to load leaderboard");
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Leaderboard</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="w-full border-collapse text-sm bg-white dark:bg-slate-900">
              <thead>
                <tr className="bg-gray-100 dark:bg-slate-800">
                  <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">Rank</th>
                  <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">Name</th>
                  <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">Email</th>
                  <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">Max Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((u, i) => {
                  const isCurrent = session?.user?.email === u.email;
                  return (
                    <tr
                      key={u.email}
                      className={
                        isCurrent
                          ? "bg-yellow-100 dark:bg-yellow-900/40 font-bold"
                          : i % 2 === 0
                          ? "bg-white dark:bg-slate-900"
                          : "bg-gray-50 dark:bg-slate-800"
                      }
                    >
                      <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{i + 1}</td>
                      <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{u.name || "-"}</td>
                      <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{u.email}</td>
                      <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{u.maxScore}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {user && (
            <div className="p-4 mt-4 bg-blue-50 dark:bg-blue-900/40 rounded-lg text-blue-900 dark:text-blue-200 font-semibold">
              Your Rank: {user.rank} &nbsp;|&nbsp; Max Score: {user.maxScore}
            </div>
          )}
        </>
      )}
    </div>
  );
} 