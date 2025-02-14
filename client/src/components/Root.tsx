import { Toaster } from "sonner";
import "rsuite/Drawer/styles/index.css";
import "rsuite/Dropdown/styles/index.css";
import "rsuite/Pagination/styles/index.css";
import "rsuite/DatePicker/styles/index.css";
import "rsuite/Toggle/styles/index.css";
import "rsuite/Modal/styles/index.css";

interface IProps {
  children: React.ReactNode;
}

export default function Root({ children }: IProps) {
  return (
    <>
      <Toaster
        theme="light"
        position="top-right"
        toastOptions={{
          style: {
            background: "white",
            border: "1px solid #e2e8f0",
            padding: "16px",
            color: "#1a1a1a",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          },
        }}
        closeButton
        richColors
      />
      {children}
    </>
  );
}
