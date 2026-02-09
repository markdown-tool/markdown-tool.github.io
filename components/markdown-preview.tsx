"use client"

import { useMemo } from "react"
import { marked } from "marked"
import DOMPurify from "dompurify"

interface MarkdownPreviewProps {
  content: string
  className?: string
}

export function MarkdownPreview({ content, className = "" }: MarkdownPreviewProps) {
  const htmlContent = useMemo(() => {
    if (!content.trim()) return ""
    const rawHtml = marked.parse(content, { breaks: true, gfm: true }) as string
    return DOMPurify.sanitize(rawHtml)
  }, [content])

  if (!content.trim()) {
    return (
      <div className={`flex items-center justify-center h-full text-muted-foreground ${className}`}>
        <p className="text-center">
          Start typing in the editor to see a live preview here...
        </p>
      </div>
    )
  }

  return (
    <div
      className={`markdown-preview ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}
