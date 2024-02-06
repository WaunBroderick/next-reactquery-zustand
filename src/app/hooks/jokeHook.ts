import { useQuery, useQueryClient } from "@tanstack/react-query";
import fetchJoke from "../services/jokeService";
import jokeService from "../services/jokeService";

// Assuming these types are defined in the same file or imported from another
type Category =
  | "Programming"
  | "Miscellaneous"
  | "Dark"
  | "Pun"
  | "Spooky"
  | "Christmas";
type BlacklistFlag =
  | "nsfw"
  | "religious"
  | "political"
  | "racist"
  | "sexist"
  | "explicit";

interface UseGetAJokeOptions {
  categories: Category[];
  blacklistFlags?: BlacklistFlag[];
}

const useFetchAJoke = ({
  categories,
  blacklistFlags = [],
}: UseGetAJokeOptions) => {
  const { data, isLoading, isError, error, refetch, isSuccess } = useQuery({
    queryKey: ["joke", categories, blacklistFlags],
    queryFn: () => jokeService.fetchJoke({ categories, blacklistFlags }),
    staleTime: 5 * 60 * 1000, // data is considered fresh for 5 minutes
    refetchOnWindowFocus: false, // refetching on window focus can be too aggressive, so it's turned off
    refetchOnReconnect: true, // refetch when the connection is restored
    refetchOnMount: true, // only refetch when parameters change, not every mount
    retry: 1, // retry failed queries once before throwing an error
    retryDelay: (attempt: any) => Math.min(1000 * 2 ** attempt, 30000), // use exponential backoff for retry delays
  });
  if (error) {
    console.error("Error fetching the joke:", error);
  }
  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isSuccess,
  };
};

export { useFetchAJoke };
