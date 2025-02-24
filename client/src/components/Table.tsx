import { CircleCheck, Clock4, MoreVertical, Trash } from "lucide-react";
import DropdownList from "./Dropdown";
import { getInitials } from "@/services/utils/helpers";
import { Pagination, Tooltip, Whisper } from "rsuite";
import { ILead, STAGE_LEVELS, StageType } from "@/types/lead";
import { memo } from "react";
import moment from "moment";
import InfiniteLoader from "./Loader";
import TableSkeleton from "./TableSkeleton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentPage, setItemsPerPage } from "@/store/app";

interface TableProps {
  isLoading: boolean;
  data: ILead[];
  totalPages: number;
  totalCount: number;
  selectedLeads: number[];
  handleSelection: (ids: number[]) => void;
  onEdit: (lead: ILead) => void;
  handleDelete: (bulk?: boolean, id?: number) => void;
}

const Table: React.FC<TableProps> = ({
  isLoading,
  data,
  totalCount,
  selectedLeads,
  handleSelection,
  onEdit,
  handleDelete,
}) => {
  const { itemsPerPage, currentPage } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const onItemsPerPageChange = (val: number) => dispatch(setItemsPerPage(val));
  const onPageChange = (val: number) => dispatch(setCurrentPage(val));

  const renderStageIndicator = (stage: StageType) => {
    const stageValue = STAGE_LEVELS[stage];
    return (
      <Whisper
        placement="top"
        controlId="control-id-hover"
        trigger="hover"
        speaker={
          <Tooltip>
            <span className="capitalize">{stage?.toLowerCase()}</span>
          </Tooltip>
        }>
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`w-1.5 h-5 rounded-sm ${i <= stageValue ? "bg-[#6A1BE0]" : "bg-gray-200"}`} />
          ))}
        </div>
      </Whisper>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {isLoading && <InfiniteLoader />}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="w-12 py-3 px-4">
                <input
                  onChange={() => handleSelection(data.map((lead) => lead.id!))}
                  type="checkbox"
                  className="rounded border-gray-300 accent-[#6A1BE0] focus:ring-[#6A1BE0]"
                />
              </th>
              <th className="py-3 px-4 text-left text-xs sm:text-sm font-medium text-gray-500">Name</th>
              <th className="py-3 px-4 text-left text-xs sm:text-sm font-medium text-gray-500">Company</th>
              <th className="py-3 px-4 text-left text-xs sm:text-sm font-medium text-gray-500">Stage</th>
              <th className="py-3 px-4 text-left text-xs sm:text-sm font-medium text-gray-500">Engaged</th>
              <th className="py-3 px-4 text-left text-xs sm:text-sm font-medium text-gray-500 whitespace-nowrap">
                Last Contacted
              </th>
              <th className="w-12 py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <input
                      onChange={() => handleSelection([lead.id!])}
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id!)}
                      className="rounded border-gray-300 accent-[#6A1BE0] focus:ring-[#6A1BE0]"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#6A1BE0]/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-[#6A1BE0]">{getInitials(lead.name)}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{lead.name}</div>
                        <div className="text-xs sm:text-sm text-gray-500">{lead.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500 whitespace-nowrap">{lead.company_name}</td>
                  <td className="py-3 px-4">{renderStageIndicator(lead.stage)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex gap-1 items-center py-0.5 px-1.5 rounded text-xs font-medium whitespace-nowrap border ${
                        lead.engaged
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-gray-100 text-gray-800 border-gray-300"
                      }`}>
                      {!lead.engaged ? <Clock4 size={10} /> : <CircleCheck size={10} />}
                      {lead.engaged ? "Engaged" : "Not Engaged"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500 whitespace-nowrap">
                    {lead.last_contacted_at ? moment(lead.last_contacted_at).format("DD MMM, YYYY") : "-"}
                  </td>
                  <td className="py-3 px-4">
                    <DropdownList
                      placement="leftStart"
                      customRender
                      renderToggle={(props, ref) => (
                        <button {...props} ref={ref} className={"flex items-center gap-2 text-sm cursor-pointer"}>
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      )}
                      value=""
                      items={[
                        {
                          label: "Edit",
                          onClick: () => onEdit(lead),
                        },
                        {
                          label: "Delete",
                          onClick: () => handleDelete(false, lead.id!),
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))
            ) : isLoading ? (
              <TableSkeleton rows={itemsPerPage} />
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="flex items-center flex-col max-sm:gap-4 max-sm:items-start sm:flex-row justify-between px-4 py-3 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <DropdownList
            placement="topStart"
            value={`${itemsPerPage} per page`}
            items={[
              {
                label: "10 per page",
                onClick: () => onItemsPerPageChange(10),
              },
              {
                label: "20 per page",
                onClick: () => onItemsPerPageChange(20),
              },
              {
                label: "50 per page",
                onClick: () => onItemsPerPageChange(50),
              },
              {
                label: "100 per page",
                onClick: () => onItemsPerPageChange(100),
              },
            ]}
          />
        </div>

        <div className="flex items-center gap-2 max-sm:w-full max-sm:justify-center">
          <Pagination
            prev
            next
            last
            first
            size="sm"
            total={totalCount}
            limit={itemsPerPage}
            ellipsis
            maxButtons={window.innerWidth < 500 ? 2 : 5}
            activePage={currentPage}
            onChangePage={(page) => onPageChange(page)}
          />
        </div>
        <div className="max-md:hidden">
          <button
            onClick={() => handleDelete(true)}
            className={`transition-all ${
              selectedLeads.length > 0 ? "opacity-100 cursor-pointer" : "opacity-0 cursor-not-allowed"
            } flex items-center justify-center gap-2 text-sm outline-none hover:shadow text-primary py-1 px-2 bg-white border border-primary rounded-lg w-full sm:w-auto`}>
            <Trash size={14} />
            Bulk Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Table);
