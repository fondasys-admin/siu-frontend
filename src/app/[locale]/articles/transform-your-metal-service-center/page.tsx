import Image from "next/image";
import Link from "next/link";
import { Flame, Zap, Square, CircleDot } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Transform Your Metal Service Center | Synergis Industrial Utama",
  description:
    "Discover how Bodor laser technology can transform your metal service center with precision cutting, efficiency, and cost savings.",
  alternates: {
    canonical: "https://www.siu-indo.com/articles/transform-your-metal-service-center",
    languages: {
      en: "https://www.siu-indo.com/articles/transform-your-metal-service-center",
      id: "https://www.siu-indo.com/id/articles/transform-your-metal-service-center",
      "x-default": "https://www.siu-indo.com/articles/transform-your-metal-service-center",
    },
  },
};

const supplyChainSteps = [
  {
    number: "01",
    title: "Producers",
    description: "Producers of steel",
  },
  {
    number: "02",
    title: "Material\nService Center",
    description: "Material storage, logistic, and value added service",
  },
  {
    number: "03",
    title: "Fabricators",
    description: "Cutting and physical material processing",
  },
  {
    number: "04",
    title: "Erectors",
    description: "Erection at the construction site",
  },
];

const traditionalMethods = [
  { name: "Flame cutting", highlighted: true },
  { name: "Saw cutting", highlighted: false },
  { name: "Shearing", highlighted: false },
  { name: "Plasma cutting", highlighted: false },
];

const comparisonData = [
  {
    name: "Laser Cutting",
    highlighted: true,
    cost: "$",
    thickness: "1mm - 50mm",
    speed: "1 - 20 m/min",
    precision: "±0.05mm",
    range: "30mm - 100mm",
  },
  {
    name: "Waterjet Cutting",
    highlighted: false,
    cost: "$$$",
    thickness: "30mm - 100mm",
    speed: "0.1 - 2 m/min",
    precision: "±0.1mm",
    range: "30mm - 100mm",
  },
  {
    name: "Plasma Cutting",
    highlighted: false,
    cost: "$$",
    thickness: "30mm - 100mm",
    speed: "1 - 6 m/min",
    precision: "±0.3mm",
    range: "30mm - 100mm",
  },
  {
    name: "Flame Cutting",
    highlighted: false,
    cost: "$$",
    thickness: "30mm - 100mm",
    speed: "0.2 - 1.5 m/min",
    precision: "±1.0mm",
    range: "30mm - 100mm",
  },
];

const productFeatures = [
  "High Speed Cutting",
  "Easy Operation",
  "Diverse Options",
];

const featureCards = [
  {
    title: "360° Collision Avoidance System",
    value: "",
    subtitle: "Cu-core Cathode",
  },
  {
    title: "",
    value: "1.5G",
    subtitle: "Acceleration",
  },
  {
    title: "",
    value: "5 Years",
    subtitle: "Warranty",
  },
  {
    title: "Auto Nozzle Cutting Parameter",
    value: "",
    subtitle: "",
  },
  {
    title: "Ultra-light Material",
    value: "",
    subtitle: "",
  },
  {
    title: "",
    value: "1,500 to 60kW",
    subtitle: "Power Options",
  },
  {
    title: "Fully Enclosed",
    value: "",
    subtitle: "",
  },
  {
    title: "Simple Easy Operation",
    value: "",
    subtitle: "",
  },
  {
    title: "",
    value: "30% Increase",
    subtitle: "In Efficiency",
  },
];

export default function TransformMetalServiceCenterPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2d1810] to-[#1a1a1a]">
          <Image
            src="/articles/transform-hero-bg.jpg"
            alt="Hero background"
            fill
            className="object-cover opacity-80 mix-blend-overlay"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-6 max-w-[910px]">
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-semibold text-white leading-tight mb-10">
            Transform your metal service center with Bodor laser technology
          </h1>
          <Link href="#contact">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-[59px] py-[14px] h-10 rounded"
            >
              Request demo
            </Button>
          </Link>
        </div>
        {/* Machine image overlay */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px]">
          <Image
            src="/articles/transform-hero-machine.png"
            alt="Bodor Laser Machine"
            width={1200}
            height={600}
            className="object-contain"
          />
        </div>
      </section>

      {/* Supply Chain Section */}
      <section className="bg-[#1a1a1a] py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left side - Machine image */}
            <div className="relative">
              <Image
                src="/articles/transform-machine-detail.png"
                alt="Laser cutting machine detail"
                width={700}
                height={800}
                className="object-contain"
              />
            </div>

            {/* Right side - Content */}
            <div className="text-white">
              <h2 className="text-4xl lg:text-[48px] font-semibold leading-tight mb-8">
                Are you a metal service center?
              </h2>
              <p className="text-lg lg:text-2xl font-light leading-relaxed mb-16 text-white/90">
                Metal service centers purchase bulk steel from producers, store
                it, process it, and supply small to mid-sized businesses who
                can&apos;t do it on their own. You&apos;re the warehouses, the
                processors, and the problem-solvers that keep projects moving.
                From construction and infrastructure to manufacturing, over
                two-thirds of steel used in buildings and bridges flows through
                service centers like yours.
              </p>

              {/* Supply chain steps */}
              <div className="space-y-0">
                {supplyChainSteps.map((step, index) => (
                  <div key={step.number}>
                    <div className="border-t border-white/20" />
                    <div className="flex items-start gap-6 py-6">
                      <span className="text-lg font-light text-white/60 w-8">
                        {step.number}
                      </span>
                      <h3 className="text-2xl lg:text-4xl text-primary font-normal whitespace-pre-line w-[280px]">
                        {step.title}
                      </h3>
                      <div className="w-12 h-12 flex items-center justify-center">
                        {/* Icon placeholder */}
                      </div>
                      <p className="text-lg font-light text-white/80 flex-1">
                        {step.description}
                      </p>
                    </div>
                    {index === supplyChainSteps.length - 1 && (
                      <div className="border-t border-white/20" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Traditional Methods Section */}
      <section className="bg-[#1a1a1a] py-20 lg:py-32 relative">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <div className="text-white max-w-[443px]">
              <h2 className="text-4xl lg:text-[48px] font-semibold leading-tight mb-12">
                Why traditional cutting methods are holding you back
              </h2>
              <p className="text-lg lg:text-2xl font-light leading-relaxed mb-16 text-white/90">
                Outdated equipment like flame and plasma cutters create noise,
                vibration, toxic emissions, and slow production. With limited
                precision and excessive waste, your margins are suffering.
              </p>

              {/* Methods list */}
              <div className="space-y-0 max-w-[356px]">
                {traditionalMethods.map((method, index) => (
                  <div key={method.name}>
                    <div className="border-t border-white/20" />
                    <div className="flex items-center gap-7 py-3">
                      <Flame className="w-5 h-6 text-white/60" />
                      <span
                        className={`text-2xl ${method.highlighted ? "text-primary font-medium" : "text-white font-normal"}`}
                      >
                        {method.name}
                      </span>
                    </div>
                    {index === traditionalMethods.length - 1 && (
                      <div className="border-t border-white/20" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Machine image */}
            <div className="relative">
              <Image
                src="/articles/transform-traditional-cutting.jpg"
                alt="Traditional cutting vs laser"
                width={800}
                height={1024}
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#1a1a1a] py-10">
        <div className="max-w-[1323px] mx-auto px-6">
          <div className="bg-[#faf7f5] rounded-xl p-8 lg:p-16 text-center">
            <h2 className="text-3xl lg:text-[39px] font-semibold text-primary leading-tight mb-6">
              Ready to be part of the Cutting Revolution?
            </h2>
            <p className="text-base text-dark mb-8 max-w-[800px] mx-auto">
              Discover our advanced sheet and tube cutting machines designed for
              precision and efficiency.
            </p>
            <Link
              href="https://wa.me/6285213238172"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 h-10 rounded capitalize">
                Inquire Now On Whatsapp
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="bg-[#323232] py-20 lg:py-32">
        <div className="max-w-[1308px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-white/60 text-base mb-4">Let&apos;s Compare</p>
            <h2 className="text-3xl lg:text-5xl font-semibold text-primary leading-tight">
              How our solution stacks up
              <br />
              against traditional solutions
            </h2>
          </div>

          {/* Comparison cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
            {comparisonData.map((item) => (
              <div
                key={item.name}
                className={`rounded-xl p-6 ${
                  item.highlighted
                    ? "bg-gradient-to-b from-primary to-primary/80 text-white"
                    : "bg-white text-dark"
                }`}
              >
                <h3
                  className={`text-2xl font-semibold mb-8 ${item.highlighted ? "text-white" : "text-dark"}`}
                >
                  {item.name.split(" ")[0]}
                  <br />
                  {item.name.split(" ")[1]}
                </h3>
                <p
                  className={`text-4xl lg:text-5xl font-light mb-8 ${item.highlighted ? "text-white" : "text-dark/60"}`}
                >
                  {item.cost}
                </p>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3">
                    <Square className="w-4 h-4" />
                    <span>{item.thickness}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="w-4 h-4" />
                    <span>{item.speed}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Square className="w-4 h-4" />
                    <span
                      className={item.highlighted ? "text-white" : "text-primary"}
                    >
                      {item.precision}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CircleDot className="w-4 h-4" />
                    <span>{item.range}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Solutions Section */}
      <section className="bg-[#f5f5f5] py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left - Content */}
            <div>
              <p className="text-dark/60 text-base mb-4">Our Solutions</p>
              <div className="flex gap-4 mb-6">
                <span className="text-xs text-dark/60 border-b border-dark/30 pb-1">
                  Metal Sheet Laser Cutting
                </span>
                <span className="text-xs text-dark/60">|</span>
                <span className="text-xs text-dark/60">Tube Laser Cutting</span>
              </div>
              <p className="text-dark/60 text-sm mb-4">
                Outdated equipment like flame and plasma cutters create noise,
                vibration, toxic emissions, and slow production. With limited
                precision and excessive waste, your margins are suffering.
              </p>

              <div className="mt-8">
                <p className="text-primary text-base font-semibold mb-4">
                  In Spotlight
                </p>
                <h3 className="text-4xl lg:text-5xl font-semibold text-dark mb-6">
                  Bodor A Series
                </h3>
                <p className="text-dark mb-4">
                  Reliable Choice for Efficiency and Effortless Operation
                </p>

                <ul className="space-y-2 mb-8">
                  {productFeatures.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-dark rounded-full" />
                      <span className="text-lg text-dark">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right - Machine image */}
            <div className="relative">
              <Image
                src="/products/a-series.webp"
                alt="Bodor A Series"
                width={704}
                height={400}
                className="object-contain"
              />
              <p className="text-sm text-dark/60 mt-4 text-center">
                Equipped with 1.5G acceleration and a lightweight yet robust
                structure, the A Series maximizes efficiency and the value
                created every second.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="bg-white py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-dark/60 text-base mb-4">Features & Benefits</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {featureCards.map((card, index) => (
              <div
                key={index}
                className="bg-[#faf7f5] rounded-xl p-6 lg:p-8 text-center"
              >
                {card.value ? (
                  <>
                    <p className="text-3xl lg:text-4xl font-semibold text-primary mb-2">
                      {card.value}
                    </p>
                    <p className="text-sm text-dark/60">{card.subtitle}</p>
                  </>
                ) : (
                  <>
                    <p className="text-lg font-medium text-dark mb-2">
                      {card.title}
                    </p>
                    {card.subtitle && (
                      <p className="text-sm text-dark/60">{card.subtitle}</p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Type of Sizes Section */}
      <section className="bg-white py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-dark/60 text-base mb-4">Type of Sizes</p>
          </div>

          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="/articles/transform-sizes.jpg"
              alt="Available machine sizes"
              width={1150}
              height={1000}
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-white py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="/articles/transform-bottom-cta.jpg"
              alt="Laser cutting in action"
              width={1142}
              height={288}
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
              <div className="p-8 lg:p-16 max-w-[600px]">
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src="/bodor.png"
                    alt="Bodor logo"
                    width={60}
                    height={30}
                    className="object-contain"
                  />
                </div>
                <p className="text-white text-lg lg:text-xl font-light">
                  The ideal cutting machine has transformative consultation
                  processes for a capable service center
                </p>
                <Link
                  href="https://wa.me/6285213238172"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6"
                >
                  <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 h-10 rounded">
                    Chat Now on Whatsapp
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
