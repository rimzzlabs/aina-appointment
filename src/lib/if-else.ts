import { isObject } from "radash";

export function isValidObject<D extends Record<any, any> | null | undefined>(
  obj: D,
  onValid: (obj: NonNullable<D>) => React.JSX.Element
) {
  if (isObject(obj) && Object.entries(obj).length > 0) {
    return onValid(obj);
  }

  return null;
}
