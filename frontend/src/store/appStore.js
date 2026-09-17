import { create } from "zustand";

const useAppStore = create(() => ({
    api_url: "http://localhost:8000",
}));

export default useAppStore;