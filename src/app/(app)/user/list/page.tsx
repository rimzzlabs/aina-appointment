import { Heading } from "@/components/ui/heading";
import { getUsers } from "@/database/query/user";
import { UserList, UserListAddButton } from "@/features/user/list";
import { F, O, pipe } from "@mobily/ts-belt";
import { Fragment } from "react";

export default async function UserListPage(props: PageProps) {
  let search = pipe(
    O.fromNullable(props.searchParams?.q),
    O.mapWithDefault("", F.identity)
  );
  let users = await getUsers(search);

  return (
    <Fragment>
      <nav className="flex items-center justify-between">
        <Heading>Daftar Pengguna</Heading>

        <UserListAddButton />
      </nav>

      <UserList users={users} />
    </Fragment>
  );
}
