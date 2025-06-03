"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Tag {
  id: string
  text: string
}

interface TagInputProps {
  placeholder?: string
  tags: Tag[]
  setTags: (tags: Tag[]) => void
  className?: string
  maxTags?: number
  disabled?: boolean
}

export function TagInput({ placeholder, tags, setTags, className, maxTags = 100, disabled = false }: TagInputProps) {
  const [inputValue, setInputValue] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return

    // Add tag on space, comma or enter
    if (e.key === " " || e.key === "," || e.key === "Enter") {
      e.preventDefault()
      addTag(inputValue)
    }
  }

  const addTag = (text: string) => {
    // Split by commas or Chinese commas and process each part
    const parts = text
      .split(/[,、]/)
      .filter(Boolean)
      .map((part) => part.trim())

    if (parts.length === 0 || (parts.length === 1 && parts[0] === "")) {
      return
    }

    // Process each part as a separate tag
    const newTags = [...tags]

    for (const part of parts) {
      if (part && newTags.length < maxTags) {
        newTags.push({
          id: crypto.randomUUID(),
          text: part,
        })
      }
    }

    setTags(newTags)
    setInputValue("")
  }

  const removeTag = (id: string) => {
    if (disabled) return
    setTags(tags.filter((tag) => tag.id !== id))
  }

  const handleContainerClick = () => {
    inputRef.current?.focus()
  }

  return (
    <div
      className={cn(
        "flex min-h-14 w-full flex-wrap items-center gap-2 rounded-md border border-input bg-background px-4 py-3 ring-offset-background",
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      onClick={handleContainerClick}
    >
      {tags.map((tag) => (
        <div key={tag.id} className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm">
          <span>{tag.text}</span>
          {!disabled && (
            <button
              type="button"
              onClick={() => removeTag(tag.id)}
              className="text-muted-foreground hover:text-foreground"
              aria-label={`Remove ${tag.text} tag`}
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ""}
        className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground min-w-20 h-10 text-base"
        disabled={disabled || tags.length >= maxTags}
      />
    </div>
  )
}
