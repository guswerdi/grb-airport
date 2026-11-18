export interface RouteGeometry {
  /** Destination center [lat, lng] */
  coordinates: [number, number];
  /** Primary highway / road corridor description (rendered in UI & SSR text) */
  corridorLabel: string;
  /** Whether the route typically crosses the Bali Mandara Ocean Tollway */
  viaMandaraToll: boolean;
  /** Ordered road waypoints from DPS Airport [-8.7482, 115.1672] to the destination */
  waypoints: [number, number][];
}

export const DPS_AIRPORT_COORDS: [number, number] = [-8.7482, 115.1672];

export const ROUTE_GEOMETRY: Record<string, RouteGeometry> = {
  "kuta-legian": {
    coordinates: [-8.718, 115.169],
    corridorLabel: "Via Jl. Airport Ngurah Rai & Jl. Raya Kuta",
    viaMandaraToll: false,
    waypoints: [
      DPS_AIRPORT_COORDS,
      [-8.7445, 115.1765],
      [-8.732, 115.1735],
      [-8.718, 115.169],
    ],
  },
  jimbaran: {
    coordinates: [-8.7795, 115.168],
    corridorLabel: "Via Jl. Bypass Ngurah Rai South & Kedonganan",
    viaMandaraToll: false,
    waypoints: [
      DPS_AIRPORT_COORDS,
      [-8.7495, 115.1785],
      [-8.764, 115.1765],
      [-8.7795, 115.168],
    ],
  },
  seminyak: {
    coordinates: [-8.6865, 115.1565],
    corridorLabel: "Via Sunset Road & Jl. Kayu Aya / Petitenget",
    viaMandaraToll: false,
    waypoints: [
      DPS_AIRPORT_COORDS,
      [-8.7445, 115.1795],
      [-8.7215, 115.182],
      [-8.693, 115.1745],
      [-8.6865, 115.1565],
    ],
  },
  "nusa-dua": {
    coordinates: [-8.7985, 115.228],
    corridorLabel: "Via Bali Mandara Ocean Tollway & Bypass Nusa Dua",
    viaMandaraToll: true,
    waypoints: [
      DPS_AIRPORT_COORDS,
      [-8.7422, 115.1862],
      [-8.758, 115.2025],
      [-8.7825, 115.2065],
      [-8.7985, 115.228],
    ],
  },
  kerobokan: {
    coordinates: [-8.6675, 115.161],
    corridorLabel: "Via Sunset Road & Jl. Raya Kerobokan",
    viaMandaraToll: false,
    waypoints: [
      DPS_AIRPORT_COORDS,
      [-8.7445, 115.1795],
      [-8.7215, 115.182],
      [-8.6815, 115.1715],
      [-8.6675, 115.161],
    ],
  },
  sanur: {
    coordinates: [-8.6785, 115.2625],
    corridorLabel: "Via Bali Mandara Tollway & Jl. Bypass Ngurah Rai Sanur",
    viaMandaraToll: true,
    waypoints: [
      DPS_AIRPORT_COORDS,
      [-8.7422, 115.1862],
      [-8.7245, 115.211],
      [-8.706, 115.244],
      [-8.6785, 115.2625],
    ],
  },
  "nusa-dua-atas": {
    coordinates: [-8.821, 115.213],
    corridorLabel: "Via Bali Mandara Ocean Tollway, Kampial & Sawangan Cliff",
    viaMandaraToll: true,
    waypoints: [
      DPS_AIRPORT_COORDS,
      [-8.7422, 115.1862],
      [-8.758, 115.2025],
      [-8.7825, 115.2065],
      [-8.803, 115.2115],
      [-8.821, 115.213],
    ],
  },
  benoa: {
    coordinates: [-8.759, 115.2215],
    corridorLabel: "Via Bali Mandara Ocean Tollway & Jl. Pratama",
    viaMandaraToll: true,
    waypoints: [
      DPS_AIRPORT_COORDS,
      [-8.7422, 115.1862],
      [-8.758, 115.2025],
      [-8.7825, 115.2065],
      [-8.7735, 115.2195],
      [-8.759, 115.2215],
    ],
  },
  canggu: {
    coordinates: [-8.6478, 115.1385],
    corridorLabel: "Via Sunset Road, Kerobokan & Jl. Raya Canggu",
    viaMandaraToll: false,
    waypoints: [
      DPS_AIRPORT_COORDS,
      [-8.7445, 115.1795],
      [-8.7215, 115.182],
      [-8.6765, 115.1695],
      [-8.6435, 115.155],
      [-8.6478, 115.1385],
    ],
  },
  uluwatu: {
    coordinates: [-8.8185, 115.1125],
    corridorLabel: "Via Bypass Ngurah Rai, Jimbaran Hills & Jl. Raya Uluwatu",
    viaMandaraToll: false,
    waypoints: [
      DPS_AIRPORT_COORDS,
      [-8.755, 115.179],
      [-8.789, 115.181],
      [-8.817, 115.151],
      [-8.8185, 115.1125],
    ],
  },
  ubud: {
    coordinates: [-8.5069, 115.2625],
    corridorLabel: "Via Bypass Ngurah Rai, Batubulan & Sukawati / Mas",
    viaMandaraToll: true,
    waypoints: [
      DPS_AIRPORT_COORDS,
      [-8.7422, 115.1862],
      [-8.716, 115.225],
      [-8.641, 115.2585],
      [-8.582, 115.2715],
      [-8.5069, 115.2625],
    ],
  },
  "tanah-lot-tabanan": {
    coordinates: [-8.6212, 115.0868],
    corridorLabel: "Via Sunset Road, Kerobokan & Jl. Bypass Tanah Lot",
    viaMandaraToll: false,
    waypoints: [
      DPS_AIRPORT_COORDS,
      [-8.7215, 115.182],
      [-8.665, 115.172],
      [-8.618, 115.141],
      [-8.6212, 115.0868],
    ],
  },
  klungkung: {
    coordinates: [-8.5565, 115.432],
    corridorLabel: "Via Bali Mandara Tollway & Prof. Ida Bagus Mantra Bypass",
    viaMandaraToll: true,
    waypoints: [
      DPS_AIRPORT_COORDS,
      [-8.716, 115.225],
      [-8.652, 115.276],
      [-8.597, 115.351],
      [-8.5565, 115.432],
    ],
  },
  "tegallalang-payangan": {
    coordinates: [-8.4312, 115.2792],
    corridorLabel: "Via Bypass Ngurah Rai, Gianyar & Ubud Northern Foothills",
    viaMandaraToll: true,
    waypoints: [
      DPS_AIRPORT_COORDS,
      [-8.716, 115.225],
      [-8.641, 115.2585],
      [-8.5069, 115.2625],
      [-8.4312, 115.2792],
    ],
  },
  "sidemen-candidasa": {
    coordinates: [-8.5315, 115.5085],
    corridorLabel: "Via Prof. Ida Bagus Mantra East Coast Highway to Padangbai",
    viaMandaraToll: true,
    waypoints: [
      DPS_AIRPORT_COORDS,
      [-8.716, 115.225],
      [-8.622, 115.312],
      [-8.5565, 115.432],
      [-8.5315, 115.5085],
    ],
  },
  munduk: {
    coordinates: [-8.2685, 115.0815],
    corridorLabel: "Via Mengwi, Bedugul Highlands & Lake Beratan Pass",
    viaMandaraToll: false,
    waypoints: [
      DPS_AIRPORT_COORDS,
      [-8.705, 115.1815],
      [-8.545, 115.1725],
      [-8.395, 115.188],
      [-8.275, 115.1665],
      [-8.2685, 115.0815],
    ],
  },
  "lovina-munduk": {
    coordinates: [-8.161, 115.0255],
    corridorLabel: "Via Mengwi, Bedugul Mountain Pass, Gitgit & Singaraja",
    viaMandaraToll: false,
    waypoints: [
      DPS_AIRPORT_COORDS,
      [-8.705, 115.1815],
      [-8.545, 115.1725],
      [-8.275, 115.1665],
      [-8.195, 115.132],
      [-8.161, 115.0255],
    ],
  },
  "amed-tulamben": {
    coordinates: [-8.3345, 115.6465],
    corridorLabel: "Via East Coast Bypass, Candidasa & Amlapura Coastal Road",
    viaMandaraToll: true,
    waypoints: [
      DPS_AIRPORT_COORDS,
      [-8.716, 115.225],
      [-8.5565, 115.432],
      [-8.505, 115.565],
      [-8.445, 115.616],
      [-8.3345, 115.6465],
    ],
  },
};
