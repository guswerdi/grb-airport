import type { Metadata } from "next";
import { BALI_DESTINATIONS } from "@/data/destinations";
import { GenericRouteContent, routeMetadata } from "@/components/RoutePageFactory";

const destination = BALI_DESTINATIONS.find(
  (d) => d.slug === "bali-airport-transfer-to-nusa-dua-atas"
)!;

export const metadata: Metadata = routeMetadata(destination);

export default function NusaDuaAtasRoutePage() {
  return <GenericRouteContent destination={destination} />;
}
