"use client";

import { useState, useEffect } from 'react';

export type FollowUp = {
  id: number;
  lead: {
    id: number;
    name: string;
  };
  task: string;
  dueDate: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PENDING' | 'DONE' | 'UPCOMING';
};

export function useFollowUps() {
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFollowUps = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8081/api/follow-ups');
      if (!response.ok) throw new Error('API unreachable');
      const data = await response.json();
      setFollowUps(data);
    } catch (error) {
      console.error('Failed to fetch follow-ups:', error);
      // Initialize with empty array if API fails to avoid permanent loading state
      setFollowUps([]);
    } finally {
      setLoading(false);
    }
  };

  const completeFollowUp = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8081/api/follow-ups/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'DONE' }),
      });
      if (response.ok) fetchFollowUps();
    } catch (error) {
      console.error('Failed to complete follow-up:', error);
    }
  };

  const deleteFollowUp = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8081/api/follow-ups/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) fetchFollowUps();
    } catch (error) {
      console.error('Failed to delete follow-up:', error);
    }
  };

  useEffect(() => {
    fetchFollowUps();
  }, []);

  return { followUps, loading, refetch: fetchFollowUps, completeFollowUp, deleteFollowUp };
}
