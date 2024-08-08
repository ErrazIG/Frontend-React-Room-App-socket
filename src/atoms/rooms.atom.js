import { atomFamily } from "recoil";

export const roomState = atomFamily({
  key: "roomState",
  default: {
    id: "",
    users: [],
  },
});
