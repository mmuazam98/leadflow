import React from "react";

interface IProps {
  children: React.ReactNode;
}
const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <main className="bg-[#FAF9F5] min-h-[calc(100svh-60px)]">
      <section className="max-w-7xl mx-auto py-10 max-sm:px-4 max-md:px-10 max-xl:px-20">{children}</section>;
    </main>
  );
};
export default Layout;
