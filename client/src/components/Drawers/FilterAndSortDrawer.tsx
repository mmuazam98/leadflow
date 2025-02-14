import { IOverlayProps } from "@/types/overlay";
import { X } from "lucide-react";
import { memo } from "react";
import { Drawer } from "rsuite";
import DropdownList from "../Dropdown";

interface IProps extends IOverlayProps {
  sortBy: string;
  order: string;
  setSortBy: (value: string) => void;
  setOrder: (value: string) => void;
  onClear: () => void;
}

const SORT_BY_MAP: Record<string, string> = {
  default: "Default",
  name: "Name",
  company_name: "Company",
  stage: "Stage",
  engaged: "Engaged",
};

const ORDER_BY_MAP: Record<string, string> = {
  asc: "Ascending",
  desc: "Descending",
};

const FilterAndSortDrawer: React.FC<IProps> = ({ isOpen, order, sortBy, setOrder, setSortBy, onClear, close }) => {
  return (
    <Drawer open={isOpen} onClose={close} size="min(500px,100%)">
      <Drawer.Header>
        <Drawer.Title>Filter & Sort</Drawer.Title>
        <Drawer.Actions>
          <div className="flex">
            <button
              onClick={onClear}
              className="transition-all flex items-center justify-center gap-2 outline-none cursor-pointer hover:shadow text-gray-500 py-2 pl-3 pr-4 bg-white rounded-lg">
              <X size={18} />
              Clear
            </button>
          </div>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body className="!p-6">
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Sort By
            </label>
            <DropdownList
              value={SORT_BY_MAP[sortBy]}
              className="w-full p-3 flex gap-2 items-center justify-between bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A1BE0] focus:border-transparent"
              items={[
                {
                  label: "Name",
                  onClick: () => setSortBy("name"),
                },
                {
                  label: "Company",
                  onClick: () => setSortBy("company_name"),
                },
                {
                  label: "Stage",
                  onClick: () => setSortBy("stage"),
                },
                {
                  label: "Engaged",
                  onClick: () => setSortBy("engaged"),
                },
              ]}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Order
            </label>
            <DropdownList
              value={ORDER_BY_MAP[order]}
              className="w-full p-3 flex gap-2 items-center justify-between bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A1BE0] focus:border-transparent"
              items={[
                {
                  label: "Ascending",
                  onClick: () => setOrder("asc"),
                },
                {
                  label: "Descending",
                  onClick: () => setOrder("desc"),
                },
              ]}
            />
          </div>
        </div>
      </Drawer.Body>
    </Drawer>
  );
};

export default memo(FilterAndSortDrawer);
