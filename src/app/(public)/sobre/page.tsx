import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 flex flex-col items-center">
            <Image src="/logo.jpg" alt="logo" width={300} height={300} />
            <h1 className="text-xl text-muted-foreground">Tradição italiana em peças automotivas de alta performance</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <Image
                src="/about-us-spazio-parts.png"
                alt="Oficina AutoParts Italia"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Nossa História</h2>
              <p className="text-muted-foreground leading-relaxed">
                Desde 2021, a Spazioparts se destaca como referência na fabricação de peças de época para o Fiat 147 e seus derivados, unindo qualidade e compromisso com a originalidade.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Atendendo clientes em todo o Brasil, oferecemos soluções que já não se encontram no mercado, permitindo que projetos de restauração automotiva recuperem toda a essência e autenticidade dos modelos clássicos.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Com foco contínuo na excelência, trabalhamos para superar expectativas e consolidar cada vez mais nossa presença no setor de peças clássicas automotivas.
              </p>

            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-card rounded-lg border border-border">
              <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">5+</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Anos de Experiência</h3>
              <p className="text-muted-foreground">Mais de 4 anos desenvolvendo peças de alta qualidade</p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg border border-border">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-black">500+</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Produtos</h3>
              <p className="text-muted-foreground">Amplo catálogo de peças para diversos modelos de veículos</p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg border border-border">
              <div className="w-16 h-16 bg-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-white">100%</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Qualidade</h3>
              <p className="text-muted-foreground">Todos os produtos passam por rigoroso controle de qualidade</p>
            </div>
          </div>

          <div className="bg-card p-8 rounded-lg border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Nossos Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center">
                  <span className="w-2 h-2 bg-blue-700 rounded-full mr-3"></span>
                  Excelência
                </h3>
                <p className="text-muted-foreground">Buscamos sempre a perfeição em cada detalhe dos nossos produtos</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center">
                  <span className="w-2 h-2 bg-blue-700 rounded-full mr-3"></span>
                  Inovação
                </h3>
                <p className="text-muted-foreground">Investimos constantemente em tecnologia e design</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center">
                  <span className="w-2 h-2 bg-blue-700 rounded-full mr-3"></span>
                  Tradição
                </h3>
                <p className="text-muted-foreground">
                  Preservamos a qualidade na fabricação de peças automotivas
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center">
                  <span className="w-2 h-2 bg-blue-700 rounded-full mr-3"></span>
                  Paixão
                </h3>
                <p className="text-muted-foreground">Cada produto é desenvolvido com amor pelos automóveis</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
