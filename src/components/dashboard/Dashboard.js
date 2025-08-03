import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import Statistics from "./Statistics";
import SearchFilter from "./SearchFilter";
import DocumentTable from "./DocumentTable";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { FullPageLoader } from "../common/LoadingSpinner";

const Dashboard = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.shopId) return;

      try {
        setLoading(true);

        // Fetch documents and stats concurrently
        const [docsResponse, statsResponse] = await Promise.all([
          api.getDocuments(user.shopId),
          api.getDashboardStats(user.shopId)
        ]);

        setDocuments(docsResponse.data);
        setFilteredDocs(docsResponse.data);
        setStats(statsResponse.data.stats);
      } catch (error) {
        console.error("Dashboard fetch error:", error.response?.data || error.message || error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleFilter = async (criteria) => {
    if (!user?.shopId) return;

    try {
      const response = await api.searchDocuments(
        user.shopId,
        criteria.keyword,
        criteria.status
      );
      setFilteredDocs(response.data);
    } catch (error) {
      toast.error("Search failed");
    }
  };

  const markStatusToggle = async (id) => {
    try {
      const document = documents.find((doc) => doc._id === id);
      const newStatus = document.status === "pending" ? "completed" : "pending";

      await api.updateDocumentStatus(id, newStatus);

      // Update local state
      const updatedDocs = documents.map((doc) =>
        doc._id === id ? { ...doc, status: newStatus } : doc
      );
      setDocuments(updatedDocs);
      setFilteredDocs(updatedDocs);

      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (loading) return <FullPageLoader text="Loading Dashboard..." />;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header title="Xerox Dashboard" />
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <Statistics documents={documents} stats={stats} />
        <SearchFilter onFilter={handleFilter} />
        <DocumentTable
          documents={filteredDocs}
          onStatusChange={markStatusToggle}
        />
      </main>
    </div>
  );
};

export default Dashboard;
