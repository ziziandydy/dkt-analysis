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
import { useTranslation } from "@/hooks/use-translation"

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
  const { t } = useTranslation()
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
      title: t("brandAdded"),
      description: t("brandAddedSuccessfully"),
    })
  }

  const handleDeleteBrand = (id: string) => {
    setBrands(brands.filter((brand) => brand.id !== id))

    toast({
      title: t("brandDeleted"),
      description: t("brandDeletedSuccessfully"),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{t("brands")}</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>{t("addBrand")}</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("addNewBrand")}</DialogTitle>
              <DialogDescription>{t("createNewBrandDescription")}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="brand-name">{t("brandName")}</Label>
                <Input
                  id="brand-name"
                  value={newBrand.name}
                  onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                  placeholder={t("enterBrandName")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="brand-domains">{t("domains")}</Label>
                <Input
                  id="brand-domains"
                  value={newBrand.domains}
                  onChange={(e) => setNewBrand({ ...newBrand, domains: e.target.value })}
                  placeholder={t("enterDomainsCommaSeparated")}
                />
                <p className="text-xs text-muted-foreground">{t("domainsExample")}</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="brand-logo">{t("logo")}</Label>
                <div className="flex items-center gap-2">
                  <Input id="brand-logo" type="file" className="hidden" />
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById("brand-logo")?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {t("uploadLogo")}
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                {t("cancel")}
              </Button>
              <Button onClick={handleAddBrand} disabled={!newBrand.name || !newBrand.domains}>
                {t("addBrand")}
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
                <TableHead>{t("brand")}</TableHead>
                <TableHead>{t("domains")}</TableHead>
                <TableHead>{t("apiKeys")}</TableHead>
                <TableHead>{t("users")}</TableHead>
                <TableHead>{t("status")}</TableHead>
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
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${brand.status === "Active"
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
                          <span>{t("edit")}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteBrand(brand.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          <span>{t("delete")}</span>
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
            <CardTitle>{t("apiManagement")}</CardTitle>
            <CardDescription>{t("manageApiKeysAndAccess")}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {t("createAndManageApiKeysDescription")}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              {t("manageApiKeys")}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("domainVerification")}</CardTitle>
            <CardDescription>{t("verifyBrandDomains")}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {t("verifyDomainOwnershipDescription")}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              {t("verifyDomains")}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("brandSettings")}</CardTitle>
            <CardDescription>{t("configureBrandSettings")}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {t("customizeBrandSettingsDescription")}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              {t("configureSettings")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
