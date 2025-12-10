import clsx from "clsx";

export function Step({
  children,
  visible,
}: {
  children: React.ReactNode;
  visible: boolean;
}) {
  return <div className={clsx(visible ? "block" : "hidden")}>{children}</div>;
}
