import { Amenity } from "../../../models/amenities-enum";

const AMENITY_ICONS = new Map([
  ["Pets allowed", "pet"],
  ["Thermostat", "thermostat"],
  ["Dishwasher", "dishwasher"],
  ["Balcony", "balcony"],
  ["Air-conditioning unit", "ac"],
  ["Energy saving program", "eco"],
  ["Garage", "garage"],
  ["Baby Bedroom", "bedroom_baby"],
  ["Fireplace", "fireplace"],
]);

export function generateAmenity(amenityName: Amenity): HTMLDivElement {
  const amenity = document.createElement("div");
  amenity.classList.add("amenity");

  const iconName = AMENITY_ICONS.get(amenityName);
  const amenityIcon = document.createElement("img");
  amenityIcon.classList.add("icon-30", "tag-icon");
  amenityIcon.setAttribute("src", `/icons/${iconName}.svg`);

  const amenityText = document.createElement("p");
  amenityText.textContent = amenityName;

  amenity.append(amenityIcon, amenityText);
  return amenity;
}
