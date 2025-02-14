import AddOrEditLeadDrawer from "@/components/Drawers/AddOrEditLeadDrawer";
import FilterAndSortDrawer from "@/components/Drawers/FilterAndSortDrawer";
import Layout from "@/components/Layout";
import ConfirmModal from "@/components/Modals/Confirm";
import Table from "@/components/Table";
import useLeads from "@/hooks/useLeads";
import { getStartAndEnd } from "@/services/utils/helpers";
import { CloudDownload, ListFilter, Plus, Search, Trash } from "lucide-react";

export default function Home() {
  const {
    data: leadsResponse,
    currentPage,
    itemsPerPage,
    sortBy,
    order,
    searchText,
    selectedLeads,
    isLeadsLoading,
    isLeadDrawerOpen,
    isFilterAndSortOpen,
    leadToEdit,
    isModalOpen,
    handleSelection,
    exportAll,
    setSortBy,
    setOrder,
    setCurrentPage,
    setItemsPerPage,
    onClear,
    setSearchText,
    onEdit,
    setIsLeadDrawerOpen,
    setIsFilterAndSortOpen,
    setLeadToEdit,
    setIsModalOpen,
    onConfirmAction,
    handleDelete,
    onSave,
  } = useLeads();

  return (
    <Layout>
      <AddOrEditLeadDrawer
        leadToEdit={leadToEdit}
        isEditFlow={!!leadToEdit}
        isOpen={isLeadDrawerOpen}
        close={() => {
          setIsLeadDrawerOpen(false);
          setLeadToEdit(null);
        }}
        onSave={onSave}
      />
      <FilterAndSortDrawer
        isOpen={isFilterAndSortOpen}
        close={() => setIsFilterAndSortOpen(false)}
        setOrder={(val) => setOrder(val)}
        setSortBy={(val) => setSortBy(val)}
        onClear={onClear}
        order={order}
        sortBy={sortBy}
      />
      <ConfirmModal
        close={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        title="Please Confirm"
        subtitle={
          selectedLeads.length > 0
            ? `Are you sure you want to delete all ${selectedLeads.length} leads?`
            : "Are you sure you want to delete this lead?"
        }
        onCancel={() => setIsModalOpen(false)}
        onConfirm={() => {
          onConfirmAction();
          setIsModalOpen(false);
        }}
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
        <div className="max-md:text-3xl text-4xl font-semibold leading-9 sm:leading-10 !font-fraunces">Leads</div>

        <div className="flex flex-col max-sm:flex-col-reverse sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={() => handleDelete(true)}
            className={`transition-all ${
              selectedLeads.length > 0 ? "opacity-100 cursor-pointer" : "opacity-0 max-sm:hidden cursor-not-allowed"
            } flex items-center justify-center gap-2 outline-none cursor-pointer hover:shadow text-primary py-2 px-4 bg-white border border-primary rounded-lg w-full sm:w-auto`}>
            <Trash size={14} />
            Bulk Delete
          </button>
          <button
            onClick={() => {
              setIsLeadDrawerOpen(true);
              setLeadToEdit(null);
            }}
            className="transition-all flex items-center justify-center gap-2 outline-none cursor-pointer hover:shadow text-gray-900 py-2 px-4 bg-white border border-[#DBDADD] rounded-lg w-full sm:w-auto">
            <Plus size={18} />
            Add Lead
          </button>
          <button
            onClick={exportAll}
            className="transition-all flex items-center justify-center gap-2 outline-none cursor-pointer hover:shadow text-white py-2 px-4 bg-primary border border-primary rounded-lg w-full sm:w-auto">
            <CloudDownload size={18} />
            Export All
          </button>
        </div>
      </div>

      <div className="flex mb-5 w-full gap-2 max-md:flex-col">
        <div className="relative w-full flex items-center">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            id="text"
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-10 w-full p-3 bg-white border border-gray-200 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A1BE0] focus:border-transparent"
            placeholder="Search by lead's name, email or company name"
            required
          />
        </div>
        <button
          onClick={() => setIsFilterAndSortOpen(true)}
          className="transition-all flex items-center justify-center gap-2 outline-none cursor-pointer hover:shadow text-gray-900 py-2 px-4 bg-white border border-[#DBDADD] rounded-lg whitespace-nowrap">
          <ListFilter size={18} />
          Filter & Sort
        </button>
      </div>

      <div className="flex flex-col gap-2 self-stretch">
        <p
          className={`text-[#646069] text-xs ${
            leadsResponse?.meta?.total_count && leadsResponse?.meta?.total_count > 0 ? "" : "opacity-0"
          }`}>
          Showing {getStartAndEnd(leadsResponse?.meta)} of {leadsResponse?.meta?.total_count ?? 0} leads.
        </p>
        <Table
          data={leadsResponse?.data ?? []}
          currentPage={currentPage}
          totalCount={leadsResponse?.meta?.total_count ?? 0}
          onPageChange={setCurrentPage}
          totalPages={leadsResponse?.meta?.total_pages ?? 1}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          handleDelete={handleDelete}
          onEdit={onEdit}
          selectedLeads={selectedLeads}
          handleSelection={handleSelection}
          isLoading={isLeadsLoading}
        />
      </div>
    </Layout>
  );
}
