import { X } from "lucide-react";
import { memo } from "react";
import { Drawer } from "rsuite";
import DropdownList from "../Dropdown";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOrder, setSortBy, toggleFilterAndSort } from "@/store/app";

interface IProps {
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

const FilterAndSortDrawer: React.FC<IProps> = ({ onClear }) => {
  const { isFilterAndSortOpen: isOpen, sortBy, order } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const setSort = (val: string) => dispatch(setSortBy(val));
  const setSortOrder = (val: "asc" | "desc") => dispatch(setOrder(val));

  return (
    <Drawer open={isOpen} onClose={() => dispatch(toggleFilterAndSort())} size="min(500px,100%)">
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
                  onClick: () => setSort("name"),
                },
                {
                  label: "Company",
                  onClick: () => setSort("company_name"),
                },
                {
                  label: "Stage",
                  onClick: () => setSort("stage"),
                },
                {
                  label: "Engaged",
                  onClick: () => setSort("engaged"),
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
                  onClick: () => setSortOrder("asc"),
                },
                {
                  label: "Descending",
                  onClick: () => setSortOrder("desc"),
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
