"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/hooks/use-translation"
import { useRouter } from "next/navigation"

interface SaveAnalysisDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  coreKeywords: string[]
  excludeKeywords: string[]
  analysisData?: any // This would contain all the analysis results
}

export function SaveAnalysisDialog({
  open,
  setOpen,
  coreKeywords,
  excludeKeywords,
  analysisData,
}: SaveAnalysisDialogProps) {
  const { toast } = useToast()
  const { t } = useTranslation()
  const router = useRouter()
  const [name, setName] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    if (!name.trim()) return

    setIsSaving(true)

    // Simulate API call to save the analysis
    setTimeout(() => {
      setIsSaving(false)
      setOpen(false)

      toast({
        title: t("analysisSaved"),
        description: `"${name}" ${t("hasBeenSaved")}`,
      })

      // In a real app, we would save the analysis data to a database
      // and then redirect to the saved analysis page or list
      setName("")

      // Optionally redirect to the saved analyses list
      // router.push('/analyses');
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("saveAnalysis")}</DialogTitle>
          <DialogDescription>{t("saveAnalysisDescription")}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              {t("name")}
            </Label>
            <Input
              id="name"
              placeholder={t("myAnalysis")}
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">{t("keywords")}</Label>
            <div className="col-span-3 text-sm">
              <span className="font-medium">{t("core")}:</span> {coreKeywords.join(", ")}
              <br />
              {excludeKeywords.length > 0 && (
                <>
                  <span className="font-medium">{t("exclude")}:</span> {excludeKeywords.join(", ")}
                </>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            {t("cancel")}
          </Button>
          <Button type="button" onClick={handleSave} disabled={!name.trim() || isSaving}>
            {isSaving ? t("saving") : t("save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
