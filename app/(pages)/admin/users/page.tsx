"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Dropdown,
  Modal,
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
  DropdownMenu,
  DropdownItem,
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
  gender: string;
  contact: string;
  city: string;
  state: string;
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
    <div className="p-4 max-h-screen overflow-hidden">
      <Card className="p-6 w-full mx- h-full flex flex-col">
        {/* <h1 className="text-3xl font-bold mb-8 text-center">Users</h1> */}

        <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
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
              <Button variant="flat">{selectedRole}</Button>
              <DropdownMenu
                aria-label="Role selection"
                onAction={(key) => setSelectedRole(key as string)}
                selectedKeys={[selectedRole]}
                selectionMode="single"
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
            color="danger"
            startContent={<PlusIcon className="w-5 h-5" />}
            onClick={() => {
              setCurrentUser(null);
              setIsModalOpen(true);
            }}
          >
            Blocked Users
          </Button>
        </div>

        <div className="flex-grow overflow-y-">
          <Table aria-label="User management table">
            <TableHeader>
              <TableColumn>User</TableColumn>
              <TableColumn>Role</TableColumn>
              <TableColumn>Username</TableColumn>
              <TableColumn>Gender</TableColumn>
              <TableColumn>Contact</TableColumn>
              <TableColumn>Location</TableColumn>
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
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.contact}</TableCell>
                  <TableCell>{`${user.city}, ${user.state}`}</TableCell>
                  <TableCell>
                    <Button
                      color="danger"
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
              <Button variant="flat">Select Roledanger</Button>
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
            <Input label="Gender" placeholder="Enter gender" className="mb-4" />
            <Input
              label="Contact"
              placeholder="Enter contact number"
              className="mb-4"
            />
            <Input label="City" placeholder="Enter city" className="mb-4" />
            <Input label="State" placeholder="Enter state" className="mb-4" />
          </ModalBody>
          <ModalFooter>
            <Button
              variant="flat"
              color="danger"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
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
