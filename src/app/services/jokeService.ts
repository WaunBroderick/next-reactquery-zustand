import axios from "axios";

class jokeService {
  async fetchJoke({
    categories,
    blacklistFlags = [],
  }: {
    categories: Array<
      "Programming" | "Miscellaneous" | "Dark" | "Pun" | "Spooky" | "Christmas"
    >;
    blacklistFlags?: Array<
      "nsfw" | "religious" | "political" | "racist" | "sexist" | "explicit"
    >;
  }): Promise<any> {
    // Join categories array into a comma-separated string
    const categoriesStr = categories.join(",");

    // Join blacklistFlags array into a comma-separated string
    const blacklistFlagsStr = blacklistFlags.join(",");

    // Construct the URL with query parameters
    const url = `https://v2.jokeapi.dev/joke/${categoriesStr}`;

    // Check if there are any blacklist flags to add to the URL
    const urlWithParams = blacklistFlagsStr
      ? `${url}?blacklistFlags=${blacklistFlagsStr}`
      : url;

    // Make a GET request instead of POST
    const response = await axios.get(urlWithParams, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    return response.data;
  }
  catch(error: any) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      const errorMessage = error.response?.data?.message || error.message;
      console.error("Error fetching the joke:", errorMessage);

      // Optionally, throw a custom error or handle it as needed
      throw new Error(`Error fetching joke: ${errorMessage}`);
    } else {
      // Handle non-Axios errors
      console.error("An unexpected error occurred:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}

export default new jokeService();
