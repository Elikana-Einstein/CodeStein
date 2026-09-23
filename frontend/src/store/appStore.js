import { create } from "zustand";
import { subscribeWebSocketMessage } from "../services/webSoccket";

const useAppStore = create((set) => ({
    api_url: "http://localhost:8000",
    codes: null,

    getCodes: async () => {
        return subscribeWebSocketMessage((message) => {
            if (message.type === "code") {
                set({
                    codes: {
                        path: message.path,
                        code: message.code,
                    },
                });
            }
            console.log(message.code)
        });
    },
}));

export default useAppStore;