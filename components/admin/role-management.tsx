"use client"

import { useState } from "react"
import { Edit, MoreHorizontal, Plus, Trash, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

// Mock data
const mockRoles = [
  {
    id: "1",
    name: "Administrator",
    description: "Full access to all features",
    users: 3,
    permissions: {
      dashboard: { view: true, edit: true },
      brands: { view: true, edit: true, create: true, delete: true },
      roles: { view: true, edit: true, create: true, delete: true },
      users: { view: true, edit: true, create: true, delete: true },
      analytics: { view: true, export: true },
    },
  },
  {
    id: "2",
    name: "Manager",
    description: "Access to manage users and view analytics",
    users: 8,
    permissions: {
      dashboard: { view: true, edit: true },
      brands: { view: true, edit: false, create: false, delete: false },
      roles: { view: true, edit: false, create: false, delete: false },
      users: { view: true, edit: true, create: true, delete: false },
      analytics: { view: true, export: true },
    },
  },
  {
    id: "3",
    name: "Analyst",
    description: "Access to view and export analytics",
    users: 15,
    permissions: {
      dashboard: { view: true, edit: false },
      brands: { view: false, edit: false, create: false, delete: false },
      roles: { view: false, edit: false, create: false, delete: false },
      users: { view: false, edit: false, create: false, delete: false },
      analytics: { view: true, export: true },
    },
  },
  {
    id: "4",
    name: "Viewer",
    description: "Read-only access to dashboard",
    users: 24,
    permissions: {
      dashboard: { view: true, edit: false },
      brands: { view: false, edit: false, create: false, delete: false },
      roles: { view: false, edit: false, create: false, delete: false },
      users: { view: false, edit: false, create: false, delete: false },
      analytics: { view: true, export: false },
    },
  },
]

// Permission categories
const permissionCategories = [
  {
    id: "dashboard",
    name: "Dashboard",
    permissions: [
      { id: "view", name: "View" },
      { id: "edit", name: "Edit" },
    ],
  },
  {
    id: "brands",
    name: "Brands",
    permissions: [
      { id: "view", name: "View" },
      { id: "edit", name: "Edit" },
      { id: "create", name: "Create" },
      { id: "delete", name: "Delete" },
    ],
  },
  {
    id: "roles",
    name: "Roles",
    permissions: [
      { id: "view", name: "View" },
      { id: "edit", name: "Edit" },
      { id: "create", name: "Create" },
      { id: "delete", name: "Delete" },
    ],
  },
  {
    id: "users",
    name: "Users",
    permissions: [
      { id: "view", name: "View" },
      { id: "edit", name: "Edit" },
      { id: "create", name: "Create" },
      { id: "delete", name: "Delete" },
    ],
  },
  {
    id: "analytics",
    name: "Analytics",
    permissions: [
      { id: "view", name: "View" },
      { id: "export", name: "Export" },
    ],
  },
]

export function RoleManagement() {
  const { toast } = useToast()
  const [roles, setRoles] = useState(mockRoles)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentRole, setCurrentRole] = useState<any>(null)
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: {
      dashboard: { view: false, edit: false },
      brands: { view: false, edit: false, create: false, delete: false },
      roles: { view: false, edit: false, create: false, delete: false },
      users: { view: false, edit: false, create: false, delete: false },
      analytics: { view: false, export: false },
    },
  })

  const handleAddRole = () => {
    if (!newRole.name) return

    const role = {
      id: (roles.length + 1).toString(),
      name: newRole.name,
      description: newRole.description,
      users: 0,
      permissions: newRole.permissions,
    }

    setRoles([...roles, role])
    setNewRole({
      name: "",
      description: "",
      permissions: {
        dashboard: { view: false, edit: false },
        brands: { view: false, edit: false, create: false, delete: false },
        roles: { view: false, edit: false, create: false, delete: false },
        users: { view: false, edit: false, create: false, delete: false },
        analytics: { view: false, export: false },
      },
    })
    setIsAddDialogOpen(false)

    toast({
      title: "Role added",
      description: `${role.name} role has been added successfully`,
    })
  }

  const handleEditRole = () => {
    if (!currentRole) return

    setRoles(roles.map((role) => (role.id === currentRole.id ? currentRole : role)))
    setIsEditDialogOpen(false)

    toast({
      title: "Role updated",
      description: `${currentRole.name} role has been updated successfully`,
    })
  }

  const handleDeleteRole = (id: string) => {
    setRoles(roles.filter((role) => role.id !== id))

    toast({
      title: "Role deleted",
      description: "The role has been deleted successfully",
    })
  }

  const handlePermissionChange = (roleData: any, categoryId: string, permissionId: string, checked: boolean) => {
    const updatedPermissions = {
      ...roleData.permissions,
      [categoryId]: {
        ...roleData.permissions[categoryId],
        [permissionId]: checked,
      },
    }

    if (roleData === newRole) {
      setNewRole({
        ...newRole,
        permissions: updatedPermissions,
      })
    } else if (currentRole) {
      setCurrentRole({
        ...currentRole,
        permissions: updatedPermissions,
      })
    }
  }

  const renderPermissionsTable = (roleData: any) => {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Permissions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {permissionCategories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-4">
                  {category.permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${category.id}-${permission.id}`}
                        checked={roleData.permissions[category.id]?.[permission.id] || false}
                        onCheckedChange={(checked) =>
                          handlePermissionChange(roleData, category.id, permission.id, !!checked)
                        }
                      />
                      <Label htmlFor={`${category.id}-${permission.id}`}>{permission.name}</Label>
                    </div>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Roles</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Add Role</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Role</DialogTitle>
              <DialogDescription>Create a new role with specific permissions</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="role-name">Role Name</Label>
                <Input
                  id="role-name"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  placeholder="Enter role name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role-description">Description</Label>
                <Input
                  id="role-description"
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  placeholder="Enter role description"
                />
              </div>
              <div className="grid gap-2">
                <Label>Permissions</Label>
                <div className="border rounded-md">{renderPermissionsTable(newRole)}</div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddRole} disabled={!newRole.name}>
                Add Role
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Users</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>{role.users}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentRole(role)
                            setIsEditDialogOpen(true)
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteRole(role.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>Modify role permissions and details</DialogDescription>
          </DialogHeader>
          {currentRole && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-role-name">Role Name</Label>
                <Input
                  id="edit-role-name"
                  value={currentRole.name}
                  onChange={(e) => setCurrentRole({ ...currentRole, name: e.target.value })}
                  placeholder="Enter role name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-role-description">Description</Label>
                <Input
                  id="edit-role-description"
                  value={currentRole.description}
                  onChange={(e) => setCurrentRole({ ...currentRole, description: e.target.value })}
                  placeholder="Enter role description"
                />
              </div>
              <div className="grid gap-2">
                <Label>Permissions</Label>
                <div className="border rounded-md">{renderPermissionsTable(currentRole)}</div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditRole}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Role Assignment</CardTitle>
            <CardDescription>Assign roles to users</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Assign roles to users to control their access to features and data.
            </p>
            <Button variant="outline" className="mt-4">
              <Users className="mr-2 h-4 w-4" />
              Manage User Roles
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Role Templates</CardTitle>
            <CardDescription>Create and manage role templates</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Create role templates to quickly assign common permission sets to new roles.
            </p>
            <Button variant="outline" className="mt-4">
              Manage Templates
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
