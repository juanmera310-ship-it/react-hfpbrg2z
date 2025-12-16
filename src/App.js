import React, { useState, useMemo } from 'react';

// --- BASE DE DATOS PREMIUM ---
// Nota: Aquí hay una selección representativa. Para llegar a 100, puedes copiar y pegar 
// el formato agregando tus propias variaciones siguiendo este esquema detallado.

const RECIPE_DATABASE = [
  // ==========================================
  // 🇪🇨 ECUADOR - DESAYUNOS Y ENTRADAS
  // ==========================================
  {
    id: 101,
    title: "Bolón de Verde Mixto (Chicharrón y Queso)",
    category: "breakfast",
    time: "45 min",
    difficulty: "Medio",
    calories: 550,
    ingredients: ["verde", "queso", "cerdo", "mantequilla", "sal", "aceite"],
    steps: [
      "1. PREPARACIÓN DEL VERDE: Pela los verdes y córtalos en trozos medianos. En una sartén con abundante aceite caliente, fríelos a fuego medio hasta que estén dorados por fuera y suaves por dentro (aprox 15 min).",
      "2. MAJADO: Pasa los verdes calientes a un batea o bowl grande. Májalos con piedra o mazo inmediatamente. Agrega sal y una cucharada generosa de mantequilla para dar suavidad.",
      "3. EL RELLENO: Incorpora el queso desmenuzado y los trozos de chicharrón (cerdo frito) a la masa. Amasa con las manos (cuidado con el calor) hasta integrar todo.",
      "4. FORMADO: Toma porciones grandes y forma bolas compactas apretando bien con las manos.",
      "5. TOQUE FINAL: (Opcional) Pasa los bolones formados nuevamente por aceite caliente 2 minutos para crear una costra crocante.",
      "6. SERVIR: Acompaña obligatoriamente con una taza de café negro pasado y huevo frito."
    ]
  },
  {
    id: 102,
    title: "Tigrillo Zarumeño",
    category: "breakfast",
    time: "30 min",
    difficulty: "Fácil",
    calories: 480,
    ingredients: ["verde", "huevo", "queso", "cebolla", "leche", "mantequilla", "cilantro"],
    steps: [
      "1. COCCIÓN: Pela y cocina los verdes en agua con sal hasta que estén muy suaves (aprox 20 min). Escurre el agua.",
      "2. MAJADO RÚSTICO: Maja los verdes pero no totalmente puré, deja algunos trocitos (textura rústica).",
      "3. EL REFRITO: En una paila o sartén grande, derrite mantequilla y sofríe la cebolla blanca picada finamente hasta que esté transparente.",
      "4. MEZCLA: Añade el verde majado al refrito y mezcla bien a fuego medio.",
      "5. HUEVOS Y QUESO: Agrega los huevos batidos directamente sobre la mezcla y revuelve vigorosamente. Inmediatamente añade el queso fresco desmenuzado.",
      "6. CREMOSIDAD: Vierte un chorrito de leche para dar humedad y sigue revolviendo hasta que el huevo esté cocido pero jugoso. Finaliza con cilantro picado."
    ]
  },
  {
    id: 103,
    title: "Humitas (Estilo Casero)",
    category: "breakfast",
    time: "90 min",
    difficulty: "Difícil",
    calories: 300,
    ingredients: ["choclo", "queso", "huevo", "cebolla", "mantequilla", "maicena"],
    steps: [
      "1. EL CHOCLO: Desgrana el choclo tierno y muélelo finamente (en molino o procesador). Guarda las hojas (pancas) intactas para envolver.",
      "2. LA MASA: Mezcla el choclo molido con mantequilla derretida, huevos batidos, sal, una pizca de azúcar y un refrito de cebolla blanca. Si está muy aguado, añade un poco de maicena.",
      "3. ARMADO: Toma dos hojas de choclo superpuestas. Pon una cucharada de masa en el centro y una tajada de queso.",
      "4. ENVOLTURA: Dobla los costados hacia el centro y la punta hacia abajo, formando un paquete seguro.",
      "5. COCCIÓN: Cocina al vapor en una tamalera con 'cama' de tusas y hojas por aproximadamente 45-60 minutos."
    ]
  },

  // ==========================================
  // 🇪🇨 ECUADOR - ALMUERZOS Y PLATOS FUERTES
  // ==========================================
  {
    id: 201,
    title: "Encebollado de Albacora (El Original)",
    category: "lunch",
    time: "1 h 30 min",
    difficulty: "Medio",
    calories: 420,
    ingredients: ["albacora", "yuca", "cebolla", "cilantro", "aji", "comino", "tomate", "limón"],
    steps: [
      "1. EL CALDO BASE: Hierve abundante agua. Agrega tomate, cebolla colorada entera, pimiento, ajo, comino, sal y aji peruano (para color).",
      "2. COCCIÓN DE PROTEÍNA: Añade la albacora en trozos grandes y la yuca pelada al caldo. Cocina hasta que la yuca esté suave. Retira la yuca y el pescado.",
      "3. ESPESAR: Saca las verduras (cebolla, tomate, pimiento) del caldo y licúalas con un poco del mismo líquido y un trozo pequeño de yuca cocida (para espesar). Cierne esta mezcla y regrésala a la olla.",
      "4. PREPARACIÓN FINAL: Separa la albacora en láminas (lascas). Corta la yuca en cuadros medianos.",
      "5. CURTIDO: Corta cebolla colorada en plumas finas, lávala bien y cúrtela con sal y limón.",
      "6. EMPLATADO: En un plato hondo pon la yuca picada, encima el pescado, baña con el caldo hirviendo y corona con el curtido de cebolla y abundante cilantro. Acompaña con chifles y pan."
    ]
  },
  {
    id: 202,
    title: "Seco de Pollo con Naranjilla",
    category: "lunch",
    time: "60 min",
    difficulty: "Medio",
    calories: 550,
    ingredients: ["pollo", "cebolla", "tomate", "pimiento", "naranjilla", "cilantro", "cerveza", "achiote"],
    steps: [
      "1. SELLADO: Salpimienta las presas de pollo. En una olla con achiote caliente, dora las presas por ambos lados y retíralas.",
      "2. EL REFRITO: En el mismo aceite, sofríe cebolla colorada, pimiento y ajo picados en cuadros muy pequeños (brunoise) hasta que estén suaves.",
      "3. EL LICUADO ÁCIDO: Licúa los tomates con la pulpa de naranjilla (o maracuyá si no tienes) y la cerveza (opcional). Cierne si deseas.",
      "4. COCCIÓN LENTA: Regresa el pollo a la olla, añade el licuado, sal, comino y una rama de cilantro. Tapa y cocina a fuego bajo por 45 minutos hasta que la salsa espese y el pollo esté muy suave.",
      "5. FINALIZAR: Rectifica la sal y añade cilantro picado fresco al apagar. Sirve con arroz amarillo y maduro frito."
    ]
  },
  {
    id: 203,
    title: "Locro de Papa Quiteño",
    category: "lunch",
    time: "45 min",
    difficulty: "Fácil",
    calories: 380,
    ingredients: ["papa", "leche", "queso", "achiote", "cebolla", "aguacate", "ajo"],
    steps: [
      "1. LAS PAPAS: Usa papas 'chola' o harinosa. Pela y corta: la mitad en cubos pequeños (para que se deshagan) y la otra mitad en cubos grandes (para encontrar trozos).",
      "2. REFRITO BASE: En una olla grande, haz un refrito con aceite, achiote, cebolla blanca picada y ajo machacado. Sofríe 5 minutos.",
      "3. COCCIÓN: Añade las papas y sofríe 2 minutos más. Agrega agua caliente hasta cubrir las papas más dos dedos extra. Cocina a fuego medio-alto.",
      "4. TEXTURA: Cuando las papas pequeñas se deshagan y el caldo espese, baja la llama. Aplasta algunas papas con el cucharón contra la olla para dar más espesor.",
      "5. TOQUE LÁCTEO: Agrega la leche caliente y el queso fresco desmenuzado. Cocina 5 minutos más sin dejar de mecer.",
      "6. SERVICIO: Sirve muy caliente con una tajada de aguacate encima y salsa de ají."
    ]
  },
  {
    id: 204,
    title: "Guatita Ecuatoriana",
    category: "lunch",
    time: "2 horas",
    difficulty: "Difícil",
    calories: 600,
    ingredients: ["mondongo", "papa", "maní", "leche", "cebolla", "ajo", "yerbita"],
    steps: [
      "1. LIMPIEZA: Lava el mondongo (panza) con limón y hierbabuena. Cocínalo en olla de presión con ajo y cebolla por 45 min hasta que esté suave. Córtalo en cuadritos.",
      "2. SALSA DE MANÍ: Licúa la pasta de maní con la leche hasta obtener una mezcla homogénea.",
      "3. EL GUISO: Haz un refrito con cebolla, pimiento, ajo y achiote. Agrega las papas cortadas en cubos y el mondongo picado.",
      "4. COCCIÓN: Añade un poco del caldo de la panza y cocina hasta que la papa esté casi lista.",
      "5. ESPESADO: Incorpora la mezcla de maní y leche. Cocina a fuego lento moviendo constantemente para que no se pegue hasta que espese y hierva bien (aprox 15 min).",
      "6. FINAL: Agrega cilantro picado y sirve con arroz blanco y huevo duro."
    ]
  },
  {
    id: 205,
    title: "Ceviche de Camarón",
    category: "lunch",
    time: "30 min",
    difficulty: "Fácil",
    calories: 320,
    ingredients: ["camarón", "limón", "naranja", "tomate", "cebolla", "salsa de tomate", "mostaza", "cilantro"],
    steps: [
      "1. CAMARONES: Pela y desvena los camarones. Cocínalos en agua hirviendo con sal y cebolla solo por 2-3 minutos (hasta que se pongan rosados). ¡No te pases o se ponen cauchosos! Pásalos a agua con hielo.",
      "2. BASE CÍTRICA: En un bowl, exprime los limones y las naranjas. Agrega sal, pimienta y un poco de mostaza.",
      "3. VEGETALES: Pica la cebolla colorada en plumas finas (cúrtela previamente si deseas), el pimiento (opcional) y el tomate en cubos pequeños sin semillas.",
      "4. MEZCLA: Incorpora los camarones fríos, los vegetales, la salsa de tomate (al gusto) y un chorrito de aceite. Mezcla bien.",
      "5. REPOSO: Deja reposar en la refri 15 minutos para que los sabores se integren. Añade cilantro picado antes de servir. Acompaña con canguil, chifles o arroz."
    ]
  },

  // ==========================================
  // 🌎 INTERNACIONAL - CENA Y ALMUERZO
  // ==========================================
  {
    id: 301,
    title: "Pasta Carbonara Real (Sin Crema)",
    category: "dinner",
    time: "25 min",
    difficulty: "Medio",
    calories: 550,
    ingredients: ["pasta", "huevo", "queso", "tocino", "pimienta", "sal"],
    steps: [
      "1. PREPARACIÓN: Corta el tocino o guanciale en tiras y ralla el queso parmesano o pecorino finamente.",
      "2. LA SALSA (LA CLAVE): En un bowl, bate 2 yemas de huevo y 1 huevo entero con el queso rallado y abundante pimienta negra molida hasta formar una pasta espesa.",
      "3. CRUJIENTE: En una sartén grande (sin aceite), fríe el tocino hasta que esté dorado y suelte su grasa. Apaga el fuego.",
      "4. LA PASTA: Cocina la pasta en agua con sal hasta que esté 'al dente'. ¡Guarda una taza del agua de cocción antes de colar!",
      "5. MANTECADO (TÉCNICA): Pon la pasta caliente directo en la sartén con el tocino (fuego apagado). Agrega un poco de agua de cocción y mueve.",
      "6. UNIÓN: Vierte la mezcla de huevo y queso sobre la pasta. Mueve vigorosamente usando el calor residual de la pasta para cocinar el huevo sin que se haga tortilla. Añade más agua de cocción si es necesario para crear una crema sedosa."
    ]
  },
  {
    id: 302,
    title: "Pollo al Curry Rápido",
    category: "lunch",
    time: "30 min",
    difficulty: "Fácil",
    calories: 450,
    ingredients: ["pollo", "cebolla", "leche", "ajo", "curry", "jengibre", "arroz"],
    steps: [
      "1. DORAR: Corta el pollo en cubos. En una sartén profunda con aceite, séllalos a fuego alto hasta que doren. Retira.",
      "2. AROMÁTICOS: En la misma sartén, baja el fuego y sofríe cebolla picada, ajo y jengibre rallado por 5 minutos.",
      "3. ESPECIAS: Agrega 2 cucharadas de polvo de curry (y cúrcuma si tienes) al sofrito. Cocina 1 minuto para despertar los aromas.",
      "4. SALSA: Añade leche de coco (o leche normal/crema) y devuelve el pollo a la sartén. Raspa el fondo de la olla.",
      "5. REDUCCIÓN: Cocina a fuego medio-bajo por 10 minutos hasta que la salsa espese. Ajusta sal y pimienta.",
      "6. SERVIR: Sirve sobre arroz blanco caliente."
    ]
  },
  {
    id: 303,
    title: "Tacos Mexicanos Caseros",
    category: "dinner",
    time: "25 min",
    difficulty: "Muy Fácil",
    calories: 400,
    ingredients: ["tortilla", "carne molida", "cebolla", "tomate", "limón", "aguacate", "comino"],
    steps: [
      "1. PICO DE GALLO: Pica tomate, cebolla y cilantro finamente. Mezcla en un bowl con jugo de limón y sal. Reserva.",
      "2. CARNE: En una sartén bien caliente, cocina la carne molida. Sazona fuertemente con sal, pimienta, comino, paprika y ajo en polvo.",
      "3. COCCIÓN: Deja que la carne se dore bien y se evapore el líquido para que quede con sabor intenso.",
      "4. GUACAMOLE RÁPIDO: Aplasta el aguacate con un tenedor, añade sal y unas gotas de limón.",
      "5. ARMADO: Calienta las tortillas en una sartén seca o directo al fuego (segundos). Pon carne, luego pico de gallo y finaliza con aguacate."
    ]
  },
  {
    id: 304,
    title: "Risotto de Champiñones",
    category: "dinner",
    time: "40 min",
    difficulty: "Difícil",
    calories: 500,
    ingredients: ["arroz", "champiñones", "caldo", "cebolla", "vino", "mantequilla", "queso"],
    steps: [
      "1. CALDO: Mantén un litro de caldo (pollo o vegetales) hirviendo suavemente en una olla al lado.",
      "2. SOFRITO: En la olla del risotto, sofríe cebolla picada muy fina con mantequilla. Añade los champiñones laminados y cocina hasta que doren.",
      "3. EL ARROZ: Añade el arroz arborio (especial para risotto) y sofríelo 2 minutos hasta que el grano se vea transparente en los bordes (nacarado).",
      "4. VINO: Agrega un chorro de vino blanco y deja evaporar el alcohol completamente.",
      "5. LA PACIENCIA: Empieza a añadir el caldo caliente cucharón a cucharón. Agrega uno, mueve constantemente hasta que el arroz lo absorba, y repite. Nunca dejes de mover (esto saca el almidón).",
      "6. MANTECATURA: A los 18-20 min, cuando el arroz esté suave pero firme, apaga el fuego. Agrega un cubo de mantequilla fría y queso parmesano. Bate enérgicamente para dar brillo y cremosidad."
    ]
  },
  {
    id: 305,
    title: "French Toast (Tostadas Francesas)",
    category: "breakfast",
    time: "15 min",
    difficulty: "Fácil",
    calories: 350,
    ingredients: ["pan", "huevo", "leche", "canela", "azúcar", "mantequilla", "vainilla"],
    steps: [
      "1. MEZCLA: En un plato hondo, bate los huevos, la leche, un chorrito de vainilla, canela y una pizca de azúcar.",
      "2. REMOJO: Usa pan de molde grueso o pan baguette del día anterior. Pasa cada rebanada por la mezcla, dejando que absorba el líquido unos segundos por lado (sin que se deshaga).",
      "3. SARTÉN: Calienta una sartén a fuego medio con un poco de mantequilla.",
      "4. DORADO: Cocina las rebanadas 2-3 minutos por lado hasta que estén doradas y crujientes por fuera.",
      "5. SERVIR: Sirve caliente con miel, frutas o azúcar impalpable."
    ]
  }
];

// --- LISTA DE INGREDIENTES RECONOCIDOS ---
const QUICK_ADDS = [
  "Huevo", "Pollo", "Arroz", "Papa", "Verde", "Camarón", "Atún", 
  "Queso", "Leche", "Cebolla", "Tomate", "Yuca", "Maní", "Carne", "Pasta"
];

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
    
    // Lógica de sinónimos para ingredientes latinos
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

  // --- ESTILOS CSS (Spiderman Theme con Logo Nuevo) ---
  const styles = {
    container: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f0f4f8', minHeight: '100vh', paddingBottom: '80px' },
    header: { backgroundColor: '#fff', borderBottom: '4px solid #1e3a8a', padding: '15px', position: 'sticky', top: 0, zIndex: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
    logo: { fontSize: '22px', fontWeight: '900', color: '#1e3a8a', display: 'flex', alignItems: 'center', gap: '12px', fontStyle: 'italic', letterSpacing: '-0.5px' },
    // Aquí cambiamos el icono visual del header
    logoIcon: { fontSize: '28px' }, 
    card: { backgroundColor: 'white', padding: '24px', borderRadius: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', marginBottom: '20px', border: '1px solid #e5e7eb' },
    inputGroup: { display: 'flex', gap: '8px', marginBottom: '16px' },
    input: { flex: 1, padding: '14px', borderRadius: '14px', border: '2px solid #e5e7eb', fontSize: '16px', outline: 'none', transition: 'border-color 0.2s', backgroundColor: '#f9fafb' },
    btnPrimary: { backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '0 20px', borderRadius: '14px', fontSize: '24px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 0 #991b1b', display: 'flex', alignItems: 'center' },
    btnSearch: { width: '100%', background: 'linear-gradient(135deg, #dc2626, #b91c1c)', color: 'white', border: 'none', padding: '18px', borderRadius: '16px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '10px', textTransform: 'uppercase', boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)' },
    tag: { backgroundColor: '#1d4ed8', color: 'white', padding: '8px 14px', borderRadius: '100px', fontSize: '14px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '8px', margin: '4px', boxShadow: '0 2px 4px rgba(29, 78, 216, 0.2)' },
    suggestion: { backgroundColor: 'white', border: '1px solid #d1d5db', color: '#374151', padding: '6px 14px', borderRadius: '100px', fontSize: '13px', cursor: 'pointer', fontWeight: '500', margin: '4px', transition: 'all 0.2s' },
    recipeCard: { backgroundColor: 'white', padding: '16px', borderRadius: '16px', border: '1px solid #f3f4f6', marginBottom: '12px', cursor: 'pointer', position: 'relative', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', transition: 'transform 0.2s' },
    badge: { position: 'absolute', top: 0, right: 0, padding: '4px 10px', fontSize: '10px', fontWeight: '800', borderBottomLeftRadius: '12px', color: 'white', textTransform: 'uppercase' },
    filterBtn: { padding: '8px 16px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontWeight: '600', marginRight: '8px', fontSize: '13px', transition: 'all 0.2s' },
    backBtn: { background: 'white', border: '1px solid #e5e7eb', padding: '8px 16px', borderRadius: '12px', color: '#374151', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: '6px' },
    stepNum: { minWidth: '28px', height: '28px', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px', marginTop: '2px' }
  };

  // --- PANTALLAS ---
  
  const PantryScreen = () => (
    <div style={{ padding: '20px' }}>
      <div style={styles.card}>
        <h2 sty