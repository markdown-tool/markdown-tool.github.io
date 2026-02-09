"use client"

import { Button } from "@/components/ui/button"
import { FileDown, FileText, Copy, Check, Trash2 } from "lucide-react"
import { useState } from "react"

interface AppHeaderProps {
  content: string
  onExportPdf: () => void
  onClear: () => void
  isExporting: boolean
}

export function AppHeader({ content, onExportPdf, onClear, isExporting }: AppHeaderProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0
  const charCount = content.length

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <FileText className="h-4 w-4 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-semibold text-foreground tracking-tight">MarkdownPad</h1>
        </div>
        <div className="hidden sm:flex items-center gap-3 ml-4 text-xs text-muted-foreground">
          <span>{wordCount} words</span>
          <span className="w-px h-3 bg-border" />
          <span>{charCount} chars</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          disabled={!content.trim()}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Copy markdown"
        >
          {copied ? (
            <Check className="h-4 w-4 mr-1.5" />
          ) : (
            <Copy className="h-4 w-4 mr-1.5" />
          )}
          <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          disabled={!content.trim()}
          className="text-muted-foreground hover:text-destructive"
          aria-label="Clear editor"
        >
          <Trash2 className="h-4 w-4 mr-1.5" />
          <span className="hidden sm:inline">Clear</span>
        </Button>
        <Button
          size="sm"
          onClick={onExportPdf}
          disabled={!content.trim() || isExporting}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          aria-label="Export to PDF"
        >
          <FileDown className="h-4 w-4 mr-1.5" />
          {isExporting ? "Exporting..." : "Export PDF"}
        </Button>
      </div>
    </header>
  )
}
