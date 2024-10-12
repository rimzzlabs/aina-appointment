import { DataTable } from "@/features/shared";
import { USER_LIST_COLUMN } from "./user-list-column";
import { Fragment } from "react";
import { UserListColumnView } from "./user-list-column-view";
import { UserListColumnUpdate } from "./user-list-column-update";

type TUserList = { users: Array<User & { appointments: Array<Appointment> }> };
export async function UserList(props: TUserList) {
  return (
    <Fragment>
      <DataTable columns={USER_LIST_COLUMN} data={props.users} />
      <UserListColumnView />
      <UserListColumnUpdate />
    </Fragment>
  );
}
