import { atom } from "jotai";

type ViewUserAtom = { open: boolean; user: User | null };
type UpdateUserAtom = {
  open: boolean;
  user: Pick<User, "id" | "email" | "name"> | null;
};

export let viewUserAtom = atom<ViewUserAtom>({ open: false, user: null });
export let openViewUserAtom = atom(null, (_, set, user: User) =>
  set(viewUserAtom, { open: true, user })
);
export let closeViewUserAtom = atom(null, (get, set) =>
  set(viewUserAtom, { ...get(viewUserAtom), open: false })
);

export let updateUserAtom = atom<UpdateUserAtom>({ open: false, user: null });
export let openUpdateUserAtom = atom(
  null,
  (_, set, user: UpdateUserAtom["user"]) =>
    set(updateUserAtom, { open: true, user })
);
export let closeUpdateUserAtom = atom(null, (get, set) =>
  set(updateUserAtom, { ...get(updateUserAtom), open: false })
);
