import { queryClient } from "@/main";
import {
  bulkDeleteLeads,
  createNewLead,
  deleteLeadById,
  exportAllLeads,
  fetchLeads,
  updateLeadById,
} from "@/services/api/leads";
import { ILead } from "@/types/lead";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function useLeads() {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [leadToEdit, setLeadToEdit] = useState<ILead | null>(null);

  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  const [isLeadDrawerOpen, setIsLeadDrawerOpen] = useState(false);
  const [isFilterAndSortOpen, setIsFilterAndSortOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [onConfirmAction, setOnConfirmAction] = useState<() => void>(() => {});

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchText]);

  const {
    data,
    error,
    isLoading: isLeadsLoading,
  } = useQuery({
    queryKey: ["leads", currentPage, itemsPerPage, sortBy, order, debouncedSearchText],
    queryFn: async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate delay

        const { data } = await fetchLeads({
          limit: itemsPerPage,
          offset: (currentPage - 1) * itemsPerPage,
          sortBy,
          order,
          query: debouncedSearchText,
        });
        if (debouncedSearchText.length) setCurrentPage(1);
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
        setSelectedLeads([]);
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
        setIsLeadDrawerOpen(false);
        setLeadToEdit(null);
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
        setIsLeadDrawerOpen(false);
        setLeadToEdit(null);
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
    setSortBy("");
    setOrder("");
  };

  const handleSelection = (leadIds: number[]) => {
    setSelectedLeads((prev) => {
      const isRemoving = leadIds.every((id) => prev.includes(id));

      return isRemoving ? prev.filter((id) => !leadIds.includes(id)) : [...new Set([...prev, ...leadIds])];
    });
  };

  const handleDelete = (bulk: boolean = false, id?: number) => {
    setOnConfirmAction(() => () => {
      if (bulk) {
        bulkDeleteLeadMutation();
      } else if (id !== undefined) {
        deleteLeadMutation(id);
      }
    });
    setIsModalOpen(true);
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
    setLeadToEdit(lead);
    setIsLeadDrawerOpen(true);
  };

  return {
    data,
    error,
    isLeadsLoading,
    currentPage,
    itemsPerPage,
    sortBy,
    order,
    searchText,
    selectedLeads,
    isLeadDrawerOpen,
    isFilterAndSortOpen,
    leadToEdit,
    isModalOpen,
    handleSelection,
    setCurrentPage,
    setSortBy,
    setItemsPerPage,
    setSearchText,
    setOrder,
    deleteLeadMutation,
    createLeadMutation,
    updateLeadMutation,
    bulkDeleteLeadMutation,
    onClear,
    exportAll,
    onEdit,
    setIsLeadDrawerOpen,
    setIsFilterAndSortOpen,
    setLeadToEdit,
    setIsModalOpen,
    onConfirmAction,
    setOnConfirmAction,
    handleDelete,
    onSave,
  };
}
