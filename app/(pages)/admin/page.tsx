"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@nextui-org/react";
import { RiAddLine, RiCheckLine, RiCalendarLine } from "react-icons/ri";
import { getRecentUsersData, getTilesData } from "@lib/admin";
import SpinnerLoader from "@components/SpinnerLoader";
import { RecentActivity, StatisticsCards } from "./components";
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
              {/* Statistics Cards */}
              <StatisticsCards tilesData={tilesData} />

              {/* Recent Activity */}
              <RecentActivity
                recentUsers={recentUsers}
                lastUserElementRef={lastUserElementRef}
              />

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-6">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  startContent={<RiAddLine className="h-5 w-5" />}
                >
                  Add Admin
                </Button>
                <Button
                  className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 text-lg py-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  startContent={
                    <RiCalendarLine className="h-5 w-5 text-gray-600" />
                  }
                >
                  Schedule Appointment
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white text-lg py-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  startContent={<RiCheckLine className="h-5 w-5" />}
                >
                  Approve Request
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
