import { marked } from "marked"
import DOMPurify from "dompurify"
import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"

export async function exportToPdf(markdown: string, filename = "document") {
  const htmlContent = marked.parse(markdown, { breaks: true, gfm: true }) as string
  const sanitized = DOMPurify.sanitize(htmlContent)

  // Create a temporary container for rendering
  const container = document.createElement("div")
  container.className = "pdf-content"
  container.style.cssText = `
    position: fixed;
    left: -9999px;
    top: 0;
    width: 794px;
    padding: 48px;
    background: white;
    color: #1a1a2e;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    font-size: 14px;
    line-height: 1.6;
  `
  container.innerHTML = sanitized
  document.body.appendChild(container)

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    })

    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF("p", "mm", "a4")

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = pdfWidth
    const imgHeight = (canvas.height * pdfWidth) / canvas.width

    let heightLeft = imgHeight
    let position = 0

    // First page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
    heightLeft -= pdfHeight

    // Add additional pages if content overflows
    while (heightLeft > 0) {
      position = position - pdfHeight
      pdf.addPage()
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pdfHeight
    }

    pdf.save(`${filename}.pdf`)
  } finally {
    document.body.removeChild(container)
  }
}
