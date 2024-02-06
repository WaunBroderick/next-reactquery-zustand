"use client";

import Image from "next/image";
import { useJokeStore } from "./stores/jokeStore";
import { useQueryJoke } from "./queries/jokeQueries";

export default function Home() {
  // Query functions
  const { joke } = useJokeStore();
  const {
    data: jokeData,
    dataInvalid: jokeError,
    isLoading: jokeIsLoading,
  } = useQueryJoke();

  console.log(jokeData);
  console.log(joke);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Heres some joke data</h1>
      </div>
    </main>
  );
}
