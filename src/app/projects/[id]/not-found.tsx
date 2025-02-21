import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto py-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
      <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or has been removed.</p>
      <Button asChild>
        <Link href="/projects">Back to Projects</Link>
      </Button>
    </div>
  )
}

