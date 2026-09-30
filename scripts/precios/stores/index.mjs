import { cencosud } from "./cencosud.mjs";
import { unimarc } from "./unimarc.mjs";
import { tottus } from "./tottus.mjs";
import { lider } from "./lider.mjs";

export function allStores() {
  return [cencosud("jumbo"), cencosud("santaisabel"), unimarc(), tottus(), lider()];
}
