export function generateMapSrc(latitude: number, longitude: number): string {
  const delta = 0.01;

  const bbox = [
    longitude - delta,
    latitude - delta,
    longitude + delta,
    latitude + delta,
  ];

  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox.join(
    "%2C",
  )}&layer=mapnik&marker=${latitude}%2C${longitude}`;
}
