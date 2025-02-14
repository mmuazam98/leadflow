import useScrollTop from "@/hooks/useScrollTop";
import { ChevronUp } from "lucide-react";
import React from "react";

interface IProps {
  children: React.ReactNode;
}
const Layout: React.FC<IProps> = ({ children }) => {
  const scrollTop = useScrollTop();
  return (
    <main className="bg-[#FAF9F5] min-h-[calc(100svh-60px)]">
      <section className="max-w-7xl mx-auto py-10 max-sm:px-4 max-md:px-10 max-xl:px-20">{children}</section>;
      {scrollTop > 200 ? (
        <div
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="fixed bottom-5 left-5 bg-primary rounded-full p-4 shadow cursor-pointer hover:shadow-lg">
          <ChevronUp size={24} color="white" />
        </div>
      ) : null}
    </main>
  );
};
export default Layout;
