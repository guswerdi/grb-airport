import type { Metadata } from "next";
import { BALI_DESTINATIONS } from "@/data/destinations";
import { GenericRouteContent, routeMetadata } from "@/components/RoutePageFactory";

const destination = BALI_DESTINATIONS.find(
  (d) => d.slug === "bali-airport-transfer-to-tanah-lot"
)!;

export const metadata: Metadata = routeMetadata(destination);

export default function TanahLotRoutePage() {
  return <GenericRouteContent destination={destination} />;
}
