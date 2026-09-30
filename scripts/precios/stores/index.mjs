import { jumbo } from "./jumbo.mjs";
import { cencosud } from "./cencosud.mjs";
import { unimarc } from "./unimarc.mjs";
import { tottus } from "./tottus.mjs";
import { lider } from "./lider.mjs";

// Santa Isabel comparte BFF con Jumbo y hoy bloquea a GitHub (403); se deja disponible
// para cuando se desbloquee (activar con PRECIOS_SANTA_ISABEL=1).
export function allStores() {
  const stores = [jumbo(), unimarc(), tottus(), lider()];
  if (process.env.PRECIOS_SANTA_ISABEL) stores.splice(1, 0, cencosud("santaisabel"));
  return stores;
}
