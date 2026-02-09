"use client"

import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Link,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Minus,
  ImageIcon,
  Table,
} from "lucide-react"

interface EditorToolbarProps {
  onInsert: (before: string, after?: string, defaultText?: string) => void
}

export function EditorToolbar({ onInsert }: EditorToolbarProps) {
  const tools = [
    { icon: Bold, label: "Bold", before: "**", after: "**", defaultText: "bold text" },
    { icon: Italic, label: "Italic", before: "_", after: "_", defaultText: "italic text" },
    { icon: Strikethrough, label: "Strikethrough", before: "~~", after: "~~", defaultText: "strikethrough" },
    { icon: Code, label: "Inline Code", before: "`", after: "`", defaultText: "code" },
    { type: "separator" as const },
    { icon: Heading1, label: "Heading 1", before: "# ", defaultText: "Heading 1" },
    { icon: Heading2, label: "Heading 2", before: "## ", defaultText: "Heading 2" },
    { icon: Heading3, label: "Heading 3", before: "### ", defaultText: "Heading 3" },
    { type: "separator" as const },
    { icon: List, label: "Bullet List", before: "- ", defaultText: "List item" },
    { icon: ListOrdered, label: "Numbered List", before: "1. ", defaultText: "List item" },
    { icon: Quote, label: "Blockquote", before: "> ", defaultText: "Quote" },
    { icon: Minus, label: "Horizontal Rule", before: "\n---\n" },
    { type: "separator" as const },
    { icon: Link, label: "Link", before: "[", after: "](url)", defaultText: "link text" },
    { icon: ImageIcon, label: "Image", before: "![", after: "](url)", defaultText: "alt text" },
    { icon: Table, label: "Table", before: "\n| Header | Header |\n| ------ | ------ |\n| Cell   | Cell   |\n" },
  ]

  return (
    <div className="flex items-center gap-0.5 flex-wrap">
      {tools.map((tool, index) => {
        if ("type" in tool && tool.type === "separator") {
          return (
            <div
              key={`sep-${index}`}
              className="w-px h-5 bg-border mx-1"
            />
          )
        }

        const ToolIcon = tool.icon!
        return (
          <Button
            key={tool.label}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-secondary"
            onClick={() => onInsert(tool.before!, tool.after, tool.defaultText)}
            title={tool.label}
            aria-label={tool.label}
          >
            <ToolIcon className="h-4 w-4" />
          </Button>
        )
      })}
    </div>
  )
}
