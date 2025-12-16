import React, { useState, useMemo } from 'react';

// --- Base de datos de recetas (AUMENTADA CON SABOR ECUATORIANO 🇪🇨) ---
const RECIPE_DATABASE = [
  // --- ECUATORIANAS ---
  {
    id: 101,
    title: "Encebollado Ecuatoriano",
    category: "lunch",
    time: "60 min",
    difficulty: "Medio",
    calories: 400,
    ingredients: ["pescado", "atún", "yuca", "cebolla", "cilantro", "limón", "aji"],
    steps: ["Cocina la yuca y el pescado en agua con condimentos.", "Separa el pescado en láminas.", "Haz un curtido con la cebolla y limón.", "Sirve el caldo con la yuca picada, el pescado y el curtido encima.", "Acompaña con chifles o pan."]
  },
  {
    id: 102,
    title: "Locro de Papa",
    category: "lunch",
    time: "40 min",
    difficulty: "Fácil",
    calories: 350,
    ingredients: ["papa", "leche", "queso", "achiote", "cebolla", "aguacate"],
    steps: ["Haz un refrito con cebolla y achiote.", "Añade las papas peladas y cortadas con agua.", "Cocina hasta que las papas se deshagan y espese.", "Agrega la leche y el queso desmenuzado.", "Sirve con una tajada de aguacate."]
  },
  {
    id: 103,
    title: "Seco de Pollo",
    category: "lunch",
    time: "50 min",
    difficulty: "Medio",
    calories: 550,
    ingredients: ["pollo", "cebolla", "tomate", "pimiento", "cilantro", "cerveza", "naranjilla", "arroz"],
    steps: ["Licúa tomate, pimiento, cebolla y naranjilla (o cerveza).", "Sofríe el pollo para sellarlo.", "Añade el licuado y cocina a fuego lento hasta que el pollo esté suave.", "Sirve con arroz amarillo y maduro frito."]
  },
  {
    id: 104,
    title: "Ceviche de Camarón",
    category: "lunch",
    time: "30 min",
    difficulty: "Fácil",
    calories: 300,
    ingredients: ["camarón", "limón", "cebolla", "tomate", "naranja", "cilantro", "salsa de tomate"],
    steps: ["Cocina los camarones brevemente en agua hirviendo.", "Mezcla jugo de limón, naranja y salsa de tomate.", "Añade cebolla picada, tomate y cilantro.", "Incorpora los camarones y deja marinar.", "Acompaña con canguil o chifles."]
  },
  {
    id: 105,
    title: "Bolón de Verde",
    category: "breakfast",
    time: "40 min",
    difficulty: "Medio",
    calories: 480,
    ingredients: ["verde", "plátano", "queso", "cerdo", "chicharrón", "mantequilla"],
    steps: ["Pela y cocina (o fríe) el verde en trozos.", "Maja el verde caliente con mantequilla hasta hacer una masa.", "Mezcla con queso o chicharrón.", "Forma bolas grandes.", "Puedes servirlos así o freírlos un poco para que estén crocantes."]
  },
  {
    id: 106,
    title: "Llapingachos",
    category: "lunch",
    time: "45 min",
    difficulty: "Medio",
    calories: 420,
    ingredients: ["papa", "queso", "achiote", "cebolla", "huevo", "maní", "chorizo"],
    steps: ["Cocina las papas y haz un puré.", "Mezcla con refrito de cebolla y achiote.", "Forma tortillas rellenas de queso.", "Dora las tortillas en una plancha.", "Sirve con huevo frito, chorizo y salsa de maní."]
  },
  {
    id: 107,
    title: "Tigrillo",
    category: "breakfast",
    time: "30 min",
    difficulty: "Fácil",
    calories: 450,
    ingredients: ["verde", "plátano", "huevo", "queso", "cebolla", "leche"],
    steps: ["Cocina el verde y májalo dejándolo un poco rústico.", "Haz un refrito de cebolla.", "Añade el verde, luego los huevos batidos y el queso.", "Revuelve todo hasta que se integre bien."]
  },
  {
    id: 108,
    title: "Menestra con Carne Asada",
    category: "lunch",
    time: "50 min",
    difficulty: "Fácil",
    calories: 600,
    ingredients: ["lenteja", "frijol", "arroz", "carne", "verde", "cebolla", "tomate"],
    steps: ["Cocina la menestra (lenteja o frijol) con un refrito de cebolla, tomate y pimiento.", "Asa la carne con sal y comino.", "Sirve la menestra con arroz blanco, la carne y patacones."]
  },

  // --- CLÁSICAS E INTERNACIONALES ---
  {
    id: 1,
    title: "Arroz con Pollo Clásico",
    category: "lunch",
    time: "45 min",
    difficulty: "Medio",
    calories: 450,
    ingredients: ["arroz", "pollo", "cebolla", "pimiento", "ajo", "zanahoria", "guisantes"],
    steps: ["Sofríe el pollo con sal y pimienta.", "Añade las verduras picadas y sofríe.", "Incorpora el arroz y el agua/caldo.", "Cocina a fuego lento hasta que el arroz esté tierno."]
  },
  {
    id: 2,
    title: "Tortilla Española",
    category: "dinner",
    time: "30 min",
    difficulty: "Fácil",
    calories: 320,
    ingredients: ["huevo", "papa", "cebolla", "aceite", "sal"],
    steps: ["Pela y corta las papas y la cebolla.", "Fríe las papas y cebolla en abundante aceite.", "Bate los huevos y mezcla con las papas escurridas.", "Cuaja la tortilla en la sartén por ambos lados."]
  },
  {
    id: 3,
    title: "Pasta a la Boloñesa",
    category: "lunch",
    time: "25 min",
    difficulty: "Fácil",
    calories: 500,
    ingredients: ["pasta", "carne molida", "tomate", "cebolla", "ajo", "orégano"],
    steps: ["Cocina la pasta en agua hirviendo.", "Sofríe la cebolla y el ajo.", "Añade la carne hasta que dore.", "Agrega salsa de tomate y mezcla con la pasta."]
  },
  {
    id: 4,
    title: "Ensalada César con Pollo",
    category: "dinner",
    time: "15 min",
    difficulty: "Muy Fácil",
    calories: 250,
    ingredients: ["lechuga", "pollo", "pan", "queso", "limón", "ajo"],
    steps: ["Lava la lechuga.", "Cocina el pollo a la plancha y córtalo.", "Haz crostones con el pan tostado.", "Mezcla todo con aderezo de limón, ajo y queso."]
  },
  {
    id: 5,
    title: "Huevos Rancheros",
    category: "breakfast",
    time: "20 min",
    difficulty: "Fácil",
    calories: 380,
    ingredients: ["huevo", "tortilla", "frijoles", "tomate", "chile", "aguacate"],
    steps: ["Fríe ligeramente las tortillas.", "Prepara una salsa de tomate picante.", "Fríe los huevos estrellados.", "Monta el huevo sobre la tortilla con frijoles y salsa."]
  },
  {
    id: 6,
    title: "Panqueques de Avena",
    category: "breakfast",
    time: "15 min",
    difficulty: "Fácil",
    calories: 200,
    ingredients: ["avena", "banana", "huevo", "leche", "canela"],
    steps: ["Tritura la avena o usa harina.", "Mezcla con banana machacada y huevo.", "Cocina pequeñas porciones en un sartén antiadherente."]
  },
  {
    id: 7,
    title: "Arroz con Huevo Frito",
    category: "lunch",
    time: "10 min",
    difficulty: "Muy Fácil",
    calories: 300,
    ingredients: ["arroz", "huevo", "aceite", "salchicha", "maduro"],
    steps: ["Calienta el arroz que te sobró o haz fresco.", "Fríe los huevos con puntilla (bordes crocantes).", "Si tienes, fríe unas salchichas o maduros.", "Mezcla todo y disfruta lo simple."]
  }
];

// Sugerencias rápidas (Incluye ingredientes locales)
const QUICK_ADDS = ["Huevo", "Pollo", "Arroz", "Papa", "Verde", "Camarón", "Atún", "Queso", "Leche", "Cebolla", "Tomate", "Yuca", "Maní", "Limón"];

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
    
    // Función auxiliar para buscar coincidencias parciales (ej: 'verde' coincide con 'plátano verde')
    const checkMatch = (recipeIng, pantryList) => {
        return pantryList.some(pIng => 
            pIng.includes(recipeIng) || recipeIng.includes(pIng) ||
            (pIng === 'verde' && recipeIng.includes('plátano')) || // Sinónimo común
            (pIng === 'pescado' && recipeIng.includes('atún'))    // Sinónimo común
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

  // --- ESTILOS CSS INCRUSTADOS (Spiderman Theme) ---
  const styles = {
    container: { fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f0f4f8', minHeight: '100vh', paddingBottom: '20px' },
    header: { backgroundColor: '#fff', borderBottom: '4px solid #1e3a8a', padding: '15px', position: 'sticky', top: 0, zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
    logo: { fontSize: '24px', fontWeight: '900', color: '#1e3a8a', display: 'flex', alignItems: 'center', gap: '10px', fontStyle: 'italic' },
    logoIcon: { backgroundColor: '#dc2626', color: 'white', padding: '5px 10px', borderRadius: '8px', transform: 'rotate(-3deg)' },
    card: { backgroundColor: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '20px', border: '1px solid #bfdbfe' },
    inputGroup: { display: 'flex', gap: '10px', marginBottom: '15px' },
    input: { flex: 1, padding: '12px', borderRadius: '12px', border: '2px solid #bfdbfe', fontSize: '16px', outline: 'none' },
    btnPrimary: { backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 3px 0 #991b1b' },
    btnSearch: { width: '100%', background: 'linear-gradient(90deg, #dc2626, #1d4ed8)', color: 'white', border: 'none', padding: '16px', borderRadius: '12px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px', textTransform: 'uppercase' },
    tag: { backgroundColor: '#1d4ed8', color: 'white', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '8px', margin: '4px' },
    suggestion: { backgroundColor: 'white', border: '1px solid #bfdbfe', color: '#1d4ed8', padding: '5px 12px', borderRadius: '20px', fontSize: '13px', cursor: 'pointer', fontWeight: '600', margin: '3px' },
    recipeCard: { backgroundColor: 'white', padding: '15px', borderRadius: '12px', border: '2px solid #e5e7eb', marginBottom: '12px', cursor: 'pointer', position: 'relative', overflow: 'hidden' },
    badge: { position: 'absolute', top: 0, right: 0, padding: '4px 8px', fontSize: '11px', fontWeight: 'bold', borderBottomLeftRadius: '10px', color: 'white' },
    filterBtn: { padding: '8px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginRight: '8px', fontSize: '13px' },
    backBtn: { background: 'none', border: 'none', color: '#4b5563', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '5px' }
  };

  // --- PANTALLAS ---
  
  const PantryScreen = () => (
    <div style={{ padding: '20px' }}>
      <div style={styles.card}>
        <h2 style={{ color: '#1e3a8a', marginTop: 0 }}>🍴 ¿Qué hay en tu cocina?</h2>
        <div style={styles.inputGroup}>
          <input 
            style={styles.input} 
            value={inputValue} 
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addIngredient(inputValue)}
            placeholder="Ej: yuca, atún, maní..." 
          />
          <button style={styles.btnPrimary} onClick={() => addIngredient(inputValue)}>➕</button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {QUICK_ADDS.map(item => (
            <button key={item} style={styles.suggestion} onClick={() => addIngredient(item)}>+ {item}</button>
          ))}
        </div>
      </div>

      <h3 style={{ marginLeft: '10px', color: '#6b7280', fontSize: '12px', textTransform: 'uppercase' }}>TU DESPENSA ({pantry.length})</h3>
      <div style={{ padding: '0 10px' }}>
        {pantry.length === 0 ? <p style={{ textAlign: 'center', color: '#9ca3af' }}>Tu despensa está vacía 🕸️</p> : 
          pantry.map(ing => (
            <span key={ing} style={styles.tag}>
              {ing.charAt(0).toUpperCase() + ing.slice(1)}
              <span onClick={() => removeIngredient(ing)} style={{ cursor: 'pointer' }}>✖</span>
            </span>
          ))
        }
      </div>

      {pantry.length > 0 && (
        <button style={styles.btnSearch} onClick={() => setActiveTab("recipes")}>
          🔍 Buscar en JAM CHEF
        </button>
      )}
    </div>
  );

  const RecipesScreen = () => (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
        <button style={styles.backBtn} onClick={() => setActiveTab("pantry")}>⬅ Editar despensa</button>
        <span style={{ fontWeight: 'bold', color: '#1e3a8a' }}>{matchedRecipes.length} encontrados</span>
      </div>

      <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', marginBottom: '15px', paddingBottom: '5px' }}>
        {[{id:'all',l:'Todo'}, {id:'breakfast',l:'Desayuno'}, {id:'lunch',l:'Almuerzo'}, {id:'dinner',l:'Cena'}].map(cat => (
          <button key={cat.id} onClick={() => setFilter(cat.id)} style={{
            ...styles.filterBtn,
            backgroundColor: filter === cat.id ? '#1e3a8a' : 'white',
            color: filter === cat.id ? 'white' : '#6b7280',
            border: filter === cat.id ? 'none' : '1px solid #d1d5db'
          }}>{cat.l}</button>
        ))}
      </div>

      <div>
        {matchedRecipes.length > 0 ? matchedRecipes.map(recipe => (
          <div key={recipe.id} style={styles.recipeCard} onClick={() => { setSelectedRecipe(recipe); setActiveTab("details"); }}>
            <div style={{ ...styles.badge, backgroundColor: recipe.matchPercentage === 100 ? '#dc2626' : '#f59e0b' }}>
              {recipe.matchPercentage === 100 ? '¡TIENES TODO!' : `${recipe.matchPercentage}% MATCH`}
            </div>
            <h3 style={{ margin: '0 0 5px 0', color: '#1f2937' }}>{recipe.title} {recipe.id > 100 ? '🇪🇨' : ''}</h3>
            <div style={{ fontSize: '12px', color: '#6b7280', display: 'flex', gap: '10px' }}>
              <span>⏱ {recipe.time}</span>
              <span>🔥 {recipe.calories} kcal</span>
            </div>
            <div style={{ marginTop: '10px' }}>
              <small style={{ color: '#9ca3af', fontWeight: 'bold' }}>TIENES {recipe.haveCount} / {recipe.ingredients.length}:</small>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                {recipe.haveIngredients.slice(0, 4).map(ing => (
                  <span key={ing} style={{ fontSize: '10px', backgroundColor: '#eff6ff', color: '#1e40af', padding: '2px 6px', borderRadius: '4px', border: '1px solid #bfdbfe' }}>
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )) : <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af', border: '2px dashed #e5e7eb', borderRadius: '12px' }}>No hay recetas compatibles 🕷️<br/><small>Prueba agregando "Verde", "Yuca" o "Atún"</small></div>}
      </div>
    </div>
  );

  const DetailsScreen = () => {
    if (!selectedRecipe) return null;
    return (
      <div style={{ padding: '20px' }}>
        <button style={styles.backBtn} onClick={() => setActiveTab("recipes")}>⬅ Volver</button>
        <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
          <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '20px' }}>
            <span style={{ backgroundColor: '#dc2626', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>
              {selectedRecipe.category}
            </span>
            <h1 style={{ margin: '10px 0', fontSize: '24px' }}>{selectedRecipe.title}</h1>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>⏱ {selectedRecipe.time} • 🔥 {selectedRecipe.calories} kcal</div>
          </div>
          <div style={{ padding: '20px' }}>
            <h3 style={{ color: '#dc2626', borderBottom: '2px solid #fee2e2', paddingBottom: '5px' }}>🥗 Ingredientes</h3>
            {selectedRecipe.ingredients.map(ing => {
              // Lógica mejorada para encontrar ingredientes
              const hasIt = pantry.some(p => 
                  p.includes(ing) || ing.includes(p) ||
                  (p === 'verde' && ing.includes('plátano')) ||
                  (p === 'pescado' && ing.includes('atún'))
              );
              return (
                <div key={ing} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                  <span style={{ textTransform: 'capitalize', color: hasIt ? '#111827' : '#9ca3af', fontWeight: hasIt ? 'bold' : 'normal' }}>{ing}</span>
                  {hasIt ? <span style={{ color: '#059669' }}>✔</span> : <span style={{ color: '#ef4444', fontSize: '12px', fontWeight: 'bold' }}>FALTA</span>}
                </div>
              );
            })}
            <h3 style={{ color: '#dc2626', borderBottom: '2px solid #fee2e2', paddingBottom: '5px', marginTop: '20px' }}>👨‍🍳 Instrucciones</h3>
            {selectedRecipe.steps.map((step, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <div style={{ minWidth: '24px', height: '24px', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '12px' }}>{idx + 1}</div>
                <p style={{ margin: 0, color: '#374151', lineHeight: '1.5' }}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.logo}><span style={styles.logoIcon}>👨‍🍳</span> JAM CHEF</div>
        {activeTab !== 'pantry' && <span style={{ backgroundColor: '#dc2626', color: 'white', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>{pantry.length} INGS</span>}
      </div>
      {activeTab === 'pantry' && <PantryScreen />}
      {activeTab === 'recipes' && <RecipesScreen />}
      {activeTab === 'details' && <DetailsScreen />}
    </div>
  );
}