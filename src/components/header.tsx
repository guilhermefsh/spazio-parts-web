import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.jpg" alt="logo" width={100} height={100} />
        </Link>

        <nav>
          <Link href="/sobre" className="text-foreground hover:text-primary transition-colors font-medium">
            Sobre
          </Link>
        </nav>
      </div>
    </header>
  )
}
