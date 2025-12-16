import React, { useState, useMemo } from 'react';

// --- DATOS Y ESTILOS (FUERA DEL COMPONENTE PARA EVITAR ERRORES) ---

const RECIPE_DATABASE = [
  // 🇪🇨 ECUADOR
  {
    id: 101,
    title: "Bolón de Verde Mixto",
    category: "breakfast",
    time: "45 min",
    difficulty: "Medio",
    calories: 550,
    ingredients: ["verde", "queso", "cerdo", "mantequilla", "sal", "aceite"],
    steps: ["1. Pela y corta los verdes. Fríelos en aceite a fuego medio hasta que doren.", "2. Maja los verdes calientes con sal y mantequilla.", "3. Añade queso y chicharrón (cerdo) a la masa. Mezcla bien.", "4. Forma las bolas apretando con las manos.", "5. (Opcional) Pasa los bolones por aceite caliente para hacerlos crocantes.", "6. Sirve con café y huevo frito."]
  },
  {
    id: 102,
    title: "Tigrillo Zarumeño",
    category: "breakfast",
    time: "30 min",
    difficulty: "Fácil",
    calories: 480,
    ingredients: ["verde", "huevo", "queso", "cebolla", "leche", "mantequilla", "cilantro"],
    steps: ["1. Cocina los verdes en agua con sal hasta que estén muy suaves.", "2. Májalos dejando algunos trocitos (rústico).", "3. Haz un refrito con cebolla y mantequilla. Añade el verde.", "4. Agrega los huevos batidos y revuelve. Luego el queso.", "5. Pon un chorrito de leche para que quede cremoso.", "6. Sirve con cilantro picado."]
  },
  {
    id: 103,
    title: "Humitas Caseras",
    category: "breakfast",
    time: "90 min",
    difficulty: "Difícil",
    calories: 300,
    ingredients: ["choclo", "queso", "huevo", "cebolla", "mantequilla", "maicena"],
    steps: ["1. Muele el choclo tierno.", "2. Mezcla con mantequilla, huevo, sal, azúcar y refrito de cebolla.", "3. Pon masa y queso en las hojas de choclo.", "4. Envuelve bien doblando la punta.", "5. Cocina al vapor por 45-60 minutos."]
  },
  {
    id: 201,
    title: "Encebollado (Original)",
    category: "lunch",
    time: "1 h 30 min",
    difficulty: "Medio",
    calories: 420,
    ingredients: ["albacora", "yuca", "cebolla", "cilantro", "aji", "comino", "tomate", "limón", "pescado"],
    steps: ["1. Hierve agua con tomate, cebolla, pimiento y condimentos.", "2. Cocina ahí la albacora y la yuca. Sácalos cuando estén listos.", "3. Licúa las verduras del caldo con un poco de yuca para espesar.", "4. Sirve: Yuca picada, pescado en láminas, caldo y cebolla curtida.", "5. Acompaña con chifles y limón."]
  },
  {
    id: 202,
    title: "Seco de Pollo",
    category: "lunch",
    time: "60 min",
    difficulty: "Medio",
    calories: 550,
    ingredients: ["pollo", "cebolla", "tomate", "pimiento", "naranjilla", "cilantro", "cerveza", "achiote"],
    steps: ["1. Dora las presas de pollo con achiote.", "2. Haz un refrito con cebolla, pimiento y ajo.", "3. Licúa tomate, naranjilla y cerveza.", "4. Cocina el pollo con el licuado a fuego lento 45 min.", "5. Sirve con arroz amarillo y maduro."]
  },
  {
    id: 203,
    title: "Locro de Papa",
    category: "lunch",
    time: "45 min",
    difficulty: "Fácil",
    calories: 380,
    ingredients: ["papa", "leche", "queso", "achiote", "cebolla", "aguacate", "ajo"],
    steps: ["1. Haz un refrito de cebolla y achiote.", "2. Añade papas cortadas (unas grandes, unas chicas).", "3. Cocina con agua hasta que espese y la papa se deshaga.", "4. Agrega leche y queso fresco.", "5. Sirve con aguacate y ají."]
  },
  {
    id: 204,
    title: "Guatita",
    category: "lunch",
    time: "2 horas",
    difficulty: "Difícil",
    calories: 600,
    ingredients: ["mondongo", "papa", "maní", "leche", "cebolla", "ajo", "yerbita"],
    steps: ["1. Cocina el mondongo hasta que suavice y pícalo.", "2. Licúa maní con leche.", "3. Haz un refrito y cocina las papas en cubos con el mondongo.", "4. Agrega la salsa de maní y cocina hasta espesar.", "5. Sirve con arroz y huevo duro."]
  },
  {
    id: 205,
    title: "Ceviche de Camarón",
    category: "lunch",
    time: "30 min",
    difficulty: "Fácil",
    calories: 320,
    ingredients: ["camarón", "limón", "naranja", "tomate", "cebolla", "salsa de tomate", "mostaza", "cilantro"],
    steps: ["1. Pasa los camarones por agua hirviendo 3 min. Enfríalos.", "2. Mezcla limón, naranja, salsa de tomate y mostaza.", "3. Pica cebolla y tomate.", "4. Junta todo con los camarones.", "5. Sirve con chifles o canguil."]
  },
  // 🌎 INTERNACIONAL
  {
    id: 301,
    title: "Pasta Carbonara Real",
    category: "dinner",
    time: "25 min",
    difficulty: "Medio",
    calories: 550,
    ingredients: ["pasta", "huevo", "queso", "tocino", "pimienta", "sal"],
    steps: ["1. Bate yemas de huevo con queso rallado y pimienta.", "2. Fríe el tocino hasta que dore.", "3. Cocina la pasta. Guarda un poco de agua.", "4. Mezcla pasta y tocino fuera del fuego.", "5. Añade la mezcla de huevo y un poco de agua. Revuelve rápido para crear crema."]
  },
  {
    id: 302,
    title: "Pollo al Curry",
    category: "lunch",
    time: "30 min",
    difficulty: "Fácil",
    calories: 450,
    ingredients: ["pollo", "cebolla", "leche", "ajo", "curry", "jengibre", "arroz"],
    steps: ["1. Dora cubos de pollo. Retira.", "2. Sofríe cebolla, ajo y jengibre.", "3. Añade polvo de curry.", "4. Pon leche (o leche de coco) y el pollo.", "5. Cocina 10 min hasta espesar. Sirve con arroz."]
  },
  {
    id: 303,
    title: "Tacos Caseros",
    category: "dinner",
    time: "25 min",
    difficulty: "Muy Fácil",
    calories: 400,
    ingredients: ["tortilla", "carne molida", "cebolla", "tomate", "limón", "aguacate", "comino", "carne"],
    steps: ["1. Haz un pico de gallo (tomate, cebolla, limón).", "2. Fríe la carne molida con comino y sal.", "3. Aplasta el aguacate.", "4. Calienta tortillas.", "5. Arma tus tacos."]
  },
  {
    id: 304,
    title: "Risotto de Champiñones",
    category: "dinner",
    time: "40 min",
    difficulty: "Difícil",
    calories: 500,
    ingredients: ["arroz", "champiñones", "caldo", "cebolla", "vino", "mantequilla", "queso"],
    steps: ["1. Mantén caldo caliente aparte.", "2. Sofríe cebolla y champiñones.", "3. Añade arroz y sofríe (nacarar).", "4. Añade vino y deja evaporar.", "5. Añade caldo poco a poco moviendo siempre.", "6. Al final, añade mantequilla y queso (mantecar)."]
  },
  {
    id: 305,
    title: "French Toast",
    category: "breakfast",
    time: "15 min",
    difficulty: "Fácil",
    calories: 350,
    ingredients: ["pan", "huevo", "leche", "canela", "azúcar", "mantequilla", "vainilla"],
    steps: ["1. Bate huevo, leche, vainilla y canela.", "2. Pasa el pan por la mezcla.", "3. Dora en sartén con mantequilla.", "4. Sirve con miel."]
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