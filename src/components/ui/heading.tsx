export function Heading(props: React.PropsWithChildren) {
  return <h2 className="text-2xl font-bold xl:text-4xl">{props.children}</h2>;
}
