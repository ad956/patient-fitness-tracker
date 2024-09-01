"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { getRecentUsersData, getTilesData } from "@lib/admin";
import SpinnerLoader from "@components/SpinnerLoader";
import {
  AppointmentGraph,
  RecentActivity,
  StatisticsCards,
  UserDistributionPie,
} from "./components";
import { PaginatedResponse, RecentUser, TilesDataProp } from "@pft-types/index";

export default function Admin() {
  const [tilesData, setTilesData] = useState<TilesDataProp | null>(null);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingTiles, setIsLoadingTiles] = useState(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastUserElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tiles = await getTilesData();
        setTilesData(tiles);
      } finally {
        setIsLoadingTiles(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchRecentUsers();
  }, [page]);

  const fetchRecentUsers = async () => {
    if (!hasMore) return;

    setIsLoadingUsers(true);

    try {
      const data: PaginatedResponse = await getRecentUsersData(page);

      setRecentUsers((prev) => [...prev, ...data.users]);
      setHasMore(data.page < data.totalPages);
    } catch (error) {
      console.error("Error fetching recent users:", error);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const isLoading = isLoadingTiles || isLoadingUsers;

  const appointmentData = [
    {
      id: "appointments",
      color: "hsl(207, 70%, 50%)",
      data: [
        { x: "Jan", y: 65 },
        { x: "Feb", y: 59 },
        { x: "Mar", y: 80 },
        { x: "Apr", y: 81 },
        { x: "May", y: 56 },
        { x: "Jun", y: 55 },
      ],
    },
  ];

  const userDistributionData = [
    { id: "patients", label: "Patients", value: 60 },
    { id: "doctors", label: "Doctors", value: 20 },
    { id: "receptionists", label: "Receptionists", value: 15 },
    { id: "hospitals", label: "Hospitals", value: 5 },
  ];

  return (
    <div className="flex flex-col overflow-y-scroll scrollbar">
      <main className="flex-grow p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <SpinnerLoader />
            </div>
          ) : (
            <>
              {/* Statistics Cards*/}
              <StatisticsCards tilesData={tilesData} />

              {/* Graphs */}
              <div className="grid grid-cols-2 gap-6">
                <AppointmentGraph data={appointmentData} />
                <UserDistributionPie data={userDistributionData} />
              </div>

              {/* Recent Activity */}
              <RecentActivity
                recentUsers={recentUsers}
                lastUserElementRef={lastUserElementRef}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
