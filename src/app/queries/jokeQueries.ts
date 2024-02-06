import { useEffect, useState } from "react";
import { useFetchAJoke } from "../hooks/jokeHook";
import { useJokeStore } from "../stores/jokeStore";

export const hasDataExpired = (expirationDate: string) => {
  const now = new Date();
  const expiration = new Date(expirationDate);
  return now >= expiration;
};

export const useQueryJoke = () => {
  const { joke, updateJokeData, updateJokeStorage } = useJokeStore();
  const [jokeInvalid, setJokeInvalid] = useState(false);
  const [enableQuery, setEnableQuery] = useState(false);
  const [fetchedJokeData, setFetchedJokeData] = useState<any>(null);

  const fetchJoke = useFetchAJoke({
    categories: ["Programming"],
    blacklistFlags: ["nsfw"],
  });

  useEffect(() => {
    const shouldFetchData = !joke || hasDataExpired(joke.storage.expiration);
    setJokeInvalid(shouldFetchData);
    if (shouldFetchData) {
      setEnableQuery(true);
    }
  }, [joke]);

  useEffect(() => {
    if (!fetchJoke.isLoading && fetchJoke.data) {
      setFetchedJokeData(fetchJoke.data);
      setEnableQuery(false);
      // Set zustand store with hook data
      updateJokeData(fetchJoke.data);
      const storageData = {
        requestTime: new Date().toISOString(),
        expiration: new Date(
          new Date().getTime() + 1000 * 60 * 60 * 24
        ).toISOString(),
      };
      updateJokeStorage(storageData);
    }
  }, [fetchJoke.data, fetchJoke.isLoading, updateJokeData, updateJokeStorage]);

  return {
    data: fetchedJokeData,
    dataInvalid: jokeInvalid,
    isLoading: fetchJoke.isLoading,
    enableQuery,
  };
};
