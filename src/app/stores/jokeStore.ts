import { create } from "zustand";

interface IStorage {
  requestTime: string;
  expiration: string;
}

interface IJoke {
  data: IJokeData;
  storage: IStorage;
}
interface IJokeData {
  key: string;
  id: number;
  category: string;
  error: boolean;
  flags: any;
  lang: string;
  setup: string;
  type: string;
}

interface State {
  joke: IJoke | null;
}

interface Actions {
  selectJoke: (joke: IJoke | null) => void;
  updateJokeData: (data: IJoke) => void;
  updateJokeStorage: (storage: IStorage) => void;
}

const INITIAL_STATE: State = {
  joke: null,
};

export const useJokeStore = create<State & Actions>((set: any, get: any) => ({
  ...INITIAL_STATE,

  selectJoke: (joke: IJoke | null) => {
    get({ joke });
  },
  updateJokeData: (data: IJoke) => {
    set((state: State) => {
      if (state.joke) {
        return {
          joke: {
            ...state.joke,
            data: data,
          },
        };
      } else {
        return {
          joke: {
            data: data,
            storage: {} as IStorage,
          },
        };
      }
    });
  },
  updateJokeStorage: (storage: IStorage) =>
    set((state: any) => ({
      joke: state.joke
        ? { ...state.joke, storage }
        : { storage, data: {} as IJokeData },
    })),
}));
