import React, { useState, useMemo } from 'react';

// --- DATOS Y ESTILOS (FUERA DEL COMPONENTE PARA EVITAR ERRORES) ---

const RECIPE_DATABASE = [
  // ==================================================
  // 🇪🇨 DESAYUNOS ECUATORIANOS & CLÁSICOS
  // ==================================================
  {
    id: 1,
    title: "Bolón de Verde con Queso y Chicharrón",
    category: "breakfast",
    time: "45 min",
    difficulty: "Medio",
    calories: 580,
    ingredients: ["verde", "queso", "cerdo", "mantequilla", "aceite", "sal"],
    steps: [
      "1. Pela los verdes y córtalos en trozos medianos.",
      "2. En abundante aceite caliente, fríe los verdes hasta que estén dorados y suaves por dentro (aprox. 15 min).",
      "3. Maja los verdes calientes en una batea o bowl con sal y una cucharada de mantequilla.",
      "4. Agrega el queso desmenuzado y trozos de chicharrón de cerdo frito. Amasa bien.",
      "5. Forma bolas grandes y compactas con las manos.",
      "6. (Opcional) Pasa los bolones nuevamente por aceite caliente para hacerlos crocantes por fuera."
    ]
  },
  {
    id: 2,
    title: "Tigrillo Zarumeño",
    category: "breakfast",
    time: "30 min",
    difficulty: "Fácil",
    calories: 450,
    ingredients: ["verde", "huevo", "queso", "leche", "cebolla", "mantequilla", "cilantro"],
    steps: [
      "1. Cocina los verdes pelados en agua con sal hasta que estén muy suaves. Escurre.",
      "2. Maja los verdes dejándolos un poco rústicos (con tropezones).",
      "3. En una sartén, haz un refrito con mantequilla y cebolla blanca picada.",
      "4. Añade el verde majado y mezcla. Luego agrega los huevos batidos y revuelve hasta cocinar.",
      "5. Incorpora el queso fresco y un chorrito de leche para dar cremosidad.",
      "6. Sirve caliente espolvoreado con cilantro picado."
    ]
  },
  {
    id: 3,
    title: "Majado de Verde con Huevo",
    category: "breakfast",
    time: "20 min",
    difficulty: "Muy Fácil",
    calories: 380,
    ingredients: ["verde", "huevo", "cebolla", "aceite", "sal"],
    steps: [
      "1. Pela y cocina el verde en agua hirviendo.",
      "2. Cuando esté suave, aplástalo con un tenedor (majado).",
      "3. Haz un refrito rápido de cebolla en una sartén con aceite o achiote.",
      "4. Mezcla el verde con el refrito.",
      "5. Sirve con dos huevos fritos encima (estrellados)."
    ]
  },
  {
    id: 4,
    title: "Humitas Caseras",
    category: "breakfast",
    time: "1 h 30 min",
    difficulty: "Difícil",
    calories: 320,
    ingredients: ["choclo", "queso", "huevo", "mantequilla", "cebolla", "maicena"],
    steps: [
      "1. Desgrana y muele el choclo tierno.",
      "2. Bate los huevos con la mantequilla derretida y mezcla con el choclo molido.",
      "3. Agrega un refrito de cebolla blanca, sal y un toque de azúcar. Si está muy líquido, añade un poco de maicena.",
      "4. Coloca una cucharada de masa y una tajada de queso en las hojas de choclo. Envuelve bien.",
      "5. Cocina al vapor en una tamalera por 45-60 minutos."
    ]
  },
  {
    id: 5,
    title: "Muchines de Yuca",
    category: "breakfast",
    time: "40 min",
    difficulty: "Medio",
    calories: 350,
    ingredients: ["yuca", "queso", "huevo", "cebolla", "aceite"],
    steps: [
      "1. Ralla la yuca cruda y exprime el líquido.",
      "2. Mezcla la yuca rallada con huevo, sal y un poco de cebolla picada.",
      "3. Toma porciones de masa, rellena con un trozo de queso y forma óvalos.",
      "4. Fríe en aceite caliente hasta que doren.",
      "5. Sirve con miel de panela o café."
    ]
  },
  {
    id: 6,
    title: "Tortillas de Verde (Rellenas)",
    category: "breakfast",
    time: "35 min",
    difficulty: "Medio",
    calories: 300,
    ingredients: ["verde", "queso", "carne", "achiote", "sal"],
    steps: [
      "1. Cocina los verdes en agua y májalos hasta obtener una masa suave.",
      "2. Agrega un poco de aceite con achiote y sal a la masa. Amasa bien.",
      "3. Forma tortillas finas y rellénalas con queso o carne molida cocida.",
      "4. Asa las tortillas en una plancha o sartén caliente hasta que doren por ambos lados."
    ]
  },
  {
    id: 7,
    title: "Patacón Pisao con Queso",
    category: "breakfast",
    time: "15 min",
    difficulty: "Fácil",
    calories: 280,
    ingredients: ["verde", "queso", "aceite", "sal"],
    steps: [
      "1. Corta el verde en rodajas gruesas (3 cm).",
      "2. Fríe las rodajas a fuego medio hasta que se cocinen por dentro pero no doren.",
      "3. Saca y aplasta las rodajas con una pataconera o tabla.",
      "4. Vuelve a freír los patacones a fuego alto hasta que estén crocantes.",
      "5. Cubre con una lámina de queso y deja que se derrita."
    ]
  },
  {
    id: 8,
    title: "Mote Pillo",
    category: "breakfast",
    time: "20 min",
    difficulty: "Fácil",
    calories: 400,
    ingredients: ["mote", "huevo", "cebolla", "leche", "achiote", "cilantro"],
    steps: [
      "1. Haz un refrito con manteca de color (achiote) y cebolla blanca.",
      "2. Agrega el mote cocido y mezcla bien para que tome sabor.",
      "3. Añade la leche y deja reducir un poco.",
      "4. Incorpora los huevos batidos y revuelve suavemente hasta que estén cremosos.",
      "5. Termina con cilantro picado."
    ]
  },
  {
    id: 9,
    title: "Empanadas de Viento",
    category: "breakfast",
    time: "40 min",
    difficulty: "Medio",
    calories: 350,
    ingredients: ["harina", "queso", "mantequilla", "azúcar", "polvo de hornear"],
    steps: [
      "1. Haz una masa con harina, agua fría, mantequilla, sal y polvo de hornear. Reposa 30 min.",
      "2. Estira discos finos de masa.",
      "3. Rellena con queso, cierra y repulga los bordes.",
      "4. Fríe en abundante aceite muy caliente y báñalas con aceite mientras fríen para que se inflen.",
      "5. Espolvorea azúcar encima al sacar."
    ]
  },
  {
    id: 10,
    title: "Pancakes de Avena y Banana",
    category: "breakfast",
    time: "15 min",
    difficulty: "Fácil",
    calories: 250,
    ingredients: ["avena", "banana", "huevo", "leche", "canela", "miel"],
    steps: [
      "1. Licúa la avena, la banana, el huevo y un chorrito de leche hasta tener una mezcla espesa.",
      "2. Calienta una sartén antiadherente con una pizca de mantequilla.",
      "3. Vierte porciones de la mezcla y cocina hasta que salgan burbujas, luego voltea.",
      "4. Sirve con miel y frutas."
    ]
  },
  {
    id: 11,
    title: "French Toast (Tostadas Francesas)",
    category: "breakfast",
    time: "15 min",
    difficulty: "Fácil",
    calories: 320,
    ingredients: ["pan", "huevo", "leche", "canela", "vainilla", "mantequilla"],
    steps: [
      "1. Bate los huevos con leche, canela y vainilla en un plato hondo.",
      "2. Remoja rebanadas de pan (mejor si es del día anterior) en la mezcla.",
      "3. Dora en una sartén con mantequilla a fuego medio.",
      "4. Sirve con azúcar impalpable o miel."
    ]
  },
  {
    id: 12,
    title: "Omelette de Queso y Jamón",
    category: "breakfast",
    time: "10 min",
    difficulty: "Fácil",
    calories: 300,
    ingredients: ["huevo", "queso", "jamón", "leche", "sal", "pimienta"],
    steps: [
      "1. Bate 2 o 3 huevos con un chorrito de leche, sal y pimienta.",
      "2. Vierte en una sartén caliente con mantequilla.",
      "3. Cuando empiece a cuajar, pon el queso y jamón en el centro.",
      "4. Dobla por la mitad y cocina un minuto más."
    ]
  },
  {
    id: 13,
    title: "Huevos Rancheros",
    category: "breakfast",
    time: "20 min",
    difficulty: "Fácil",
    calories: 380,
    ingredients: ["huevo", "tortilla", "frijoles", "tomate", "cebolla", "aguacate"],
    steps: [
      "1. Fríe ligeramente las tortillas de maíz.",
      "2. Prepara una salsa de tomate caliente con cebolla y chile (opcional).",
      "3. Fríe los huevos estrellados.",
      "4. Monta: Tortilla, capa de frijoles refritos, huevo y baña con la salsa."
    ]
  },
  {
    id: 14,
    title: "Batido de Frutas Tropical",
    category: "breakfast",
    time: "5 min",
    difficulty: "Muy Fácil",
    calories: 150,
    ingredients: ["banana", "leche", "papaya", "hielo", "azúcar"],
    steps: [
      "1. Pon la banana, papaya y leche en la licuadora.",
      "2. Agrega hielo y azúcar al gusto.",
      "3. Licúa hasta que esté cremoso y sirve frío."
    ]
  },
  {
    id: 15,
    title: "Sandwich de Aguacate y Huevo",
    category: "breakfast",
    time: "10 min",
    difficulty: "Muy Fácil",
    calories: 350,
    ingredients: ["pan", "aguacate", "huevo", "limón", "pimienta"],
    steps: [
      "1. Tuesta dos rebanadas de pan.",
      "2. Aplasta medio aguacate con sal y limón. Úntalo en el pan.",
      "3. Prepara un huevo frito o poché.",
      "4. Coloca el huevo sobre el aguacate y espolvorea pimienta roja."
    ]
  },

  // ==================================================
  // 🍲 ALMUERZOS ECUATORIANOS
  // ==================================================
  {
    id: 16,
    title: "Encebollado de Albacora",
    category: "lunch",
    time: "1h 30min",
    difficulty: "Medio",
    calories: 450,
    ingredients: ["pescado", "albacora", "yuca", "cebolla", "tomate", "cilantro", "limón"],
    steps: [
      "1. Hierve agua con tomate, pimiento, cebolla, ajo, comino y ají seco.",
      "2. Cocina la albacora y la yuca en ese caldo. Retira cuando estén listos.",
      "3. Licúa las verduras del caldo con un poco de yuca cocida para espesar y cierne de vuelta a la olla.",
      "4. Sirve en plato hondo: Yuca picada, albacora en láminas, caldo caliente.",
      "5. Corona con mucha cebolla curtida, cilantro y chifles."
    ]
  },
  {
    id: 17,
    title: "Seco de Pollo",
    category: "lunch",
    time: "50 min",
    difficulty: "Medio",
    calories: 550,
    ingredients: ["pollo", "tomate", "cebolla", "pimiento", "naranjilla", "cilantro", "arroz"],
    steps: [
      "1. Licúa tomate, pimiento, cebolla y jugo de naranjilla (o cerveza).",
      "2. En una olla, dora las presas de pollo con achiote.",
      "3. Agrega la mezcla licuada al pollo, sal, comino y pimienta.",
      "4. Tapa y cocina a fuego lento por 45 minutos hasta que espese.",
      "5. Sirve con arroz amarillo y maduro frito."
    ]
  },
  {
    id: 18,
    title: "Locro de Papa con Queso",
    category: "lunch",
    time: "40 min",
    difficulty: "Fácil",
    calories: 380,
    ingredients: ["papa", "leche", "queso", "cebolla", "achiote", "aguacate"],
    steps: [
      "1. Haz un refrito de cebolla blanca picada con achiote.",
      "2. Agrega papas peladas (mitad grandes, mitad chicas) y sofríe.",
      "3. Cubre con agua caliente y cocina hasta que las papas chicas se deshagan y espese.",
      "4. Agrega leche y queso fresco desmenuzado.",
      "5. Sirve con una tajada de aguacate y ají."
    ]
  },
  {
    id: 19,
    title: "Guatita con Maní",
    category: "lunch",
    time: "2 h",
    difficulty: "Difícil",
    calories: 600,
    ingredients: ["mondongo", "papa", "maní", "leche", "cebolla", "ajo"],
    steps: [
      "1. Lava y cocina el mondongo en olla de presión con olores hasta que esté suave. Pícalo.",
      "2. Prepara una salsa licuando pasta de maní con leche.",
      "3. Haz un refrito y cocina las papas en cubos junto con el mondongo y un poco de caldo.",
      "4. Cuando la papa esté suave, agrega la salsa de maní y hierve hasta espesar.",
      "5. Sirve con arroz blanco y huevo duro."
    ]
  },
  {
    id: 20,
    title: "Ceviche de Camarón",
    category: "lunch",
    time: "30 min",
    difficulty: "Fácil",
    calories: 320,
    ingredients: ["camarón", "limón", "naranja", "tomate", "cebolla", "salsa de tomate", "mostaza"],
    steps: [
      "1. Cocina los camarones en agua hirviendo con sal por 2 minutos. Enfría en hielo.",
      "2. Pica cebolla colorada (curtida) y tomate en cubos pequeños.",
      "3. Mezcla jugo de limón, naranja, salsa de tomate, mostaza, sal y pimienta.",
      "4. Incorpora los camarones y los vegetales.",
      "5. Acompaña con canguil, chifles o arroz."
    ]
  },
  {
    id: 21,
    title: "Arroz con Menestra y Carne Asada",
    category: "lunch",
    time: "45 min",
    difficulty: "Medio",
    calories: 700,
    ingredients: ["lenteja", "carne", "arroz", "verde", "cebolla", "tomate"],
    steps: [
      "1. Cocina la menestra (lenteja o frejol) previamente remojada.",
      "2. Haz un refrito de cebolla, tomate, pimiento y comino, y añádelo a la menestra.",
      "3. Aliña la carne de res con ajo, comino y sal. Ásala a la parrilla o sartén.",
      "4. Sirve la menestra con arroz blanco, la carne y patacones."
    ]
  },
  {
    id: 22,
    title: "Encocado de Pescado",
    category: "lunch",
    time: "40 min",
    difficulty: "Medio",
    calories: 500,
    ingredients: ["pescado", "coco", "cebolla", "pimiento", "tomate", "ajo"],
    steps: [
      "1. Licúa la pulpa de coco con agua tibia para sacar la primera leche (espesa) y la segunda (ligera).",
      "2. Haz un refrito con cebolla, pimiento, tomate y ajo. Agrega la segunda leche y deja hervir.",
      "3. Coloca los filetes de pescado y cocina a fuego lento tapado.",
      "4. Al final, agrega la leche espesa de coco y cilantro. No dejes hervir mucho para que no se corte."
    ]
  },
  {
    id: 23,
    title: "Chaulafán de Pollo",
    category: "lunch",
    time: "30 min",
    difficulty: "Medio",
    calories: 600,
    ingredients: ["arroz", "pollo", "huevo", "cebolla", "pimiento", "salsa de soja", "jengibre"],
    steps: [
      "1. Usa arroz cocinado frío del día anterior.",
      "2. En un wok o sartén grande, haz huevos revueltos y reserva.",
      "3. Saltea trozos de pollo a fuego alto. Agrega cebolla, pimiento y ajo picados.",
      "4. Incorpora el arroz y mezcla todo. Agrega salsa de soja (china) y una pizca de jengibre.",
      "5. Añade el huevo y cilantro picado al final."
    ]
  },
  {
    id: 24,
    title: "Sopa de Bolas de Verde",
    category: "lunch",
    time: "1 h 15 min",
    difficulty: "Difícil",
    calories: 550,
    ingredients: ["verde", "carne", "hueso", "maní", "choclo", "yuca", "huevo"],
    steps: [
      "1. Haz un caldo de carne con hueso, choclo y yuca.",
      "2. Cocina y maja verdes para la masa. Rellénala con refrito de carne, huevo duro y maní.",
      "3. Forma las bolas y ponlas en el caldo hirviendo suavemente.",
      "4. Cocina 10-15 min hasta que las bolas floten. Añade cilantro."
    ]
  },
  {
    id: 25,
    title: "Llapingachos con Chorizo",
    category: "lunch",
    time: "50 min",
    difficulty: "Medio",
    calories: 650,
    ingredients: ["papa", "queso", "achiote", "chorizo", "huevo", "maní", "aguacate"],
    steps: [
      "1. Cocina papas y haz un puré firme. Mezcla con refrito de cebolla y achiote.",
      "2. Forma tortillas gruesas rellenas de queso.",
      "3. Dora las tortillas en una plancha con poco aceite.",
      "4. Sirve con chorizo frito, huevo frito, salsa de maní, lechuga y aguacate."
    ]
  },
  {
    id: 26,
    title: "Cazuela de Pescado",
    category: "lunch",
    time: "50 min",
    difficulty: "Difícil",
    calories: 450,
    ingredients: ["pescado", "verde", "maní", "cebolla", "tomate", "pimiento"],
    steps: [
      "1. Ralla verde crudo y mézclalo con agua y pasta de maní hasta diluir.",
      "2. Haz un refrito potente con cebolla, pimiento y tomate.",
      "3. Mezcla el verde diluido con el refrito y cocina moviendo siempre hasta que espese (masa precocida).",
      "4. Pon una capa de masa en un molde de barro, luego pescado crudo aliñado, y cubre con más masa.",
      "5. Hornea 20 min hasta que burbujee y dore."
    ]
  },
  {
    id: 27,
    title: "Tallarín de Pollo Ecuatoriano",
    category: "lunch",
    time: "40 min",
    difficulty: "Fácil",
    calories: 500,
    ingredients: ["pollo", "pasta", "tomate", "cebolla", "pimiento", "zanahoria", "achiote"],
    steps: [
      "1. Haz un refrito licuado con tomate, cebolla, pimiento y aliños.",
      "2. Dora las presas de pollo y agrega el refrito licuado.",
      "3. Añade zanahoria y arvejas. Cocina hasta que el pollo esté listo y la salsa espesa.",
      "4. Mezcla con tallarines cocidos y espolvorea cilantro."
    ]
  },

  // ==================================================
  // 🌎 INTERNACIONAL - ALMUERZO & CENA
  // ==================================================
  {
    id: 28,
    title: "Pasta Carbonara Real",
    category: "dinner",
    time: "20 min",
    difficulty: "Medio",
    calories: 550,
    ingredients: ["pasta", "huevo", "queso", "tocino", "pimienta"],
    steps: [
      "1. Cocina la pasta en agua con sal.",
      "2. Fríe el tocino en tiras hasta que esté crocante. Apaga el fuego.",
      "3. En un bowl, bate yemas de huevo con mucho queso rallado y pimienta.",
      "4. Pon la pasta caliente en la sartén del tocino (fuera del fuego).",
      "5. Vierte la mezcla de huevo y un poco de agua de cocción. Revuelve rápido para crear una crema sedosa."
    ]
  },
  {
    id: 29,
    title: "Lomo Saltado Peruano",
    category: "lunch",
    time: "30 min",
    difficulty: "Medio",
    calories: 600,
    ingredients: ["carne", "cebolla", "tomate", "papa", "salsa de soja", "vinagre"],
    steps: [
      "1. Corta la carne (lomo) en tiras y fríe papas en bastones.",
      "2. Saltea la carne a fuego muy alto en wok. Retira.",
      "3. Saltea cebolla roja y tomate en gajos gruesos (pocos segundos).",
      "4. Regresa la carne, añade salsa de soja, vinagre y cilantro.",
      "5. Mezcla con las papas fritas y sirve con arroz."
    ]
  },
  {
    id: 30,
    title: "Hamburguesa Casera Clásica",
    category: "dinner",
    time: "25 min",
    difficulty: "Fácil",
    calories: 700,
    ingredients: ["carne", "pan", "queso", "lechuga", "tomate", "cebolla"],
    steps: [
      "1. Forma discos de carne molida sin amasar mucho. Solo sal y pimienta por fuera.",
      "2. Cocina en plancha muy caliente 4 min por lado.",
      "3. Pon el queso encima y tapa para derretir.",
      "4. Tuesta el pan con mantequilla.",
      "5. Arma: Pan, salsa, lechuga, tomate, carne con queso, cebolla."
    ]
  },
  {
    id: 31,
    title: "Pollo al Curry Rápido",
    category: "lunch",
    time: "30 min",
    difficulty: "Fácil",
    calories: 450,
    ingredients: ["pollo", "curry", "cebolla", "ajo", "leche", "arroz"],
    steps: [
      "1. Corta el pollo en cubos y séllalos en la sartén.",
      "2. Agrega cebolla y ajo picados. Sofríe.",
      "3. Añade 2 cucharadas de polvo de curry y mezcla.",
      "4. Vierte leche de coco (o normal) y cocina a fuego bajo 10 min.",
      "5. Sirve sobre arroz blanco."
    ]
  },
  {
    id: 32,
    title: "Tacos de Carne Molida",
    category: "dinner",
    time: "20 min",
    difficulty: "Muy Fácil",
    calories: 400,
    ingredients: ["tortilla", "carne", "comino", "tomate", "lechuga", "queso"],
    steps: [
      "1. Sofríe la carne molida hasta que dore.",
      "2. Condimenta con comino, paprika, ajo en polvo y sal.",
      "3. Calienta las tortillas de maíz o trigo.",
      "4. Sirve la carne en las tortillas y agrega pico de gallo, lechuga y queso."
    ]
  },
  {
    id: 33,
    title: "Risotto de Champiñones",
    category: "dinner",
    time: "40 min",
    difficulty: "Difícil",
    calories: 500,
    ingredients: ["arroz", "champiñones", "caldo", "vino", "mantequilla", "queso"],
    steps: [
      "1. Sofríe cebolla y champiñones. Agrega arroz arborio y nacara.",
      "2. Añade vino blanco y deja evaporar.",
      "3. Agrega caldo caliente cucharón a cucharón, moviendo constantemente hasta que el arroz lo absorba.",
      "4. Repite por 18 min hasta que el arroz esté suave.",
      "5. Apaga, añade mantequilla fría y queso parmesano. Bate enérgicamente."
    ]
  },
  {
    id: 34,
    title: "Ensalada César con Pollo",
    category: "dinner",
    time: "15 min",
    difficulty: "Fácil",
    calories: 350,
    ingredients: ["lechuga", "pollo", "pan", "queso", "limón", "ajo", "anchoa"],
    steps: [
      "1. Prepara el aderezo: Mayonesa, ajo, anchoa (opcional), limón y queso parmesano.",
      "2. Cocina una pechuga de pollo a la plancha y córtala.",
      "3. Haz crostones de pan tostado con ajo.",
      "4. Mezcla la lechuga romana con el aderezo, pon el pollo y los crostones."
    ]
  },
  {
    id: 35,
    title: "Pizza Margarita Casera",
    category: "dinner",
    time: "40 min",
    difficulty: "Medio",
    calories: 600,
    ingredients: ["harina", "tomate", "queso", "albahaca", "levadura"],
    steps: [
      "1. Haz una masa con harina, agua, levadura y sal. Deja leudar 30 min.",
      "2. Estira la masa fina.",
      "3. Pon salsa de tomate y queso mozzarella.",
      "4. Hornea a máxima temperatura (250°C) por 10 min.",
      "5. Al salir, pon hojas de albahaca fresca y aceite de oliva."
    ]
  },
  {
    id: 36,
    title: "Pollo Agridulce Chino",
    category: "lunch",
    time: "35 min",
    difficulty: "Medio",
    calories: 550,
    ingredients: ["pollo", "pimiento", "piña", "cebolla", "salsa de tomate", "vinagre", "azúcar"],
    steps: [
      "1. Corta el pollo, pásalo por maicena y fríelo hasta dorar. Reserva.",
      "2. En un wok, saltea pimiento, cebolla y piña en cubos.",
      "3. Haz la salsa mezclando: Ketchup, vinagre, azúcar y un poco de soja.",
      "4. Añade la salsa a los vegetales y deja espesar.",
      "5. Incorpora el pollo frito y mezcla bien."
    ]
  },
  {
    id: 37,
    title: "Arepas Rellenas (Reina Pepiada)",
    category: "dinner",
    time: "30 min",
    difficulty: "Medio",
    calories: 450,
    ingredients: ["harina de maíz", "pollo", "aguacate", "mayonesa", "cebolla"],
    steps: [
      "1. Mezcla harina de maíz precocida (Harina PAN) con agua y sal. Forma discos y asalos.",
      "2. Cocina y desmenuza pechuga de pollo.",
      "3. Mezcla el pollo con puré de aguacate, mayonesa, cilantro y cebolla picada.",
      "4. Abre las arepas calientes y rellena generosamente."
    ]
  },
  {
    id: 38,
    title: "Pasta a la Boloñesa",
    category: "lunch",
    time: "40 min",
    difficulty: "Fácil",
    calories: 500,
    ingredients: ["pasta", "carne", "tomate", "cebolla", "ajo", "zanahoria"],
    steps: [
      "1. Sofríe cebolla, ajo y zanahoria picada fina.",
      "2. Agrega la carne molida y cocina hasta que dore bien.",
      "3. Añade puré de tomate o tomates pelados y un poco de agua.",
      "4. Cocina a fuego bajo 30 min hasta espesar. Sazona con orégano.",
      "5. Sirve sobre pasta cocida al dente."
    ]
  },
  {
    id: 39,
    title: "Tortilla Española",
    category: "dinner",
    time: "30 min",
    difficulty: "Medio",
    calories: 320,
    ingredients: ["huevo", "papa", "cebolla", "aceite", "sal"],
    steps: [
      "1. Pela y corta papas y cebolla en láminas finas.",
      "2. Confita (fríe suave) en abundante aceite hasta que estén tiernas. Escurre el aceite.",
      "3. Mezcla las papas calientes con los huevos batidos y sal. Deja reposar 5 min.",
      "4. Cuaja en sartén a fuego medio, dando la vuelta con ayuda de un plato."
    ]
  },
  {
    id: 40,
    title: "Quesadillas de Pollo",
    category: "dinner",
    time: "15 min",
    difficulty: "Muy Fácil",
    calories: 350,
    ingredients: ["tortilla", "queso", "pollo", "pimiento"],
    steps: [
      "1. Coloca una tortilla en la sartén.",
      "2. Pon queso rallado y pollo cocido desmenuzado en una mitad.",
      "3. Dobla la tortilla por la mitad.",
      "4. Cocina por ambos lados hasta que esté dorada y el queso derretido."
    ]
  },
  {
    id: 41,
    title: "Arroz con Leche Cremoso",
    category: "breakfast",
    time: "35 min",
    difficulty: "Fácil",
    calories: 280,
    ingredients: ["arroz", "leche", "canela", "azúcar", "pasas", "leche condensada"],
    steps: [
      "1. Cocina el arroz con agua y ramas de canela hasta que el agua evapore y el grano abra.",
      "2. Agrega la leche caliente y baja el fuego.",
      "3. Cocina moviendo siempre hasta que espese.",
      "4. Endulza con azúcar o leche condensada al final. Añade pasas."
    ]
  },
  {
    id: 42,
    title: "Crema de Zapallo",
    category: "dinner",
    time: "25 min",
    difficulty: "Fácil",
    calories: 200,
    ingredients: ["zapallo", "papa", "cebolla", "leche", "queso"],
    steps: [
      "1. Sofríe cebolla y ajo.",
      "2. Agrega zapallo y papa en cubos. Cubre con agua o caldo.",
      "3. Cocina hasta que todo esté suave.",
      "4. Licúa con un chorrito de leche o crema.",
      "5. Sirve con queso rallado o crutones."
    ]
  },
  {
    id: 43,
    title: "Pollo al Horno con Papas",
    category: "lunch",
    time: "1 h",
    difficulty: "Fácil",
    calories: 500,
    ingredients: ["pollo", "papa", "limón", "orégano", "ajo", "aceite"],
    steps: [
      "1. Precalienta el horno a 200°C.",
      "2. En una bandeja, pon presas de pollo y papas en gajos.",
      "3. Baña todo con una mezcla de jugo de limón, aceite, ajo picado, orégano, sal y pimienta.",
      "4. Hornea 45-60 min hasta que el pollo esté dorado y las papas tiernas."
    ]
  },
  {
    id: 44,
    title: "Aguado de Pollo",
    category: "lunch",
    time: "50 min",
    difficulty: "Medio",
    calories: 400,
    ingredients: ["pollo", "arroz", "cebolla", "pimiento", "cilantro", "arveja"],
    steps: [
      "1. Haz un refrito y sella las presas de pollo (o menudencias).",
      "2. Agrega agua y arroz crudo (bastante para que espese).",
      "3. Añade arvejas y zanahoria picada.",
      "4. Cocina hasta que el arroz se abra totalmente.",
      "5. Termina con mucho cilantro picado."
    ]
  },
  {
    id: 45,
    title: "Burritos de Frijol y Queso",
    category: "dinner",
    time: "15 min",
    difficulty: "Fácil",
    calories: 450,
    ingredients: ["tortilla", "frijoles", "queso", "arroz", "pico de gallo"],
    steps: [
      "1. Calienta una tortilla de harina grande.",
      "2. Pon una base de arroz cocido y frijoles negros.",
      "3. Agrega queso rallado y salsa pico de gallo.",
      "4. Cierra los extremos y enrolla apretando bien.",
      "5. Dora el burrito cerrado en la plancha."
    ]
  },
  {
    id: 46,
    title: "Bistec de Carne Encebollado",
    category: "lunch",
    time: "20 min",
    difficulty: "Fácil",
    calories: 400,
    ingredients: ["carne", "cebolla", "tomate", "pimiento", "salsa de soja"],
    steps: [
      "1. Aliña filetes de carne delgados con ajo y comino.",
      "2. Séllalos en sartén caliente.",
      "3. Agrega encima rodajas de cebolla, pimiento y tomate.",
      "4. Tapa y baja el fuego para que los jugos de los vegetales cocinen la carne.",
      "5. Sirve con arroz y papas fritas."
    ]
  },
  {
    id: 47,
    title: "Ceviche de Chocho (Cevichochos)",
    category: "lunch",
    time: "15 min",
    difficulty: "Muy Fácil",
    calories: 250,
    ingredients: ["chocho", "tomate", "cebolla", "limón", "cilantro", "canguil"],
    steps: [
      "1. Lava bien los chochos.",
      "2. Licúa 2 tomates con un poco de agua, sal y limón para hacer el jugo base. Cierne.",
      "3. Mezcla los chochos con el jugo de tomate.",
      "4. Agrega cebolla curtida, tomate picado y cilantro.",
      "5. Sirve con chifles, tostado y canguil."
    ]
  },
  {
    id: 48,
    title: "Menestra de Lenteja Rápida",
    category: "lunch",
    time: "30 min",
    difficulty: "Fácil",
    calories: 300,
    ingredients: ["lenteja", "cebolla", "pimiento", "tomate", "cilantro", "queso"],
    steps: [
      "1. Usa lenteja remojada o de lata (lavada).",
      "2. Haz un refrito de cebolla, pimiento, tomate y ajo. Añade la lenteja.",
      "3. Cubre con agua y cocina hasta que suavice y espese.",
      "4. Aplasta un poco de lenteja para dar cuerpo.",
      "5. Sirve con queso fresco rallado encima."
    ]
  },
  {
    id: 49,
    title: "Estofado de Carne con Papas",
    category: "lunch",
    time: "45 min",
    difficulty: "Medio",
    calories: 500,
    ingredients: ["carne", "papa", "zanahoria", "tomate", "cebolla", "arveja"],
    steps: [
      "1. Corta la carne en cubos y dora en la olla.",
      "2. Retira y haz un refrito en la misma olla.",
      "3. Regresa la carne, añade papas y zanahoria en trozos.",
      "4. Agrega agua o caldo y cocina tapado hasta que la papa esté suave.",
      "5. Añade arvejas al final."
    ]
  },
  {
    id: 50,
    title: "Arroz Marinero",
    category: "lunch",
    time: "40 min",
    difficulty: "Medio",
    calories: 600,
    ingredients: ["arroz", "camarón", "calamar", "concha", "cebolla", "pimiento", "ajo"],
    steps: [
      "1. Haz un arroz con achiote y caldo de mariscos.",
      "2. Aparte, saltea los mariscos (camarón, calamar, concha) con ajo y mantequilla.",
      "3. Haz un refrito de cebolla, pimiento y tomate.",
      "4. Mezcla el arroz cocido con el refrito y los mariscos.",
      "5. Termina con cilantro y plátano maduro frito."
    ]
  }
];
const QUICK_ADDS = ["Huevo", "Pollo", "Arroz", "Papa", "Verde", "Camarón", "Atún", "Queso", "Leche", "Cebolla", "Tomate", "Yuca", "Maní", "Carne", "Pasta"];

const styles = {
  container: { fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f0f4f8', minHeight: '100vh', paddingBottom: '80px' },
  header: { backgroundColor: '#fff', borderBottom: '4px solid #1e3a8a', padding: '15px', position: 'sticky', top: 0, zIndex: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  logo: { fontSize: '22px', fontWeight: '900', color: '#1e3a8a', display: 'flex', alignItems: 'center', gap: '12px', fontStyle: 'italic' },
  logoIcon: { fontSize: '28px' },
  card: { backgroundColor: 'white', padding: '24px', borderRadius: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', marginBottom: '20px', border: '1px solid #e5e7eb' },
  inputGroup: { display: 'flex', gap: '8px', marginBottom: '16px' },
  input: { flex: 1, padding: '14px', borderRadius: '14px', border: '2px solid #e5e7eb', fontSize: '16px', outline: 'none', backgroundColor: '#f9fafb' },
  btnPrimary: { backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '0 20px', borderRadius: '14px', fontSize: '24px', fontWeight: 'bold', cursor: 'pointer' },
  btnSearch: { width: '100%', background: 'linear-gradient(135deg, #dc2626, #b91c1c)', color: 'white', border: 'none', padding: '18px', borderRadius: '16px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '10px', textTransform: 'uppercase' },
  tag: { backgroundColor: '#1d4ed8', color: 'white', padding: '8px 14px', borderRadius: '100px', fontSize: '14px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '8px', margin: '4px' },
  suggestion: { backgroundColor: 'white', border: '1px solid #d1d5db', color: '#374151', padding: '6px 14px', borderRadius: '100px', fontSize: '13px', cursor: 'pointer', fontWeight: '500', margin: '4px' },
  recipeCard: { backgroundColor: 'white', padding: '16px', borderRadius: '16px', border: '1px solid #f3f4f6', marginBottom: '12px', cursor: 'pointer', position: 'relative', overflow: 'hidden' },
  badge: { position: 'absolute', top: 0, right: 0, padding: '4px 10px', fontSize: '10px', fontWeight: '800', borderBottomLeftRadius: '12px', color: 'white', textTransform: 'uppercase' },
  backBtn: { background: 'white', border: '1px solid #e5e7eb', padding: '8px 16px', borderRadius: '12px', color: '#374151', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: '6px' },
  stepNum: { minWidth: '28px', height: '28px', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px', marginTop: '2px' }
};

// --- SUB-COMPONENTES (Fuera del principal para evitar errores de renderizado) ---

const PantryView = ({ pantry, addIngredient, removeIngredient, inputValue, setInputValue, setActiveTab }) => (
  <div style={{ padding: '20px' }}>
    <div style={styles.card}>
      <h2 style={{ color: '#111827', marginTop: 0 }}>¿Qué cocinamos hoy?</h2>
      <div style={styles.inputGroup}>
        <input 
          style={styles.input} 
          value={inputValue} 
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addIngredient(inputValue)}
          placeholder="Ej: verde, queso..." 
        />
        <button style={styles.btnPrimary} onClick={() => addIngredient(inputValue)}>+</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {QUICK_ADDS.map(item => (
          <button key={item} style={styles.suggestion} onClick={() => addIngredient(item)}>+ {item}</button>
        ))}
      </div>
    </div>
    <div style={{ padding: '0 5px' }}>
      {pantry.length === 0 ? <p style={{ textAlign: 'center', color: '#9ca3af' }}>Tu despensa está vacía</p> : 
        pantry.map(ing => (
          <span key={ing} style={styles.tag}>
            {ing.charAt(0).toUpperCase() + ing.slice(1)}
            <span onClick={() => removeIngredient(ing)} style={{ cursor: 'pointer', marginLeft: '5px' }}>×</span>
          </span>
        ))
      }
    </div>
    {pantry.length > 0 && (
      <button style={styles.btnSearch} onClick={() => setActiveTab("recipes")}>
        Ver Recetas
      </button>
    )}
  </div>
);

const RecipesView = ({ matchedRecipes, setActiveTab, setSelectedRecipe, filter, setFilter }) => (
  <div style={{ padding: '20px' }}>
    <button style={styles.backBtn} onClick={() => setActiveTab("pantry")}>⬅ Volver</button>
    <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', marginBottom: '20px' }}>
      {[{id:'all',l:'Todas'}, {id:'breakfast',l:'🍳 Desayuno'}, {id:'lunch',l:'🍲 Almuerzo'}, {id:'dinner',l:'🍽 Cena'}].map(cat => (
        <button key={cat.id} onClick={() => setFilter(cat.id)} style={{ padding: '8px 16px', borderRadius: '100px', border: 'none', marginRight: '8px', backgroundColor: filter === cat.id ? '#1e3a8a' : 'white', color: filter === cat.id ? 'white' : '#4b5563' }}>{cat.l}</button>
      ))}
    </div>
    <div>
      {matchedRecipes.length > 0 ? matchedRecipes.map(recipe => (
        <div key={recipe.id} style={styles.recipeCard} onClick={() => { setSelectedRecipe(recipe); setActiveTab("details"); }}>
          <div style={{ ...styles.badge, backgroundColor: recipe.matchPercentage === 100 ? '#10b981' : '#f59e0b' }}>
            {recipe.matchPercentage === 100 ? 'LISTO' : `FALTAN ${recipe.ingredients.length - recipe.haveCount}`}
          </div>
          <h3 style={{ margin: '0 0 5px 0' }}>{recipe.title}</h3>
          <div style={{ fontSize: '13px', color: '#6b7280' }}>⏱ {recipe.time} • 🔥 {recipe.difficulty}</div>
        </div>
      )) : <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>No hay recetas compatibles. Intenta agregar "arroz" o "pollo".</div>}
    </div>
  </div>
);

const DetailsView = ({ selectedRecipe, setActiveTab, pantry }) => {
  if (!selectedRecipe) return null;
  return (
    <div style={{ padding: '20px', backgroundColor: 'white', minHeight: '100vh' }}>
      <button onClick={() => setActiveTab("recipes")} style={styles.backBtn}>⬅ Volver</button>
      <h1 style={{ fontSize: '28px', margin: '10px 0' }}>{selectedRecipe.title}</h1>
      <div style={{ marginBottom: '20px', color: '#4b5563' }}>⏰ {selectedRecipe.time} • ⚡ {selectedRecipe.calories} kcal</div>
      
      <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Ingredientes</h3>
      <div style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
        {selectedRecipe.ingredients.map(ing => {
           const hasIt = pantry.some(p => p.includes(ing) || ing.includes(p) || (p === 'verde' && ing.includes('plátano')) || (p === 'pescado' && ing.includes('atún')) || (p === 'carne' && ing.includes('res')));
           return (
             <div key={ing} style={{ display: 'flex', justifyContent: 'space-between' }}>
               <span style={{ textTransform: 'capitalize', fontWeight: hasIt ? 'bold' : 'normal' }}>{ing}</span>
               {hasIt ? <span style={{ color: 'green' }}>✔</span> : <span style={{ color: 'red', fontSize: '12px' }}>FALTA</span>}
             </div>
           );
        })}
      </div>

      <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Preparación</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {selectedRecipe.steps.map((step, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '10px' }}>
            <div style={styles.stepNum}>{idx + 1}</div>
            <p style={{ margin: 0, lineHeight: '1.5' }}>{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---

export default function JamChef() {
  const [pantry, setPantry] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState("pantry");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [filter, setFilter] = useState("all");

  const addIngredient = (ing) => {
    const normalized = ing.toLowerCase().trim();
    if (normalized && !pantry.includes(normalized)) {
      setPantry([...pantry, normalized]);
    }
    setInputValue("");
  };

  const removeIngredient = (ing) => {
    setPantry(pantry.filter(i => i !== ing));
  };

  const matchedRecipes = useMemo(() => {
    if (pantry.length === 0) return [];
    
    const checkMatch = (recipeIng, pantryList) => {
        return pantryList.some(pIng => 
            pIng.includes(recipeIng) || recipeIng.includes(pIng) ||
            (pIng === 'verde' && (recipeIng.includes('plátano') || recipeIng.includes('patacón'))) ||
            (pIng === 'pescado' && (recipeIng.includes('atún') || recipeIng.includes('albacora'))) ||
            (pIng === 'carne' && (recipeIng.includes('res') || recipeIng.includes('molida'))) ||
            (pIng === 'cerdo' && (recipeIng.includes('chancho') || recipeIng.includes('chicharrón')))
        );
    };

    const scored = RECIPE_DATABASE.map(recipe => {
      const have = recipe.ingredients.filter(rIng => checkMatch(rIng, pantry));
      return {
        ...recipe,
        haveCount: have.length,
        matchPercentage: Math.round((have.length / recipe.ingredients.length) * 100),
        haveIngredients: have,
      };
    });

    let filtered = scored.filter(r => r.haveCount > 0);
    if (filter !== "all") filtered = filtered.filter(r => r.category === filter);
    return filtered.sort((a, b) => b.matchPercentage - a.matchPercentage);
  }, [pantry, filter]);

  return (
    <div style={styles.container}>
      {activeTab !== 'details' && (
        <div style={styles.header}>
            <div style={styles.logo}><span style={styles.logoIcon}>👨‍🍳</span> JAM CHEF</div>
            <span style={{ backgroundColor: '#eff6ff', color: '#1e3a8a', padding: '6px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: '700' }}>PRO</span>
        </div>
      )}
      
      {activeTab === 'pantry' && (
        <PantryView 
          pantry={pantry} 
          addIngredient={addIngredient} 
          removeIngredient={removeIngredient} 
          inputValue={inputValue} 
          setInputValue={setInputValue} 
          setActiveTab={setActiveTab} 
        />
      )}

      {activeTab === 'recipes' && (
        <RecipesView 
          matchedRecipes={matchedRecipes} 
          setActiveTab={setActiveTab} 
          setSelectedRecipe={setSelectedRecipe} 
          filter={filter} 
          setFilter={setFilter} 
        />
      )}

      {activeTab === 'details' && (
        <DetailsView 
          selectedRecipe={selectedRecipe} 
          setActiveTab={setActiveTab} 
          pantry={pantry} 
        />
      )}
    </div>
  );
}