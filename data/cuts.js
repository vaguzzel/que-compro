// Fichas de cortes: de dónde vienen, para qué sirven, cómo se cocinan y en qué platos quedan mejor.
// Se muestran con el botón ⓘ en el paso de carnes del asado.
//   animal  vacuno | cerdo | pollo | cordero | pescado  (dibujo en js/diagrams.js)
//   zone    zona del dibujo que se resalta (null = sin zona, p. ej. embutidos)
//   aka     otros nombres (Argentina, Brasil, inglés…)
(function (root) {
  var QC = root.QC = root.QC || {};
  QC.CUTS = {
    /* ---------------- Vacuno ---------------- */
    lomo_vetado: {
      animal: "vacuno", zone: "lomo_vetado", aka: "Rib eye · ojo de bife · bife ancho (Arg.)",
      from: "La parte alta del lomo, hacia adelante, sobre las costillas altas.",
      use: "Muy veteado de grasa: jugoso, blando y con mucho sabor. De los cortes más pedidos para la parrilla.",
      cook: "Parrilla o sartén a fuego fuerte, en bifes de 2 a 3 cm. Se sella y se da vuelta una sola vez.",
      time: "4 a 5 min por lado para término medio (bife de 2,5 cm).",
      dishes: ["Solo a la parrilla con sal de mar", "Con pebre y ensalada chilena", "Lomo a lo pobre", "Churrasco"],
      tip: "Sácalo del refri 30 minutos antes y sálalo justo antes de ponerlo al fuego."
    },
    lomo_liso: {
      animal: "vacuno", zone: "lomo_liso", aka: "Striploin · bife angosto (Arg.) · a veces llamado entrecot",
      from: "La parte alta del lomo, detrás del lomo vetado.",
      use: "Magro, con una capa de grasa en un borde. Tierno y fácil de porcionar.",
      cook: "En bifes a la parrilla o plancha, o entero a fuego medio e indirecto.",
      time: "Bifes: 3 a 4 min por lado. Entero: 40 a 50 min.",
      dishes: ["Bistec a lo pobre", "Churrasco italiano", "Roast beef", "Carpaccio (crudo y bien frío)"],
      tip: "Haz unos cortes en la grasa del borde para que el bife no se enrosque."
    },
    filete: {
      animal: "vacuno", zone: "filete", aka: "Solomillo · lomo (Arg.) · tenderloin",
      from: "Un músculo interior que va por debajo del lomo liso.",
      use: "El más tierno de todos, con muy poca grasa. También el más caro.",
      cook: "En medallones gruesos a fuego fuerte, o entero: se sella y se termina a fuego indirecto.",
      time: "Medallones de 4 cm: 3 a 4 min por lado.",
      dishes: ["Medallones con salsa de champiñones", "Brochetas", "Filete Wellington", "Carpaccio"],
      tip: "Como tiene poca grasa se seca si se pasa: mejor dejarlo jugoso."
    },
    entrana: {
      animal: "vacuno", zone: "entrana", aka: "Skirt steak · entraña (Arg.)",
      from: "El diafragma: el músculo que separa el pecho del abdomen.",
      use: "Delgada, de fibras marcadas y muchísimo sabor. La estrella del asado para picar.",
      cook: "Entera a la parrilla a fuego fuerte, con su telita (o pelada si es muy gruesa).",
      time: "4 a 6 min por lado; se come jugosa.",
      dishes: ["En tablita para picar con pebre", "Tacos o fajitas", "Sándwich con palta", "Con chimichurri"],
      tip: "Córtala en tiras contra la fibra para que quede blanda."
    },
    punta_ganso: {
      animal: "vacuno", zone: "cadera", aka: "Picaña · picanha (Brasil) · tapa de cuadril (Arg.) · rump cap",
      from: "El cuarto trasero, sobre la cadera, detrás del lomo liso.",
      use: "Triangular, con una capa gruesa de grasa que la mantiene jugosa. Muy sabrosa.",
      cook: "Entera con la grasa hacia el fuego a fuego medio, o en lonjas gruesas en espadas, a la brasileña.",
      time: "Entera: 35 a 45 min dándola vuelta. En lonjas: 5 a 6 min por lado.",
      dishes: ["Picaña a la parrilla con sal gruesa", "Al palo", "Rodizio con farofa y vinagreta"],
      tip: "Marca la grasa en rombos sin llegar a la carne, pero no se la saques: ahí está el sabor."
    },
    punta_picana: {
      animal: "vacuno", zone: "cadera", aka: "Colita de cuadril (Arg.) · maminha (Brasil) · tri-tip",
      from: "El extremo inferior de la cadera, en el cuarto trasero.",
      use: "Triangular, tierna y con poca grasa por fuera.",
      cook: "Entera a fuego medio e indirecto, o al horno.",
      time: "30 a 40 min entera, dándola vuelta.",
      dishes: ["Asado a la parrilla", "Al horno con papas", "Laminada en sándwich"],
      tip: "Déjala reposar 10 minutos antes de cortarla contra la fibra."
    },
    asado_tira: {
      animal: "vacuno", zone: "costillas", aka: "Short ribs · tira de asado (Arg.)",
      from: "Las costillas del medio, cortadas en tiras a lo ancho de los huesos.",
      use: "Carne con hueso y grasa: muy sabrosa, algo firme.",
      cook: "Parrilla a fuego medio-bajo y lento, primero por el lado del hueso.",
      time: "40 a 60 min según el grosor.",
      dishes: ["El clásico del asado", "Al horno con papas", "Costillar BBQ (en trozos grandes)"],
      tip: "Paciencia: con fuego fuerte queda duro."
    },
    punta_paleta: {
      animal: "vacuno", zone: "paleta", aka: "Top blade · marucha (Arg.)",
      from: "El cuarto delantero, en la paleta (el hombro).",
      use: "Sabrosa, con un nervio al centro. Muy buena relación entre precio y calidad.",
      cook: "Entera a la parrilla a fuego medio o al horno; también en bistecs finos.",
      time: "Entera: 40 a 50 min.",
      dishes: ["Asado a la parrilla", "Al horno con papas", "Estofado", "Churrasco"],
      tip: "Si la haces en bistec, córtala a los lados del nervio central."
    },
    plateada: {
      animal: "vacuno", zone: "plateada", aka: "Rib cap · tapa de asado (Arg.)",
      from: "El costado del pecho, sobre las costillas y justo debajo de la malaya.",
      use: "Con grasa entreverada y cubierta por una tela plateada que le da el nombre. Se deshace con cocción lenta.",
      cook: "Al horno o a la olla, tapada y a fuego bajo. En la parrilla, solo a fuego muy bajo.",
      time: "Horno: 2 a 3 horas a 160 °C.",
      dishes: ["Plateada con puré picante", "Carne al jugo", "Sándwich de plateada"],
      tip: "Hornéala tapada con papel aluminio y un chorrito de vino o caldo."
    },
    sobrecostilla: {
      animal: "vacuno", zone: "sobrecostilla", aka: "Chuck · bife de aguja (Arg.)",
      from: "El cuarto delantero, sobre las primeras costillas, entre el huachalomo y el lomo vetado.",
      use: "Mezcla de músculos con vetas de grasa: sabrosa y económica.",
      cook: "A la parrilla a fuego medio-bajo, o guisada.",
      time: "Parrilla: 40 a 50 min. Olla: 1,5 a 2 horas.",
      dishes: ["Asado económico", "Carne mechada", "Estofado", "Cazuela"],
      tip: "Sirve para agrandar el asado sin gastar tanto."
    },
    tapapecho: {
      animal: "vacuno", zone: "pecho", aka: "Brisket · pecho (Arg.)",
      from: "La parte baja del pecho, en el cuarto delantero.",
      use: "Tiene un cordón de grasa. Queda duro si se cocina rápido y exquisito con cocción larga.",
      cook: "Ahumado o al horno a baja temperatura. En la parrilla, solo a fuego muy bajo y por horas.",
      time: "3 a 6 horas a baja temperatura.",
      dishes: ["Brisket ahumado", "Tapapecho al horno", "Carne mechada", "Charquicán"],
      tip: "Envuélvelo en papel aluminio la segunda mitad de la cocción para que quede jugoso."
    },
    palanca: {
      animal: "vacuno", zone: "vacio", aka: "Flank steak · fraldinha (Brasil) · parte del vacío (Arg.)",
      from: "El cuarto trasero, en el flanco (bajo el vientre).",
      use: "Delgada, rectangular y magra, de fibras largas. Mucho sabor.",
      cook: "Parrilla a fuego fuerte y rápido, idealmente marinada.",
      time: "5 a 7 min por lado.",
      dishes: ["Fajitas", "A la parrilla con chimichurri", "Lomo saltado", "Arrollado"],
      tip: "Córtala siempre en láminas finas contra la fibra."
    },
    tapabarriga: {
      animal: "vacuno", zone: "vacio", aka: "Thin flank · vacío (Arg.)",
      from: "El cuarto trasero, en el vientre, entre la palanca y la punta picana.",
      use: "Delgada e irregular, muy tierna y sabrosa.",
      cook: "Parrilla a fuego medio-fuerte, o rellena al horno.",
      time: "8 a 10 min por lado a la parrilla.",
      dishes: ["Asado a la parrilla", "Tapabarriga rellena al horno", "Mechada"],
      tip: "Queda increíble marinada con ajo, merkén y aceite."
    },
    malaya: {
      animal: "vacuno", zone: "malaya", aka: "Matambre (Arg.)",
      from: "La capa delgada que cubre las costillas y el vientre, entre el cuero y las costillas.",
      use: "Muy delgada, de fibras largas. Se usa enrollada o directo a la parrilla.",
      cook: "Parrilla a fuego bajo, o arrollada y cocida.",
      time: "Parrilla: 25 a 35 min. Arrollado: 1,5 horas.",
      dishes: ["Malaya arrollada", "Matambre a la pizza", "En tiras para picar"],
      tip: "Rellénala con zanahoria, huevo duro y pimentón antes de enrollarla."
    },
    huachalomo: {
      animal: "vacuno", zone: "cuello", aka: "Chuck roll · aguja (Arg.)",
      from: "La parte alta del cuello, entre la cabeza y el lomo vetado.",
      use: "Mucho sabor y colágeno; necesita cocción larga.",
      cook: "Olla, horno o guisos.",
      time: "1,5 a 3 horas.",
      dishes: ["Carne mechada", "Estofado", "Cazuela", "Carne al jugo"],
      tip: "No es para la parrilla rápida: brilla en la olla."
    },
    asado_carnicero: {
      animal: "vacuno", zone: "paleta", aka: "Chuck cover",
      from: "La cara interna del hueso de la paleta, en el cuarto delantero.",
      use: "Alargado y triangular, con vetas fibrosas y algo de nervio.",
      cook: "Parrilla a fuego medio-bajo, o guisado.",
      time: "Parrilla: 40 a 60 min. Olla: 2 horas.",
      dishes: ["Asado a la parrilla", "Estofado", "Cazuela", "A la cacerola"],
      tip: "Dicen que se llama así porque era el que los carniceros se guardaban para ellos."
    },
    choclillo: {
      animal: "vacuno", zone: "pecho", aka: "Similar al eye of round",
      from: "El cuarto delantero, en la zona del pecho, delante de la punta paleta. Tiene forma de huso.",
      use: "Magro y firme.",
      cook: "A la olla o al horno, o en bistec fino.",
      time: "Olla: 1,5 a 2 horas.",
      dishes: ["Carne al jugo", "Mechada", "Churrasco", "Bistec"],
      tip: "Si lo haces en bistec, golpéalo un poco para ablandarlo."
    },
    abastero: {
      animal: "vacuno", zone: "garron", aka: "Heel · garrón trasero",
      from: "La parte de atrás de la pierna trasera, detrás del osobuco.",
      use: "Ovalado, con mucho colágeno y sabor. Económico.",
      cook: "Cocción lenta a la olla.",
      time: "2 a 3 horas.",
      dishes: ["Cazuela", "Estofado", "Carne al jugo", "Caldillo"],
      tip: "Perfecto para la cazuela del día siguiente al asado."
    },

    /* ---------------- Cerdo ---------------- */
    costillar: {
      animal: "cerdo", zone: "costillar", aka: "Pork ribs · costillitas",
      from: "Las costillas, en el costado del cerdo.",
      use: "Carne entre huesos, jugosa y con grasa.",
      cook: "Parrilla a fuego bajo e indirecto, o primero al horno tapado y después a la parrilla.",
      time: "1 a 1,5 horas a fuego bajo (o 2 horas al horno a 160 °C).",
      dishes: ["Costillar a la parrilla con merkén", "Costillitas BBQ", "Costillar al horno con papas"],
      tip: "Adóbalo la noche anterior con ajo, merkén, orégano y limón."
    },
    pulpa_cerdo: {
      animal: "cerdo", zone: "pierna", aka: "Pierna de cerdo sin hueso",
      from: "La pierna del cerdo, deshuesada.",
      use: "Magra y versátil.",
      cook: "En trozos o brochetas a la parrilla, al horno o en guisos.",
      time: "Trozos: 15 a 20 min. Entera al horno: 1,5 horas.",
      dishes: ["Brochetas", "Pulpa al horno", "Salteados", "Arroz chaufa"],
      tip: "El cerdo se come bien cocido, sin partes rosadas crudas."
    },
    chuleta: {
      animal: "cerdo", zone: "lomo", aka: "Pork chop",
      from: "El lomo del cerdo, cortado con su hueso de costilla.",
      use: "Jugosa y rápida de hacer.",
      cook: "Parrilla o sartén a fuego medio.",
      time: "5 a 6 min por lado.",
      dishes: ["Chuleta con puré", "A la parrilla con ensalada chilena", "Chuleta con arroz"],
      tip: "Haz unos cortecitos en el borde de grasa para que no se curve."
    },
    malaya_cerdo: {
      animal: "cerdo", zone: "panceta", aka: "Matambre de cerdo (Arg.)",
      from: "La capa delgada del vientre del cerdo, sobre las costillas.",
      use: "Delgada y sabrosa; se dora rápido.",
      cook: "Parrilla a fuego medio, o arrollada.",
      time: "20 a 30 min.",
      dishes: ["Malaya arrollada", "En tiras para picar", "Matambre a la pizza"],
      tip: "Termínala a fuego fuerte para que quede crujiente."
    },
    lomo_cerdo: {
      animal: "cerdo", zone: "lomo", aka: "Pork loin · lomo (Arg.)",
      from: "La parte alta del lomo del cerdo, sin hueso.",
      use: "Magro y tierno.",
      cook: "Entero al horno, o en medallones a la parrilla o sartén.",
      time: "Horno: 50 a 60 min a 180 °C. Medallones: 5 min por lado.",
      dishes: ["Lomo al horno con ciruelas", "Lomito para sándwich", "Medallones con champiñones"],
      tip: "Envuélvelo en tocino para que no se seque."
    },
    panceta: {
      animal: "cerdo", zone: "panceta", aka: "Pork belly · tocino fresco",
      from: "El vientre del cerdo, con capas de grasa y carne.",
      use: "Grasa y sabrosa; queda crujiente.",
      cook: "Parrilla a fuego bajo y al final fuerte, o al horno.",
      time: "40 a 60 min.",
      dishes: ["Panceta crujiente para picar", "En pan con pebre", "Chicharrones"],
      tip: "Sécala bien y sálala para que el cuero quede crocante."
    },

    /* ---------------- Pollo ---------------- */
    trutro: {
      animal: "pollo", zone: "trutro", aka: "Pierna entera (muslo + tuto)",
      from: "La pierna completa del pollo: el muslo y el tuto.",
      use: "Jugoso, difícil de secar y económico.",
      cook: "Parrilla a fuego medio-bajo, al horno o en guisos.",
      time: "35 a 45 min a la parrilla.",
      dishes: ["Pollo asado con merkén", "Cazuela de ave", "Pollo al horno con papas", "Pollo arvejado"],
      tip: "Está listo cuando al pincharlo el jugo sale transparente."
    },
    trutro_corto: {
      animal: "pollo", zone: "trutro", aka: "Tuto · drumstick",
      from: "La parte baja de la pierna del pollo.",
      use: "Fácil de comer con la mano: ideal para niños.",
      cook: "Parrilla a fuego medio o al horno.",
      time: "25 a 35 min.",
      dishes: ["Trutros BBQ", "Al horno con papas", "Para los niños"],
      tip: "Adóbalos con ajo, limón y merkén una hora antes."
    },
    alitas: {
      animal: "pollo", zone: "ala", aka: "Wings",
      from: "Las alas del pollo.",
      use: "Poca carne y mucha piel crujiente: puro picoteo.",
      cook: "Parrilla o horno a fuego medio y al final fuerte para dorarlas.",
      time: "25 a 35 min.",
      dishes: ["Alitas BBQ", "Alitas picantes", "Con miel y soya"],
      tip: "Sécalas bien antes de adobarlas para que la piel quede crocante."
    },
    pechuga: {
      animal: "pollo", zone: "pechuga", aka: "Breast",
      from: "El pecho del pollo.",
      use: "Magra, blanca y sin hueso. Se seca si se pasa.",
      cook: "En filetes delgados a la parrilla o sartén, o marinada en brochetas.",
      time: "5 a 6 min por lado (filetes de 1,5 cm).",
      dishes: ["Brochetas", "A la plancha con ensalada", "Pollo mechado", "Fajitas"],
      tip: "Ábrela en mariposa o aplánala para que se cocine pareja."
    },
    pollo_entero: {
      animal: "pollo", zone: "todo", aka: "Pollo completo",
      from: "El pollo entero.",
      use: "Rinde para unas 4 personas.",
      cook: "Abierto en mariposa a la parrilla, o al horno.",
      time: "1 a 1,5 horas.",
      dishes: ["Pollo a la parrilla en mariposa", "Pollo al horno", "Pollo al cilindro"],
      tip: "Ábrelo por la columna y aplánalo para que se cocine parejo."
    },

    /* ---------------- Cordero ---------------- */
    pierna_cordero: {
      animal: "cordero", zone: "pierna", aka: "Leg of lamb",
      from: "La pierna trasera del cordero.",
      use: "Carne tierna y de sabor intenso.",
      cook: "Al horno o a la parrilla a fuego indirecto, entera o deshuesada.",
      time: "1,5 a 2 horas.",
      dishes: ["Cordero al palo", "Pierna al horno con romero", "Cordero con papas"],
      tip: "Hazle unos cortes y mete dientes de ajo y romero."
    },
    costillar_cordero: {
      animal: "cordero", zone: "costillar", aka: "Rack de cordero",
      from: "Las costillas del cordero.",
      use: "Sabroso y con grasa.",
      cook: "Parrilla a fuego medio-bajo, o al palo.",
      time: "1 a 1,5 horas.",
      dishes: ["Cordero al palo (asado magallánico)", "Costillitas a la parrilla"],
      tip: "Sal gruesa y nada más: el cordero no necesita mucho."
    },

    /* ---------------- Pescados y mariscos ---------------- */
    salmon: {
      animal: "pescado", zone: "filete", aka: "Salmon",
      from: "El filete del costado del salmón.",
      use: "Graso y jugoso; aguanta bien la parrilla.",
      cook: "A la parrilla con la piel hacia abajo, o envuelto en papel aluminio con verduras.",
      time: "10 a 15 min.",
      dishes: ["Salmón a la parrilla con limón", "Salmón en papillote", "Ceviche"],
      tip: "No lo des vuelta muchas veces porque se desarma."
    },
    reineta: {
      animal: "pescado", zone: "filete", aka: "Pescado blanco del Pacífico",
      from: "El filete de la reineta.",
      use: "Carne blanca, suave y firme.",
      cook: "A la parrilla en papel aluminio, a la plancha o al horno.",
      time: "8 a 12 min.",
      dishes: ["Reineta a la mantequilla", "Al horno con verduras", "Ceviche"],
      tip: "En papel aluminio con mantequilla, ajo y limón no falla."
    },
    camarones: {
      animal: "pescado", zone: null, aka: "Shrimp",
      from: "Crustáceo. Se venden crudos o cocidos, casi siempre congelados.",
      use: "Se cocinan rapidísimo.",
      cook: "En brochetas a la parrilla o salteados.",
      time: "2 a 3 min por lado.",
      dishes: ["Brochetas de camarón", "Camarones al pil pil", "Ceviche"],
      tip: "Descongélalos en el refri o bajo el agua fría, nunca con agua caliente."
    },

    /* ---------------- Embutidos ---------------- */
    longaniza: {
      animal: "cerdo", zone: null, aka: "Longaniza de Chillán",
      from: "Embutido de carne de cerdo con ajo, ají y especias.",
      use: "El clásico que inaugura el asado.",
      cook: "Parrilla a fuego medio, dándola vuelta seguido.",
      time: "15 a 20 min.",
      dishes: ["Choripán", "Con pebre y marraqueta", "Porotos con longaniza"],
      tip: "No la pinches: se le escapa el jugo."
    },
    chorizo: {
      animal: "cerdo", zone: null, aka: "Chorizo parrillero",
      from: "Embutido de cerdo (a veces con vacuno), con pimentón y especias.",
      use: "Más grueso y suave que la longaniza.",
      cook: "Parrilla a fuego medio-bajo.",
      time: "20 a 25 min.",
      dishes: ["Choripán con chimichurri", "Para picar con pebre"],
      tip: "Ábrelo en mariposa si quieres que esté listo más rápido."
    },
    choricillo: {
      animal: "cerdo", zone: null, aka: "Chorizo cóctel",
      from: "Chorizo pequeño de cerdo.",
      use: "Para picar mientras se hace el resto.",
      cook: "Parrilla a fuego medio.",
      time: "10 a 15 min.",
      dishes: ["Tablita para picar", "Mini choripanes"],
      tip: "Pínchalos en palitos de brocheta para darlos vuelta todos juntos."
    },
    prietas: {
      animal: "cerdo", zone: null, aka: "Morcilla",
      from: "Embutido de sangre de cerdo con cebolla y especias. La morcilla chilena.",
      use: "Suave y cremosa por dentro.",
      cook: "Parrilla a fuego bajo, sin reventarla.",
      time: "10 a 15 min.",
      dishes: ["Con puré picante", "En pan con pebre"],
      tip: "Ya viene cocida: solo hay que calentarla y dorarla."
    }
  };
})(typeof window !== "undefined" ? window : globalThis);
