import type { LucideIcon } from "lucide-react"
import { Building2, Camera, Gift, UtensilsCrossed } from "lucide-react"

export type WeddingPackage = {
    id: string
    name: string
    badge: string
    price: string
    pax: string
    description: string
    image: string
    color: "rose" | "green"
}

export type PackageSection = {
    title: string
    icon: LucideIcon
    items: string[]
}

export const weddingPackages: WeddingPackage[] = [
    {
        id: "suka-sama-suka-300",
        name: "Suka Sama Suka",
        badge: "Promo",
        price: "RM 13,900",
        pax: "300 Pax",
        description: "Best for intimate weddings",
        image: "/kahwinheader.jpg",
        color: "rose",
    },
    {
        id: "suka-sama-suka-500",
        name: "Suka Sama Suka",
        badge: "Popular",
        price: "RM 16,900",
        pax: "500 Pax",
        description: "Best for larger celebrations",
        image: "/zuljannahmain.jpg",
        color: "green",
    },
]

export const packageSections: PackageSection[] = [
    {
        title: "Hall & Setup",
        icon: Building2,
        items: [
            "Air-conditioned hall",
            "Round dining tables",
            "Chiavari chairs",
            "Red carpet",
            "Buffet tables",
        ],
    },
    {
        title: "Dining & Tea",
        icon: UtensilsCrossed,
        items: [
            "Bride and groom dining set",
            "Teh tarik",
            "Traditional Malay desserts",
            "Mung bean porridge",
        ],
    },
    {
        title: "Main Menu",
        icon: Gift,
        items: [
            "Biryani or oil rice",
            "Ayam masak merah",
            "Daging masak hitam",
            "Dalca vegetables",
            "Fresh fruit",
        ],
    },
    {
        title: "Bridal & Photo",
        icon: Camera,
        items: [
            "Full-stage dais",
            "Standing makeup",
            "Entrance decoration and arch",
            "Official photographer",
            "Editing and softcopy pendrive",
        ],
    },
]

export function getWeddingPackage(packageId: string) {
    return weddingPackages.find((weddingPackage) => weddingPackage.id === packageId)
}
