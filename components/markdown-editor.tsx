"use client"

import React from "react"

import { useRef, useCallback } from "react"
import { EditorToolbar } from "@/components/editor-toolbar"

interface MarkdownEditorProps {
  content: string
  onChange: (content: string) => void
}

export function MarkdownEditor({ content, onChange }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleInsert = useCallback(
    (before: string, after?: string, defaultText?: string) => {
      const textarea = textareaRef.current
      if (!textarea) return

      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = content.substring(start, end)
      const textToWrap = selectedText || defaultText || ""

      let newText: string
      let newCursorStart: number
      let newCursorEnd: number

      if (after) {
        newText =
          content.substring(0, start) +
          before +
          textToWrap +
          after +
          content.substring(end)
        newCursorStart = start + before.length
        newCursorEnd = start + before.length + textToWrap.length
      } else {
        newText =
          content.substring(0, start) +
          before +
          textToWrap +
          content.substring(end)
        newCursorStart = start + before.length
        newCursorEnd = start + before.length + textToWrap.length
      }

      onChange(newText)

      requestAnimationFrame(() => {
        textarea.focus()
        textarea.setSelectionRange(newCursorStart, newCursorEnd)
      })
    },
    [content, onChange]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault()
        const textarea = textareaRef.current
        if (!textarea) return

        const start = textarea.selectionStart
        const end = textarea.selectionEnd

        const newText =
          content.substring(0, start) + "  " + content.substring(end)
        onChange(newText)

        requestAnimationFrame(() => {
          textarea.setSelectionRange(start + 2, start + 2)
        })
      }
    },
    [content, onChange]
  )

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center px-3 py-2 border-b border-border bg-card/50">
        <EditorToolbar onInsert={handleInsert} />
      </div>
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 w-full resize-none bg-card p-4 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none"
        placeholder="# Start writing markdown here...

Use the toolbar above or type markdown syntax directly.

**Bold**, _italic_, `code`, and more..."
        spellCheck={false}
        aria-label="Markdown editor"
      />
    </div>
  )
}
