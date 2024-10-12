import { atom } from "jotai";

type ViewDoctorAtom = { open: boolean; doctor: Doctor | null };
type UpdateDoctorAtom = {
  open: boolean;
  doctor: Pick<Doctor, "id" | "name" | "availableDates" | "specialist"> | null;
};

export let viewDoctorAtom = atom<ViewDoctorAtom>({ open: false, doctor: null });
export let openViewDoctorAtom = atom(null, (_, set, doctor: Doctor) =>
  set(viewDoctorAtom, { open: true, doctor })
);
export let closeViewDoctorAtom = atom(null, (get, set) =>
  set(viewDoctorAtom, { ...get(viewDoctorAtom), open: false })
);

export let updateDoctorAtom = atom<UpdateDoctorAtom>({
  open: false,
  doctor: null,
});
export let openUpdateDoctorAtom = atom(
  null,
  (_, set, doctor: UpdateDoctorAtom["doctor"]) =>
    set(updateDoctorAtom, { open: true, doctor })
);
export let closeUpdateDoctorAtom = atom(null, (get, set) =>
  set(updateDoctorAtom, { ...get(updateDoctorAtom), open: false })
);
