import { ReactElement, ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface LayoutProps {
  children?: ReactNode;
}

function Layout({ children }: LayoutProps): ReactElement {
  return (
    <>
      <main className="p-6 flex flex-col gap-8">
        {children ? children : <Outlet />}
      </main>
    </>
  );
}

export { Layout };