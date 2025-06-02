import Link from "next/link"
import { Instagram, MessageCircle, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink = ({ href, children }: FooterLinkProps) => (
  <li>
    <Link href={href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
      {children}
    </Link>
  </li>
);

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  className?: string;
}

const SocialLink = ({ href, icon, className = "" }: SocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform ${className}`}
  >
    {icon}
  </a>
);

interface ContactItemProps {
  icon: React.ReactNode;
  text: string;
}

const ContactItem = ({ icon, text }: ContactItemProps) => (
  <div className="flex items-center space-x-2">
    {icon}
    <span className="text-muted-foreground text-sm">{text}</span>
  </div>
);

const NavigationLinks = () => (
  <div>
    <h4 className="font-semibold text-foreground mb-4">Navegação</h4>
    <ul className="space-y-2">
      <FooterLink href="/">Início</FooterLink>
      <FooterLink href="/sobre">Sobre Nós</FooterLink>
      <FooterLink href="/informacoes">Informações</FooterLink>
    </ul>
  </div>
);

const CategoryLinks = () => (
  <div>
    <h4 className="font-semibold text-foreground mb-4">Categorias</h4>
    <ul className="space-y-2">
      <FooterLink href="/?categoria=aerofolios">Aerofólios</FooterLink>
      <FooterLink href="/?categoria=para-choques">Para-choques</FooterLink>
      <FooterLink href="/?categoria=spoilers">Spoilers</FooterLink>
      <FooterLink href="/?categoria=saias-laterais">Saias Laterais</FooterLink>
    </ul>
  </div>
);

const ContactInfo = () => (
  <div>
    <h4 className="font-semibold text-foreground mb-4">Contato</h4>
    <div className="space-y-3">
      <ContactItem
        icon={<Phone className="w-4 h-4 text-muted-foreground" />}
        text="(11) 94159-7301"
      />
      <ContactItem
        icon={<Mail className="w-4 h-4 text-muted-foreground" />}
        text="alves.evel@yahoo.com.br"
      />
      <ContactItem
        icon={<MapPin className="w-4 h-4 text-muted-foreground" />}
        text="Itu, São Paulo"
      />

      <div className="flex space-x-3 pt-2">
        <SocialLink
          href={`https://instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAM}`}
          icon={<Instagram className="w-4 h-4 text-white" />}
          className="bg-gradient-to-r from-purple-500 to-pink-500"
        />
        <SocialLink
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, vim através do site, gostaria de saber mais sobre os produtos.")}`}
          icon={<MessageCircle className="w-4 h-4 text-secondary-foreground" />}
          className="bg-secondary"
        />
      </div>
    </div>
  </div>
);

const LogoSection = () => (
  <div className="space-y-4">
    <Link href="/" className="flex items-center space-x-2">
      <Image src="/logo.jpg" alt="logo" width={150} height={150} />
    </Link>
    <p className="text-muted-foreground text-sm leading-relaxed">
      Peças automotivas premium e qualidade superior para seu veículo.
    </p>
  </div>
);

const Copyright = () => (
  <div className="border-t border-border mt-8 pt-8 text-center">
    <p className="text-muted-foreground text-sm">
      © {new Date().getFullYear()} Spazio Parts. Todos os direitos reservados.
    </p>
    <p className="text-muted-foreground text-sm">created by @guilhermefsh</p>
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <LogoSection />
          <NavigationLinks />
          <CategoryLinks />
          <ContactInfo />
        </div>
        <Copyright />
      </div>
    </footer>
  );
}
