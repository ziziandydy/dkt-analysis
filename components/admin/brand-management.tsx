"use client"

import { useState } from "react"
import { Edit, MoreHorizontal, Plus, Trash, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { useToast } from "@/hooks/use-toast"

// Mock data
const mockBrands = [
  {
    id: "1",
    name: "優兔",
    logo: "/placeholder.svg?height=40&width=40",
    domains: ["youtu.com", "youtu.co.jp"],
    apiKeys: 2,
    users: 15,
    status: "Active",
  },
  {
    id: "2",
    name: "Infiniti",
    logo: "/placeholder.svg?height=40&width=40",
    domains: ["infiniti.com", "infiniti.co.jp"],
    apiKeys: 1,
    users: 8,
    status: "Active",
  },
  {
    id: "3",
    name: "Nissan",
    logo: "/placeholder.svg?height=40&width=40",
    domains: ["nissan.com", "nissan.co.jp"],
    apiKeys: 3,
    users: 12,
    status: "Active",
  },
  {
    id: "4",
    name: "Toyota",
    logo: "/placeholder.svg?height=40&width=40",
    domains: ["toyota.com", "toyota.co.jp"],
    apiKeys: 0,
    users: 0,
    status: "Inactive",
  },
]

export function BrandManagement() {
  const { toast } = useToast()
  const [brands, setBrands] = useState(mockBrands)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newBrand, setNewBrand] = useState({
    name: "",
    domains: "",
  })

  const handleAddBrand = () => {
    if (!newBrand.name || !newBrand.domains) return

    const brand = {
      id: (brands.length + 1).toString(),
      name: newBrand.name,
      logo: "/placeholder.svg?height=40&width=40",
      domains: newBrand.domains.split(",").map((domain) => domain.trim()),
      apiKeys: 0,
      users: 0,
      status: "Active",
    }

    setBrands([...brands, brand])
    setNewBrand({ name: "", domains: "" })
    setIsAddDialogOpen(false)

    toast({
      title: "Brand added",
      description: `${brand.name} has been added successfully`,
    })
  }

  const handleDeleteBrand = (id: string) => {
    setBrands(brands.filter((brand) => brand.id !== id))

    toast({
      title: "Brand deleted",
      description: "The brand has been deleted successfully",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Brands</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Add Brand</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Brand</DialogTitle>
              <DialogDescription>Create a new brand to manage users and API access</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="brand-name">Brand Name</Label>
                <Input
                  id="brand-name"
                  value={newBrand.name}
                  onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                  placeholder="Enter brand name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="brand-domains">Domains</Label>
                <Input
                  id="brand-domains"
                  value={newBrand.domains}
                  onChange={(e) => setNewBrand({ ...newBrand, domains: e.target.value })}
                  placeholder="Enter domains (comma separated)"
                />
                <p className="text-xs text-muted-foreground">Example: example.com, example.co.jp</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="brand-logo">Logo</Label>
                <div className="flex items-center gap-2">
                  <Input id="brand-logo" type="file" className="hidden" />
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById("brand-logo")?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddBrand} disabled={!newBrand.name || !newBrand.domains}>
                Add Brand
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
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Domains</TableHead>
                <TableHead>API Keys</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brands.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>
                    <img
                      src={brand.logo || "/placeholder.svg"}
                      alt={`${brand.name} logo`}
                      className="h-8 w-8 rounded-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{brand.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      {brand.domains.map((domain, index) => (
                        <span key={index} className="text-sm">
                          {domain}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{brand.apiKeys}</TableCell>
                  <TableCell>{brand.users}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        brand.status === "Active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      }`}
                    >
                      {brand.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteBrand(brand.id)}>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>API Management</CardTitle>
            <CardDescription>Manage API keys and access</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Create and manage API keys for brands to access the platform programmatically.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Manage API Keys
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Domain Verification</CardTitle>
            <CardDescription>Verify brand domains</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Verify domain ownership to ensure secure access for brand users.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Verify Domains
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Brand Settings</CardTitle>
            <CardDescription>Configure brand settings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Customize settings, permissions, and features available to each brand.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Configure Settings
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
