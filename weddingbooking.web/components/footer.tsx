import { MapPin, MessageCircle, Phone } from "lucide-react";

const contacts = [
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+60 11-1234 5678"],
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    lines: ["+60 11-1234 5678"],
  },
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["Lot 1234, Jalan Meru, 41050", "Klang, Selangor"],
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-emerald-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 md:grid-cols-3 lg:px-12">
        {contacts.map(({ icon: Icon, title, lines }, index) => (
          <div
            key={title}
            className={`flex items-start gap-4 md:px-7 ${
              index > 0 ? "md:border-l md:border-white/15" : ""
            }`}
          >
            <Icon className="mt-1 h-7 w-7 shrink-0 stroke-[1.6] text-amber-400" />
            <div>
              <h2 className="text-sm font-semibold">{title}</h2>
              {lines.map((line) => (
                <p key={line} className="mt-1 text-sm text-white/80">
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}
