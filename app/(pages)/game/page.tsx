"use client";
import React, { useState } from "react";
import { questions as allQuestions, Question } from "@/lib/questions";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

function getRandomQuestions(qs: Question[], n: number) {
  const shuffled = [...qs].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export default function QuizGamePage() {
  const { data: session, status } = useSession();
  const [questions] = useState(() => getRandomQuestions(allQuestions, 10));
  const [answers, setAnswers] = useState<(number | null)[]>(Array(10).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Please sign in to play the quiz.</div>;

  const handleOptionChange = (qIdx: number, optIdx: number) => {
    if (submitted) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qIdx] = optIdx;
      return next;
    });
  };

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    let sc = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) sc += 10;
    });
    setScore(sc);
    setSubmitted(true);
    // Send score to backend
    try {
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: sc }),
      });
      if (!res.ok) throw new Error("Failed to submit score");
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || "Error submitting score");
      } else {
        setError("Error submitting score");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Technical Quiz Game</h1>
      {questions.map((q, i) => (
        <div key={q.id} className="mb-6">
          <div className="font-semibold mb-2">
            Q{i + 1}. {q.question} <span className="text-xs text-gray-500">[{q.category}]</span>
          </div>
          <div className="space-y-1">
            {q.options.map((opt, j) => (
              <label key={j} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={`q${i}`}
                  value={j}
                  checked={answers[i] === j}
                  disabled={submitted}
                  onChange={() => handleOptionChange(i, j)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}
      {!submitted ? (
        <Button onClick={handleSubmit} disabled={loading || answers.includes(null)}>
          {loading ? "Submitting..." : "Submit Quiz"}
        </Button>
      ) : (
        <div className="mt-4 text-lg font-bold">Your Score: {score} / 100</div>
      )}
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
} 