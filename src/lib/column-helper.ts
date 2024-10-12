import { N } from "@mobily/ts-belt";
import {
  type AccessorFn,
  createColumnHelper,
  type DeepKeys,
} from "@tanstack/react-table";

export function columnHelper<D>() {
  let ch = createColumnHelper<D>();
  type OnRenderAction = (data: D) => React.JSX.Element;

  function renderNumericColumn() {
    return ch.display({
      header: "No.",
      id: "number",
      cell: (props) => N.add(props.row.index, 1),
    });
  }

  function renderSimpleColumn(header: string) {
    return (accessor: AccessorFn<D> | DeepKeys<D>) => {
      return ch.accessor(accessor, { header });
    };
  }

  function renderColumn(header: string) {
    return (
      accessor: AccessorFn<D> | DeepKeys<D>,
      onRender: (data: D) => React.ReactNode
    ) => {
      return ch.accessor(accessor, {
        header,
        cell: (props) => onRender(props.row.original),
      });
    };
  }

  function renderAction(onRender: OnRenderAction) {
    return ch.display({
      header: "Menu action",
      id: "menu-action",
      cell: (props) => onRender(props.row.original),
    });
  }

  return {
    renderNumericColumn,
    renderSimpleColumn,
    renderAction,
    renderColumn,
  };
}
