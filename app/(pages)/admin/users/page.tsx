"use client";

// export default function Users() {
//   return (
//     <div>
//       Patient , Admin , Rcep onlY Search and view user profiles , List all users
//       (patients, doctors, receptionists, etc.) Create, edit, and deactivate user
//       accounts Manage user roles and permissions Bulk user operations (e.g.,
//       import/export)
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Dropdown,
  Modal,
  DropdownMenu,
  DropdownItem,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Pagination,
  User,
  Card,
} from "@nextui-org/react";
import {
  AiOutlineSearch as SearchIcon,
  AiOutlinePlus as PlusIcon,
  AiOutlineStop as BlockIcon,
} from "react-icons/ai";

interface UserData {
  id: string;
  name: string;
  role: string;
  username: string;
  profile: string;
}

interface PaginationMetadata {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [pagination, setPagination] = useState<PaginationMetadata>({
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
    totalCount: 0,
  });

  useEffect(() => {
    fetchUsers();
  }, [pagination.currentPage]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `/api/admin/users?page=${pagination.currentPage}&limit=${pagination.pageSize}`
      );
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data.users);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRole === "All" || user.role === selectedRole)
  );

  const handleBlockUser = async (userId: string) => {
    console.log("Block user:", userId);
    await fetchUsers();
  };

  return (
    <div className="p-4">
      <Card className="p-4 w-full mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">User Management</h1>

        <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
              startContent={<SearchIcon className="w-5 h-5 text-gray-400" />}
              className="w-full md:w-64"
            />
            <Dropdown>
              <Button variant="bordered">{selectedRole}</Button>
              <DropdownMenu
                aria-label="Role selection"
                onAction={(key) => setSelectedRole(key as string)}
              >
                <DropdownItem key="All">All</DropdownItem>
                <DropdownItem key="Patient">Patient</DropdownItem>
                <DropdownItem key="Doctor">Doctor</DropdownItem>
                <DropdownItem key="Receptionist">Receptionist</DropdownItem>
                <DropdownItem key="Hospital">Hospital</DropdownItem>
                <DropdownItem key="Admin">Admin</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <Button
            color="primary"
            startContent={<PlusIcon className="w-5 h-5" />}
            onClick={() => {
              setCurrentUser(null);
              setIsModalOpen(true);
            }}
          >
            Add User
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table aria-label="User management table" className="min-w-full">
            <TableHeader>
              <TableColumn>User</TableColumn>
              <TableColumn>Role</TableColumn>
              <TableColumn>Username</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <User
                      name={user.name}
                      avatarProps={{
                        src:
                          user.profile ||
                          `https://i.pravatar.cc/150?u=${user.id}`,
                      }}
                    />
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    <Button
                      color="danger"
                      variant="bordered"
                      startContent={<BlockIcon className="w-4 h-4" />}
                      onClick={() => handleBlockUser(user.id)}
                    >
                      Block
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 flex justify-center">
          <Pagination
            total={pagination.totalPages}
            initialPage={pagination.currentPage}
            onChange={(page) =>
              setPagination({ ...pagination, currentPage: page })
            }
            showControls
            showShadow
            color="primary"
            page={pagination.currentPage}
          />
        </div>

        <Modal
          closeButton
          aria-labelledby="modal-title"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <ModalHeader>
            <p id="modal-title" className="text-xl font-semibold">
              Add User
            </p>
          </ModalHeader>
          <ModalBody>
            <Input
              label="Name"
              placeholder="Enter user's name"
              className="mb-4"
            />
            <Dropdown className="mb-4">
              <Button variant="bordered">Select Role</Button>
              <DropdownMenu aria-label="Role selection">
                <DropdownItem key="Patient">Patient</DropdownItem>
                <DropdownItem key="Doctor">Doctor</DropdownItem>
                <DropdownItem key="Receptionist">Receptionist</DropdownItem>
                <DropdownItem key="Hospital">Hospital</DropdownItem>
                <DropdownItem key="Admin">Admin</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Input
              label="Username"
              placeholder="Enter username"
              className="mb-4"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              Add User
            </Button>
          </ModalFooter>
        </Modal>
      </Card>
    </div>
  );
};

export default UserManagement;
