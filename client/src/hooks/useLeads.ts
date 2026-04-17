import { useState, useEffect } from "react";

export type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  tag: string;
  date: string;
};

const API_BASE_URL = "http://localhost:8081/api/leads";

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      // Map backend fields to frontend fields if necessary
      // Backend Lead might have 'score' instead of 'tag'
      const mappedData = data.map((l: any) => ({
        ...l,
        tag: l.score || "WARM", // Default to WARM if score is missing
        date: l.createdAt ? new Date(l.createdAt).toLocaleDateString() : "Recently"
      }));
      setLeads(mappedData);
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const addLead = async (lead: Omit<Lead, "id" | "date">) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...lead,
          score: lead.tag // Map tag back to score for backend
        }),
      });
      if (response.ok) {
        fetchLeads();
      }
    } catch (error) {
      console.error("Failed to add lead:", error);
    }
  };

  const deleteLead = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setLeads(leads.filter(l => l.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete lead:", error);
    }
  };

  const updateLeadStatus = async (id: number, status: string) => {
    try {
      const lead = leads.find(l => l.id === id);
      if (!lead) return;

      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, status }),
      });
      if (response.ok) {
        setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
      }
    } catch (error) {
      console.error("Failed to update lead status:", error);
    }
  };

  return { leads, addLead, deleteLead, updateLeadStatus, loading };
}

