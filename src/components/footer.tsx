import Link from "next/link"
import { Instagram, MessageCircle, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.jpg" alt="logo" width={150} height={150} />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Peças automotivas premium e qualidade superior para seu veículo.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Sobre Nós
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Categorias</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/?categoria=aerofolios"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Aerofólios
                </Link>
              </li>
              <li>
                <Link
                  href="/?categoria=para-choques"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Para-choques
                </Link>
              </li>
              <li>
                <Link
                  href="/?categoria=spoilers"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Spoilers
                </Link>
              </li>
              <li>
                <Link
                  href="/?categoria=saias-laterais"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Saias Laterais
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">(11) 94159-7301</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">alves.evel@yahoo.com.br</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">Itu, São Paulo</span>
              </div>

              <div className="flex space-x-3 pt-2">
                <a
                  href="https://instagram.com/autopartsitalia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Instagram className="w-4 h-4 text-white" />
                </a>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <MessageCircle className="w-4 h-4 text-secondary-foreground" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} Spazio Parts. Todos os direitos reservados.</p>
          <p className="text-muted-foreground text-sm">created by @guilhermefsh</p>
        </div>
      </div>
    </footer>
  )
}
