import { createPropertiesGallery } from "../../shared/gallery";
import {
  adjustNavigation,
  handleSubnavigation,
  indicateNavigationButton,
} from "../../shared/navigation";
import { handleBackNavigation } from "../../shared/utils/handle-back-navigation";
import { createShortcutButtons } from "./create-shortcut-buttons";
import { installSearchRedirect } from "./search-redirect";

createShortcutButtons();
createPropertiesGallery();
adjustNavigation();
handleSubnavigation();
handleBackNavigation();
indicateNavigationButton();
installSearchRedirect();
