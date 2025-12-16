import React, { useState, useMemo } from 'react';

// --- DATOS Y ESTILOS (FUERA DEL COMPONENTE PARA EVITAR ERRORES) ---

const RECIPE_DATABASE = [
  // ==================================================
  // 🇪🇨 DESAYUNOS Y ENTRADAS (1-20)
  // ==================================================
  {
    id: 1,
    title: "Bolón de Verde Mixto",
    category: "breakfast",
    time: "40 min",
    difficulty: "Medio",
    calories: 550,
    ingredients: ["verde", "queso", "cerdo", "mantequilla", "aceite", "sal"],
    steps: ["Fríe los verdes en trozos hasta que doren.", "Maja caliente con mantequilla y sal.", "Mezcla con queso y chicharrón.", "Forma bolas grandes y compactas.", "Sirve con café pasado."]
  },
  {
    id: 2,
    title: "Tigrillo Zarumeño",
    category: "breakfast",
    time: "30 min",
    difficulty: "Fácil",
    calories: 480,
    ingredients: ["verde", "huevo", "queso", "cebolla", "leche", "mantequilla", "cilantro"],
    steps: ["Cocina los verdes en agua y májalos rústicos.", "Haz un refrito de cebolla en mantequilla.", "Mezcla el verde, luego huevos batidos, queso y un chorrito de leche.", "Revuelve hasta que esté cremoso."]
  },
  {
    id: 3,
    title: "Majado de Verde con Huevo",
    category: "breakfast",
    time: "20 min",
    difficulty: "Muy Fácil",
    calories: 380,
    ingredients: ["verde", "huevo", "cebolla", "achiote", "sal"],
    steps: ["Cocina el verde y aplástalo con tenedor.", "Haz un refrito de cebolla y achiote.", "Mezcla el verde con el refrito.", "Sirve con dos huevos fritos encima."]
  },
  {
    id: 4,
    title: "Humitas Caseras",
    category: "breakfast",
    time: "1h 30m",
    difficulty: "Difícil",
    calories: 300,
    ingredients: ["choclo", "queso", "huevo", "cebolla", "mantequilla", "maicena"],
    steps: ["Muele el choclo tierno.", "Mezcla con huevo, mantequilla, refrito de cebolla y sal.", "Rellena las hojas con masa y queso.", "Cocina al vapor 45 min."]
  },
  {
    id: 5,
    title: "Muchines de Yuca",
    category: "breakfast",
    time: "40 min",
    difficulty: "Medio",
    calories: 350,
    ingredients: ["yuca", "queso", "huevo", "cebolla"],
    steps: ["Ralla la yuca y exprime el agua.", "Mezcla con huevo y cebolla.", "Forma óvalos rellenos de queso.", "Fríe en aceite caliente hasta dorar."]
  },
  {
    id: 6,
    title: "Tortillas de Verde",
    category: "breakfast",
    time: "30 min",
    difficulty: "Medio",
    calories: 280,
    ingredients: ["verde", "queso", "mantequilla", "sal"],
    steps: ["Cocina y maja el verde.", "Amasa con sal y mantequilla.", "Forma discos finos rellenos de queso.", "Asa en plancha caliente."]
  },
  {
    id: 7,
    title: "Patacones con Queso",
    category: "breakfast",
    time: "15 min",
    difficulty: "Fácil",
    calories: 300,
    ingredients: ["verde", "queso", "aceite", "sal"],
    steps: ["Fríe rodajas gruesas de verde.", "Aplasta y vuelve a freír hasta que estén crocantes.", "Cubre con queso fresco."]
  },
  {
    id: 8,
    title: "Mote Pillo",
    category: "breakfast",
    time: "20 min",
    difficulty: "Fácil",
    calories: 400,
    ingredients: ["mote", "huevo", "cebolla", "leche", "achiote"],
    steps: ["Refrito de cebolla y achiote.", "Agrega el mote y calienta.", "Añade huevos batidos y leche.", "Revuelve hasta cocinar suave."]
  },
  {
    id: 9,
    title: "Empanadas de Viento",
    category: "breakfast",
    time: "45 min",
    difficulty: "Medio",
    calories: 350,
    ingredients: ["harina", "queso", "mantequilla", "azúcar"],
    steps: ["Haz masa de harina y reposa.", "Estira discos, rellena con queso y cierra.", "Fríe bañando con aceite para que se inflen.", "Espolvorea azúcar."]
  },
  {
    id: 10,
    title: "Empanadas de Verde",
    category: "breakfast",
    time: "40 min",
    difficulty: "Medio",
    calories: 320,
    ingredients: ["verde", "queso", "aceite", "sal"],
    steps: ["Cocina el verde y maja muy fino.", "Extiende en plástico, rellena con queso.", "Cierra y fríe hasta que estén crocantes."]
  },
  {
    id: 11,
    title: "Pancakes de Avena",
    category: "breakfast",
    time: "15 min",
    difficulty: "Fácil",
    calories: 250,
    ingredients: ["avena", "banana", "huevo", "leche", "canela"],
    steps: ["Licúa todo hasta tener mezcla espesa.", "Cocina porciones en sartén antiadherente.", "Sirve con miel."]
  },
  {
    id: 12,
    title: "French Toast",
    category: "breakfast",
    time: "15 min",
    difficulty: "Fácil",
    calories: 300,
    ingredients: ["pan", "huevo", "leche", "canela", "mantequilla"],
    steps: ["Bate huevo, leche y canela.", "Moja el pan en la mezcla.", "Dora en sartén con mantequilla."]
  },
  {
    id: 13,
    title: "Omelette Mixto",
    category: "breakfast",
    time: "10 min",
    difficulty: "Fácil",
    calories: 280,
    ingredients: ["huevo", "jamón", "queso", "tomate"],
    steps: ["Bate huevos.", "Vierte en sartén caliente.", "Pon relleno en el centro y dobla."]
  },
  {
    id: 14,
    title: "Huevos Pericos",
    category: "breakfast",
    time: "10 min",
    difficulty: "Fácil",
    calories: 220,
    ingredients: ["huevo", "tomate", "cebolla", "sal"],
    steps: ["Sofríe tomate y cebolla picados.", "Agrega los huevos y revuelve hasta cuajar."]
  },
  {
    id: 15,
    title: "Sandwich de Atún",
    category: "breakfast",
    time: "10 min",
    difficulty: "Muy Fácil",
    calories: 300,
    ingredients: ["pan", "atún", "mayonesa", "cebolla", "limón"],
    steps: ["Mezcla atún, mayonesa, cebolla picada y limón.", "Rellena el pan y tuesta si deseas."]
  },
  {
    id: 16,
    title: "Batido de Mora y Leche",
    category: "breakfast",
    time: "5 min",
    difficulty: "Muy Fácil",
    calories: 180,
    ingredients: ["mora", "leche", "azúcar", "hielo"],
    steps: ["Licúa mora, leche y azúcar.", "Cierne las semillas.", "Sirve con hielo."]
  },
  {
    id: 17,
    title: "Tostadas de Aguacate",
    category: "breakfast",
    time: "10 min",
    difficulty: "Muy Fácil",
    calories: 250,
    ingredients: ["pan", "aguacate", "huevo", "limón"],
    steps: ["Tuesta el pan.", "Unta aguacate majado con limón.", "Pon un huevo frito o duro encima."]
  },
  {
    id: 18,
    title: "Tortilla de Maíz (Tiesto)",
    category: "breakfast",
    time: "30 min",
    difficulty: "Medio",
    calories: 200,
    ingredients: ["harina de maíz", "queso", "mantequilla", "huevo"],
    steps: ["Mezcla harina de maíz tostado, huevo y mantequilla.", "Forma tortillas rellenas de queso.", "Asa en tiesto o sartén seco."]
  },
  {
    id: 19,
    title: "Ceviche de Chocho",
    category: "breakfast",
    time: "15 min",
    difficulty: "Fácil",
    calories: 220,
    ingredients: ["chocho", "tomate", "cebolla", "limón", "canguil"],
    steps: ["Licúa tomate para el jugo.", "Mezcla chochos, cebolla, tomate picado y jugo.", "Sirve con tostado y canguil."]
  },
  {
    id: 20,
    title: "Salchichas con Huevos",
    category: "breakfast",
    time: "10 min",
    difficulty: "Muy Fácil",
    calories: 350,
    ingredients: ["salchicha", "huevo", "aceite"],
    steps: ["Corta las salchichas en rodajas y fríe.", "Agrega los huevos y revuelve todo junto."]
  },

  // ==================================================
  // 🇪🇨 PLATOS FUERTES ECUATORIANOS (21-60)
  // ==================================================
  {
    id: 21,
    title: "Encebollado de Albacora",
    category: "lunch",
    time: "1h 30m",
    difficulty: "Medio",
    calories: 450,
    ingredients: ["albacora", "yuca", "cebolla", "tomate", "cilantro"],
    steps: ["Hierve caldo con verduras y pescado.", "Cocina yuca.", "Licúa verduras para espesar.", "Sirve: Yuca, Pescado, Caldo, Cebolla."]
  },
  {
    id: 22,
    title: "Seco de Pollo",
    category: "lunch",
    time: "1h",
    difficulty: "Medio",
    calories: 550,
    ingredients: ["pollo", "naranjilla", "cebolla", "tomate", "cilantro", "cerveza"],
    steps: ["Dora el pollo.", "Licúa tomate, naranjilla y refrito.", "Cocina pollo en la salsa hasta espesar."]
  },
  {
    id: 23,
    title: "Guatita",
    category: "lunch",
    time: "2h",
    difficulty: "Difícil",
    calories: 600,
    ingredients: ["mondongo", "papa", "maní", "leche"],
    steps: ["Cocina mondongo.", "Guiso de papas con mondongo picado.", "Añade licuado de maní y leche.", "Hierve hasta espesar."]
  },
  {
    id: 24,
    title: "Locro de Papa",
    category: "lunch",
    time: "45 min",
    difficulty: "Fácil",
    calories: 380,
    ingredients: ["papa", "leche", "queso", "achiote", "aguacate"],
    steps: ["Refrito de achiote.", "Cocina papas hasta deshacer.", "Agrega leche y queso.", "Sirve con aguacate."]
  },
  {
    id: 25,
    title: "Ceviche de Camarón",
    category: "lunch",
    time: "30 min",
    difficulty: "Fácil",
    calories: 320,
    ingredients: ["camarón", "limón", "naranja", "tomate", "cebolla", "mostaza"],
    steps: ["Cocina camarón 2 min.", "Mezcla jugos cítricos y salsas.", "Junta todo con cebolla y tomate."]
  },
  {
    id: 26,
    title: "Encocado de Pescado",
    category: "lunch",
    time: "40 min",
    difficulty: "Medio",
    calories: 500,
    ingredients: ["pescado", "coco", "pimiento", "cebolla"],
    steps: ["Haz refrito.", "Agrega leche de coco ligera y pescado.", "Termina con leche de coco espesa."]
  },
  {
    id: 27,
    title: "Arroz Marinero",
    category: "lunch",
    time: "45 min",
    difficulty: "Medio",
    calories: 600,
    ingredients: ["arroz", "camarón", "concha", "calamar", "pimiento"],
    steps: ["Saltea mariscos.", "Haz arroz con caldo de mariscos.", "Mezcla todo con verduras."]
  },
  {
    id: 28,
    title: "Chaulafán de Pollo",
    category: "lunch",
    time: "30 min",
    difficulty: "Medio",
    calories: 580,
    ingredients: ["arroz", "pollo", "huevo", "soja", "cebolla", "pimiento"],
    steps: ["Usa arroz frío.", "Saltea pollo y verduras.", "Mezcla con arroz y salsa de soja.", "Añade huevo revuelto."]
  },
  {
    id: 29,
    title: "Menestra de Lenteja",
    category: "lunch",
    time: "40 min",
    difficulty: "Fácil",
    calories: 300,
    ingredients: ["lenteja", "cebolla", "tomate", "pimiento", "queso"],
    steps: ["Cocina lenteja.", "Añade refrito potente.", "Espesa y sirve con queso o carne."]
  },
  {
    id: 30,
    title: "Llapingachos",
    category: "lunch",
    time: "50 min",
    difficulty: "Medio",
    calories: 650,
    ingredients: ["papa", "queso", "achiote", "maní", "chorizo", "huevo"],
    steps: ["Haz puré de papa y forma tortillas con queso.", "Dora en plancha.", "Sirve con chorizo, huevo y salsa de maní."]
  },
  {
    id: 31,
    title: "Sopa de Bolas de Verde",
    category: "lunch",
    time: "1h 15m",
    difficulty: "Difícil",
    calories: 550,
    ingredients: ["verde", "carne", "hueso", "maní", "choclo"],
    steps: ["Caldo de carne y verduras.", "Rellena masa de verde con carne y maní.", "Cocina las bolas en el caldo."]
  },
  {
    id: 32,
    title: "Cazuela de Pescado",
    category: "lunch",
    time: "50 min",
    difficulty: "Difícil",
    calories: 450,
    ingredients: ["verde", "pescado", "maní", "cebolla"],
    steps: ["Licúa verde con agua.", "Cocina con refrito y maní hasta espesar (masa).", "Hornea masa y pescado en cazuela de barro."]
  },
  {
    id: 33,
    title: "Tallarín de Pollo",
    category: "lunch",
    time: "40 min",
    difficulty: "Fácil",
    calories: 500,
    ingredients: ["pollo", "pasta", "tomate", "cebolla", "zanahoria"],
    steps: ["Estofado de pollo con mucho jugo y verduras.", "Mezcla con tallarines cocidos."]
  },
  {
    id: 34,
    title: "Carne Jugosa (Estofado)",
    category: "lunch",
    time: "45 min",
    difficulty: "Fácil",
    calories: 500,
    ingredients: ["carne", "papa", "zanahoria", "tomate"],
    steps: ["Dora carne en cubos.", "Añade refrito, papas y zanahoria.", "Cocina tapado hasta suavizar."]
  },
  {
    id: 35,
    title: "Bistec de Carne",
    category: "lunch",
    time: "20 min",
    difficulty: "Fácil",
    calories: 400,
    ingredients: ["carne", "cebolla", "tomate", "pimiento"],
    steps: ["Sella filetes de carne.", "Cubre con rodajas de cebolla, tomate y pimiento.", "Cocina en sus jugos."]
  },
  {
    id: 36,
    title: "Hígado Encebollado",
    category: "lunch",
    time: "20 min",
    difficulty: "Medio",
    calories: 350,
    ingredients: ["hígado", "cebolla", "leche", "ajo"],
    steps: ["Lava hígado con leche.", "Fríe los filetes.", "Saltea mucha cebolla en juliana encima."]
  },
  {
    id: 37,
    title: "Sopa de Queso",
    category: "lunch",
    time: "30 min",
    difficulty: "Fácil",
    calories: 300,
    ingredients: ["fideo", "papa", "leche", "queso", "cebolla"],
    steps: ["Refrito de cebolla.", "Hierve agua con papas.", "Añade fideo lazo y leche.", "Termina con queso y cilantro."]
  },
  {
    id: 38,
    title: "Crema de Zapallo",
    category: "lunch",
    time: "25 min",
    difficulty: "Fácil",
    calories: 200,
    ingredients: ["zapallo", "papa", "leche", "crema"],
    steps: ["Cocina zapallo y papa.", "Licúa con leche.", "Sirve con canguil o queso."]
  },
  {
    id: 39,
    title: "Arroz con Pollo",
    category: "lunch",
    time: "45 min",
    difficulty: "Medio",
    calories: 500,
    ingredients: ["pollo", "arroz", "zanahoria", "alverja", "pimiento"],
    steps: ["Cocina pollo y verduras.", "Usa el caldo para cocinar el arroz con achiote.", "Mezcla todo el pollo desmenuzado."]
  },
  {
    id: 40,
    title: "Fritada Casera",
    category: "lunch",
    time: "1h 30m",
    difficulty: "Medio",
    calories: 700,
    ingredients: ["cerdo", "ajo", "agua", "cebolla"],
    steps: ["Hierve trozos de cerdo con agua y aliños.", "Deja que se seque el agua.", "Fríe la carne en su propia grasa."]
  },
  {
    id: 41,
    title: "Churrasco Ecuatoriano",
    category: "lunch",
    time: "30 min",
    difficulty: "Medio",
    calories: 800,
    ingredients: ["carne", "huevo", "arroz", "papas", "tomate"],
    steps: ["Carne asada fina.", "Sirve con: Arroz, papas fritas, huevo frito, ensalada y aguacate."]
  },
  {
    id: 42,
    title: "Apanado de Carne",
    category: "lunch",
    time: "30 min",
    difficulty: "Fácil",
    calories: 600,
    ingredients: ["carne", "pan", "huevo", "harina"],
    steps: ["Golpea la carne para afinar.", "Pasa por harina, huevo y miga de pan.", "Fríe en aceite."]
  },
  {
    id: 43,
    title: "Viche de Pescado",
    category: "lunch",
    time: "1h",
    difficulty: "Difícil",
    calories: 450,
    ingredients: ["pescado", "maní", "camote", "yuca", "verde", "maduro"],
    steps: ["Sopa espesa de maní con muchas verduras (yuca, camote, habas).", "Añade pescado al final."]
  },
  {
    id: 44,
    title: "Torrejas de Choclo",
    category: "lunch",
    time: "20 min",
    difficulty: "Fácil",
    calories: 250,
    ingredients: ["choclo", "huevo", "harina", "queso"],
    steps: ["Desgrana y licúa levemente choclo.", "Mezcla con huevo, harina y queso.", "Fríe por cucharadas."]
  },
  {
    id: 45,
    title: "Arroz Relleno",
    category: "lunch",
    time: "40 min",
    difficulty: "Medio",
    calories: 600,
    ingredients: ["arroz", "carne", "pollo", "cerdo", "verduras", "pasas"],
    steps: ["Cocina arroz.", "Saltea carnes variadas y verduras.", "Mezcla todo, añade pasas y salsa china."]
  },
  {
    id: 46,
    title: "Caldo de Torreja",
    category: "lunch",
    time: "45 min",
    difficulty: "Medio",
    calories: 400,
    ingredients: ["carne", "huevo", "pan", "leche"],
    steps: ["Haz caldo de carne.", "Haz masa de torrejas (pan, leche, huevo) y fríelas.", "Pon las torrejas en el caldo al servir."]
  },
  {
    id: 47,
    title: "Repe Lojano",
    category: "lunch",
    time: "40 min",
    difficulty: "Fácil",
    calories: 350,
    ingredients: ["guineo", "leche", "queso", "cilantro"],
    steps: ["Cocina guineo verde hasta deshacer.", "Añade leche y quesillo.", "Sirve cremoso con cilantro."]
  },
  {
    id: 48,
    title: "Aguado de Gallina",
    category: "lunch",
    time: "1h",
    difficulty: "Medio",
    calories: 450,
    ingredients: ["pollo", "arroz", "cebolla", "cilantro"],
    steps: ["Cocina presas con arroz crudo.", "Deja que el arroz se deshaga y espese.", "Mucho cilantro al final."]
  },
  {
    id: 49,
    title: "Mollejas Guisadas",
    category: "lunch",
    time: "45 min",
    difficulty: "Medio",
    calories: 300,
    ingredients: ["mollejas", "cebolla", "ajo", "tomate"],
    steps: ["Limpia y cocina mollejas.", "Haz estofado con refrito y agua.", "Sirve con arroz."]
  },
  {
    id: 50,
    title: "Sango de Verde con Atún",
    category: "lunch",
    time: "40 min",
    difficulty: "Medio",
    calories: 500,
    ingredients: ["verde", "maní", "atún", "achiote"],
    steps: ["Ralla verde y mezcla con agua.", "Cocina con refrito y maní hasta espesar.", "Añade atún al final."]
  },

  // ==================================================
  // 🌎 INTERNACIONAL - ALMUERZO Y CENA (51-100)
  // ==================================================
  {
    id: 51,
    title: "Pasta Carbonara",
    category: "dinner",
    time: "20 min",
    difficulty: "Medio",
    ingredients: ["pasta", "huevo", "queso", "tocino"],
    steps: ["Fríe tocino.", "Mezcla yemas con queso.", "Une pasta caliente, tocino y mezcla de huevo fuera del fuego."]
  },
  {
    id: 52,
    title: "Lomo Saltado",
    category: "lunch",
    time: "25 min",
    difficulty: "Medio",
    ingredients: ["carne", "cebolla", "tomate", "papa", "soja"],
    steps: ["Fríe papas.", "Saltea carne a fuego alto.", "Añade cebolla, tomate y soja.", "Mezcla con papas."]
  },
  {
    id: 53,
    title: "Pizza Casera Rápida",
    category: "dinner",
    time: "20 min",
    difficulty: "Fácil",
    ingredients: ["tortilla", "tomate", "queso", "jamón", "orégano"],
    steps: ["Usa tortilla de harina como base.", "Pon salsa, queso y jamón.", "Dora en sartén tapada."]
  },
  {
    id: 54,
    title: "Pollo al Curry",
    category: "lunch",
    time: "30 min",
    difficulty: "Fácil",
    ingredients: ["pollo", "curry", "leche", "cebolla"],
    steps: ["Dora pollo.", "Sofríe cebolla y curry.", "Añade leche y reduce.", "Sirve con arroz."]
  },
  {
    id: 55,
    title: "Tacos Mexicanos",
    category: "dinner",
    time: "20 min",
    difficulty: "Fácil",
    ingredients: ["tortilla", "carne", "pico de gallo", "limón"],
    steps: ["Sofríe carne molida.", "Calienta tortillas.", "Rellena con carne y vegetales."]
  },
  {
    id: 56,
    title: "Hamburguesa Clásica",
    category: "dinner",
    time: "25 min",
    difficulty: "Fácil",
    ingredients: ["carne", "pan", "tomate", "lechuga", "queso"],
    steps: ["Forma carne y asa a la plancha.", "Derrite queso encima.", "Arma el sanduche."]
  },
  {
    id: 57,
    title: "Pasta Boloñesa",
    category: "lunch",
    time: "40 min",
    difficulty: "Fácil",
    ingredients: ["pasta", "carne", "tomate", "cebolla"],
    steps: ["Sofríe carne y cebolla.", "Añade salsa de tomate y cocina lento.", "Sirve sobre pasta."]
  },
  {
    id: 58,
    title: "Ensalada César",
    category: "dinner",
    time: "15 min",
    difficulty: "Fácil",
    ingredients: ["lechuga", "pollo", "pan", "queso", "aderezo"],
    steps: ["Asa el pollo.", "Mezcla lechuga con aderezo.", "Añade pollo, pan tostado y queso."]
  },
  {
    id: 59,
    title: "Arroz Chino Casero",
    category: "lunch",
    time: "20 min",
    difficulty: "Fácil",
    ingredients: ["arroz", "huevo", "jamón", "soja", "cebolla"],
    steps: ["Saltea jamón y huevo.", "Añade arroz frío.", "Mezcla con soja y cebollín."]
  },
  {
    id: 60,
    title: "Quesadillas de Pollo",
    category: "dinner",
    time: "15 min",
    difficulty: "Fácil",
    ingredients: ["tortilla", "queso", "pollo"],
    steps: ["Rellena tortilla con queso y pollo.", "Dora en sartén hasta derretir."]
  },
  {
    id: 61,
    title: "Alitas BBQ",
    category: "dinner",
    time: "40 min",
    difficulty: "Medio",
    ingredients: ["pollo", "salsa de tomate", "azúcar", "vinagre"],
    steps: ["Fríe o hornea alitas.", "Haz salsa con ketchup, azúcar y vinagre.", "Baña las alitas."]
  },
  {
    id: 62,
    title: "Pollo Agridulce",
    category: "lunch",
    time: "35 min",
    difficulty: "Medio",
    ingredients: ["pollo", "pimiento", "piña", "vinagre", "azúcar"],
    steps: ["Empaniza y fríe pollo.", "Saltea vegetales.", "Mezcla con salsa agridulce."]
  },
  {
    id: 63,
    title: "Risotto de Hongos",
    category: "dinner",
    time: "40 min",
    difficulty: "Difícil",
    ingredients: ["arroz", "hongos", "caldo", "queso", "mantequilla"],
    steps: ["Sofríe arroz y hongos.", "Añade caldo poco a poco moviendo siempre.", "Termina con mantequilla."]
  },
  {
    id: 64,
    title: "Pasta Alfredo",
    category: "dinner",
    time: "20 min",
    difficulty: "Fácil",
    ingredients: ["pasta", "crema", "queso", "mantequilla"],
    steps: ["Cocina pasta.", "Reduce crema y mantequilla en sartén.", "Añade queso y pasta."]
  },
  {
    id: 65,
    title: "Burritos de Frijol",
    category: "dinner",
    time: "15 min",
    difficulty: "Fácil",
    ingredients: ["tortilla", "frijol", "arroz", "queso"],
    steps: ["Rellena tortilla grande con arroz, frijol y queso.", "Enrolla y dora."]
  },
  {
    id: 66,
    title: "Tortilla Española",
    category: "dinner",
    time: "30 min",
    difficulty: "Medio",
    ingredients: ["huevo", "papa", "cebolla", "aceite"],
    steps: ["Confita papa y cebolla en aceite.", "Mezcla con huevo.", "Cuaja en sartén."]
  },
  {
    id: 67,
    title: "Milanesa de Pollo",
    category: "lunch",
    time: "25 min",
    difficulty: "Fácil",
    ingredients: ["pollo", "pan", "huevo", "harina"],
    steps: ["Aplana pollo.", "Empaniza (harina, huevo, pan).", "Fríe."]
  },
  {
    id: 68,
    title: "Papas Rellenas",
    category: "lunch",
    time: "45 min",
    difficulty: "Medio",
    ingredients: ["papa", "carne", "huevo", "harina"],
    steps: ["Haz puré de papa.", "Rellena con carne molida.", "Pasa por huevo y fríe."]
  },
  {
    id: 69,
    title: "Arepas Rellenas",
    category: "dinner",
    time: "30 min",
    difficulty: "Fácil",
    ingredients: ["harina maiz", "queso", "jamón", "mantequilla"],
    steps: ["Haz masa con harina y agua.", "Asa arepas.", "Abre y rellena."]
  },
  {
    id: 70,
    title: "Ensalada de Atún",
    category: "dinner",
    time: "10 min",
    difficulty: "Muy Fácil",
    ingredients: ["atún", "lechuga", "tomate", "huevo", "maíz"],
    steps: ["Mezcla lechuga, tomate, maíz y huevo duro.", "Añade atún y adereza."]
  },
  {
    id: 71,
    title: "Sopa de Pollo (Dieta)",
    category: "lunch",
    time: "40 min",
    difficulty: "Fácil",
    ingredients: ["pollo", "fideo", "papa", "zanahoria"],
    steps: ["Hierve pollo con verduras picadas.", "Añade fideo cabello de ángel."]
  },
  {
    id: 72,
    title: "Pollo al Horno",
    category: "lunch",
    time: "1h",
    difficulty: "Fácil",
    ingredients: ["pollo", "limón", "orégano", "papa"],
    steps: ["Adoba pollo y papas.", "Hornea a 200C hasta dorar."]
  },
  {
    id: 73,
    title: "Hot Dogs Caseros",
    category: "dinner",
    time: "15 min",
    difficulty: "Muy Fácil",
    ingredients: ["pan", "salchicha", "salsas", "cebolla"],
    steps: ["Hierve salchichas.", "Pon en pan.", "Añade salsas y papitas."]
  },
  {
    id: 74,
    title: "Nachos con Queso",
    category: "dinner",
    time: "15 min",
    difficulty: "Fácil",
    ingredients: ["totopos", "queso", "carne", "frijol"],
    steps: ["Pon totopos en plato.", "Cubre con carne, frijol y queso.", "Derrite en microondas."]
  },
  {
    id: 75,
    title: "Pescado Frito",
    category: "lunch",
    time: "20 min",
    difficulty: "Fácil",
    ingredients: ["pescado", "harina", "limón"],
    steps: ["Aliña pescado.", "Pasa por harina.", "Fríe en abundante aceite."]
  },
  {
    id: 76,
    title: "Puré de Papa Cremoso",
    category: "dinner",
    time: "25 min",
    difficulty: "Fácil",
    ingredients: ["papa", "leche", "mantequilla"],
    steps: ["Cocina papas.", "Aplasta con mantequilla y leche caliente."]
  },
  {
    id: 77,
    title: "Arroz con Huevo",
    category: "lunch",
    time: "15 min",
    difficulty: "Muy Fácil",
    ingredients: ["arroz", "huevo", "aceite"],
    steps: ["Fríe huevos con puntilla.", "Sirve sobre arroz caliente."]
  },
  {
    id: 78,
    title: "Fajitas de Pollo",
    category: "dinner",
    time: "20 min",
    difficulty: "Fácil",
    ingredients: ["pollo", "pimiento", "cebolla", "tortilla"],
    steps: ["Saltea tiras de pollo y verduras.", "Sirve en tortillas."]
  },
  {
    id: 79,
    title: "Pasta con Atún",
    category: "lunch",
    time: "15 min",
    difficulty: "Fácil",
    ingredients: ["pasta", "atún", "crema", "maíz"],
    steps: ["Mezcla pasta cocida con atún y crema.", "Calienta un poco."]
  },
  {
    id: 80,
    title: "Choclo con Queso",
    category: "dinner",
    time: "20 min",
    difficulty: "Muy Fácil",
    ingredients: ["choclo", "queso", "mayonesa"],
    steps: ["Cocina choclo.", "Sirve con tajada de queso o salsa."]
  },
  {
    id: 81,
    title: "Ensalada Caprese",
    category: "dinner",
    time: "10 min",
    difficulty: "Muy Fácil",
    ingredients: ["tomate", "queso", "albahaca", "aceite"],
    steps: ["Rodajas de tomate y queso mozzarella.", "Pon albahaca y aceite oliva."]
  },
  {
    id: 82,
    title: "Wrap de Pollo",
    category: "lunch",
    time: "15 min",
    difficulty: "Fácil",
    ingredients: ["tortilla", "pollo", "lechuga", "aderezo"],
    steps: ["Rellena tortilla con pollo, lechuga y salsas.", "Enrolla."]
  },
  {
    id: 83,
    title: "Papas Fritas Caseras",
    category: "dinner",
    time: "25 min",
    difficulty: "Medio",
    ingredients: ["papa", "aceite", "sal"],
    steps: ["Corta papas en bastones.", "Fríe en aceite medio, saca, sube fuego y fríe de nuevo (doble cocción)."]
  },
  {
    id: 84,
    title: "Carne con Brócoli",
    category: "lunch",
    time: "20 min",
    difficulty: "Fácil",
    ingredients: ["carne", "brócoli", "soja", "ajo"],
    steps: ["Saltea carne.", "Añade brócoli y un poco de agua.", "Termina con soja."]
  },
  {
    id: 85,
    title: "Sándwich Club",
    category: "dinner",
    time: "20 min",
    difficulty: "Medio",
    ingredients: ["pan", "pollo", "jamón", "queso", "tocino"],
    steps: ["Arma torre de 3 panes con todos los ingredientes.", "Corta en triángulos."]
  },
  {
    id: 86,
    title: "Arroz con Leche",
    category: "breakfast",
    time: "30 min",
    difficulty: "Fácil",
    ingredients: ["arroz", "leche", "canela", "azúcar"],
    steps: ["Cocina arroz con canela.", "Añade leche y azúcar.", "Espesa."]
  },
  {
    id: 87,
    title: "Guacamole con Nachos",
    category: "dinner",
    time: "10 min",
    difficulty: "Muy Fácil",
    ingredients: ["aguacate", "tomate", "cebolla", "limón"],
    steps: ["Aplasta aguacate.", "Mezcla con pico de gallo.", "Sirve con nachos."]
  },
  {
    id: 88,
    title: "Pollo a la Plancha",
    category: "lunch",
    time: "15 min",
    difficulty: "Muy Fácil",
    ingredients: ["pollo", "limón", "ajo", "ensalada"],
    steps: ["Aliña filete de pollo.", "Cocina en plancha caliente.", "Sirve con ensalada."]
  },
  {
    id: 89,
    title: "Crema de Espinacas",
    category: "dinner",
    time: "20 min",
    difficulty: "Fácil",
    ingredients: ["espinaca", "leche", "harina", "mantequilla"],
    steps: ["Haz salsa blanca (bechamel).", "Licúa con espinaca cocida."]
  },
  {
    id: 90,
    title: "Ceviche de Pollo",
    category: "lunch",
    time: "40 min",
    difficulty: "Fácil",
    ingredients: ["pollo", "limón", "cebolla", "tomate"],
    steps: ["Cocina trozos de pollo.", "Mezcla con salsa de ceviche (limón, tomate, cebolla)."]
  },
  {
    id: 91,
    title: "Salchipapas",
    category: "dinner",
    time: "20 min",
    difficulty: "Muy Fácil",
    ingredients: ["papa", "salchicha", "salsa"],
    steps: ["Fríe papas y salchichas.", "Mezcla y pon salsas."]
  },
  {
    id: 92,
    title: "Maduro con Queso",
    category: "dinner",
    time: "20 min",
    difficulty: "Muy Fácil",
    ingredients: ["maduro", "queso", "mantequilla"],
    steps: ["Asa el maduro (horno o sartén).", "Abre y rellena con queso."]
  },
  {
    id: 93,
    title: "Pasta al Pesto",
    category: "lunch",
    time: "20 min",
    difficulty: "Fácil",
    ingredients: ["pasta", "albahaca", "aceite", "ajo", "nuez"],
    steps: ["Licúa albahaca, aceite, ajo y nueces.", "Mezcla con pasta caliente."]
  },
  {
    id: 94,
    title: "Ensalada Rusa",
    category: "lunch",
    time: "25 min",
    difficulty: "Fácil",
    ingredients: ["papa", "zanahoria", "alverja", "mayonesa"],
    steps: ["Cocina verduras en cubos.", "Mezcla con mayonesa cuando enfríen."]
  },
  {
    id: 95,
    title: "Torrejas de Atún",
    category: "lunch",
    time: "15 min",
    difficulty: "Fácil",
    ingredients: ["atún", "huevo", "harina", "cebolla"],
    steps: ["Mezcla atún, huevo y harina.", "Fríe por cucharadas."]
  },
  {
    id: 96,
    title: "Agua de Horchata (Bebida)",
    category: "breakfast",
    time: "20 min",
    difficulty: "Fácil",
    ingredients: ["hierbas", "limón", "azúcar"],
    steps: ["Hierve mezcla de hierbas y flores.", "Cierne y endulza con limón."]
  },
  {
    id: 97,
    title: "Colada de Avena (Quaker)",
    category: "breakfast",
    time: "20 min",
    difficulty: "Fácil",
    ingredients: ["avena", "leche", "naranjilla", "canela"],
    steps: ["Hierve agua con canela y naranjilla.", "Añade avena disuelta.", "Añade leche al final."]
  },
  {
    id: 98,
    title: "Pescado al Vapor",
    category: "dinner",
    time: "20 min",
    difficulty: "Fácil",
    ingredients: ["pescado", "vegetales", "papel aluminio"],
    steps: ["Pon pescado y verduras en aluminio.", "Cierra bien y cocina al vapor o sartén."]
  },
  {
    id: 99,
    title: "Carne Apanada",
    category: "lunch",
    time: "20 min",
    difficulty: "Fácil",
    ingredients: ["carne", "pan", "huevo"],
    steps: ["Pasa carne por huevo y pan rallado.", "Fríe."]
  },
  {
    id: 100,
    title: "Canelazo (Bebida)",
    category: "dinner",
    time: "20 min",
    difficulty: "Fácil",
    ingredients: ["agua", "canela", "naranjilla", "azúcar", "aguardiente"],
    steps: ["Hierve agua con canela, azúcar y naranjilla.", "Sirve caliente (con o sin piquete)."]
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