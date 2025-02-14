import { queryClient } from "@/main";
import {
  bulkDeleteLeads,
  createNewLead,
  deleteLeadById,
  exportAllLeads,
  fetchLeads,
  updateLeadById,
} from "@/services/api/leads";
import {
  setCurrentPage,
  setDebouncedSearchText,
  setLeadToEdit,
  setOnConfirmAction,
  setOrder,
  setSelectedLeads,
  setSortBy,
  toggleLeadDrawer,
  toggleModal,
} from "@/store/app";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ILead } from "@/types/lead";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useEffect } from "react";
import { toast } from "sonner";

export default function useLeads() {
  const { currentPage, debouncedSearchText, itemsPerPage, order, searchText, selectedLeads, sortBy } = useAppSelector(
    (state) => state.app
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setDebouncedSearchText(searchText));
    }, 500);

    return () => clearTimeout(handler);
  }, [searchText, dispatch]);

  const {
    data,
    error,
    isLoading: isLeadsLoading,
  } = useQuery({
    queryKey: ["leads", currentPage, itemsPerPage, sortBy, order, debouncedSearchText],
    queryFn: async () => {
      try {
        const { data } = await fetchLeads({
          limit: itemsPerPage,
          offset: (currentPage - 1) * itemsPerPage,
          sortBy,
          order,
          query: debouncedSearchText,
        });
        if (debouncedSearchText.length) dispatch(setCurrentPage(1));
        return data;
      } catch (error) {
        console.error("Error loading leads:", error);
        toast.error("Unable to fetch leads.", { description: "Please try again later." });
      }
    },
    enabled: !!currentPage && !!itemsPerPage,
  });

  // mutation to delete a lead
  const { mutate: deleteLeadMutation } = useMutation({
    mutationFn: async (id: number) => {
      const toastId = toast.loading("Deletion in progress", {
        description: "Hold on a second...",
      });

      try {
        await deleteLeadById(id);
        toast.success("Lead deleted successfully!", { id: toastId, description: "" });
      } catch (error) {
        console.error("Error deleting lead:", error);
        toast.error("Unable to delete the lead.", { id: toastId, description: "Please try again later." });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leads"],
      });
    },
  });

  // mutation to bulk delete leads
  const { mutate: bulkDeleteLeadMutation } = useMutation({
    mutationFn: async () => {
      const toastId = toast.loading("Bulk deletion in progress", {
        description: "Hold on a second...",
      });

      try {
        await bulkDeleteLeads(selectedLeads);
        dispatch(setSelectedLeads([]));
        toast.success("Bulk deletion successfully!", { id: toastId, description: "" });
      } catch (error) {
        console.error("Error deleting lead:", error);
        toast.error("Unable to bulk delete.", { id: toastId, description: "Please try again later." });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leads"],
      });
    },
  });

  // mutation to create a lead
  const { mutateAsync: createLeadMutation } = useMutation({
    mutationFn: async (lead: ILead) => {
      const toastId = toast.loading("Creating lead...", {
        description: "Please wait a moment...",
      });

      try {
        const { data } = await createNewLead(lead);
        toast.success("Lead created successfully!", { id: toastId, description: "" });
        dispatch(toggleLeadDrawer());
        dispatch(setLeadToEdit(null));
        return data.data;
      } catch (error) {
        console.error("Error creating lead:", error);
        toast.error("Unable to create the lead.", {
          id: toastId,
          description: "There seems to be a problem with the request.",
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leads"],
      });
    },
  });

  // mutation to update a lead
  const { mutateAsync: updateLeadMutation } = useMutation({
    mutationFn: async (lead: ILead) => {
      if (!lead.id) throw new Error("ID is empty.");
      const toastId = toast.loading("Updating lead", {
        description: "Please wait a moment...",
      });

      try {
        const { data } = await updateLeadById(lead);
        toast.success("Lead updated successfully!", { id: toastId, description: "" });
        dispatch(toggleLeadDrawer());
        dispatch(setLeadToEdit(null));
        return data.data;
      } catch (error) {
        console.error("Error updating lead:", error);
        toast.error("Unable to updating the lead.", {
          id: toastId,
          description: "There seems to be a problem with the request.",
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leads"],
      });
    },
  });

  const exportAll = async () => {
    const toastId = toast.loading("Exporting Leads Data", {
      description: "Requesting data from server...",
    });

    try {
      const response = await exportAllLeads();
      const today = moment().format("DD-MM-YYYY");

      // Create a downloadable link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `leads_${today}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Export complete!", { id: toastId, description: "" });
    } catch (error) {
      console.error("Error exporting leads:", error);
      toast.error("Unable to export.", {
        id: toastId,
        description: "There seems to be a problem in exporting leads data. Please try again later.",
      });
    }
  };

  const onClear = () => {
    dispatch(setSortBy(""));
    dispatch(setOrder(""));
  };

  const handleSelection = (leadIds: number[]) => {
    dispatch(setSelectedLeads(leadIds));
  };

  const handleDelete = (bulk: boolean = false, id?: number) => {
    dispatch(
      setOnConfirmAction(() => () => {
        if (bulk) {
          bulkDeleteLeadMutation();
        } else if (id !== undefined) {
          deleteLeadMutation(id);
        }
      })
    );
    dispatch(toggleModal());
  };

  const onSave = async (lead: ILead) => {
    try {
      if (!lead.id) {
        await createLeadMutation(lead);
      } else {
        await updateLeadMutation(lead);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onEdit = (lead: ILead) => {
    dispatch(setLeadToEdit(lead));
    dispatch(toggleLeadDrawer());
  };

  return {
    data,
    error,
    isLeadsLoading,
    searchText,
    selectedLeads,
    handleSelection,
    deleteLeadMutation,
    createLeadMutation,
    updateLeadMutation,
    bulkDeleteLeadMutation,
    onClear,
    exportAll,
    onEdit,
    handleDelete,
    onSave,
  };
}
