/* eslint-disable no-case-declarations */
// importo il React Hook 'useState' dalla libreria react.
import { useState } from 'react';
// import delle componenti dal progetto.
import Navbar from './components/Navbar.jsx';
import RecipeList from './components/RecipeList.jsx';
import RecipeDetails from './components/RecipeDetails.jsx';
import AddRecipe from './components/AddRecipe.jsx';
import SearchBar from './components/SearchBar.jsx';

const App = () => {

  // Stato per tenere traccia della pagina attualmente visualizzata (home, details, add-recipe).
  const [currentPage, setCurrentPage] = useState('home');

  // Stato essenziale per caricare l'elemento corretto dall'array basandosi sull'id specifico e mostrare i dettagli dell'elemento scelto.
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  // Stato per gestire il termine di ricerca.
  const [searchTerm, setSearchTerm] = useState(''); 

  // array delle ricette con alcune ricette aggiunte di default.
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      title: "Pasta alla Carbonara",
      ingredients: ["Pasta", "Uova", "Pancetta", "Pecorino Romano", "Pepe"],
      image: "https://www.shutterstock.com/shutterstock/photos/2415477653/display_1500/stock-photo-closeup-of-typical-pasta-alla-carbonara-a-traditional-roman-recipe-of-pasta-with-guanciale-2415477653.jpg",
      instructions: "Cucina la pasta. Prepara il condimento con pancetta e uova...",
    },
    {
      id: 2,
      title: "Tiramisu",
      ingredients: ["Mascarpone", "Uova", "Zucchero", "Caffè", "Savoiardi"],
      image: "https://www.shutterstock.com/shutterstock/photos/1725360061/display_1500/stock-photo-close-up-on-a-portion-of-gourmet-tiramisu-italian-dessert-topped-with-a-sprig-of-mint-served-on-a-1725360061.jpg",
      instructions: "Prepara il caffè. Mescola mascarpone, uova e zucchero...",
    }
  ]);

  // salvo il filtro in una costante ed applico dei filtri sull'array 'recipes', prima normalizzando i nomi a 'lowercase' e successivamene ricercando le ricette che iniziano con il termine di ricerca digitato.
  //applico la stessa logica alla ricerca per ingredienti, utilizzando poi il metodo 'SOME' per ricercare nell'array di stringhe 'ingredients' il primo elemento che soddisfa il filtro di ricerca usando il metodo 'startsWith'.
  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
    recipe.ingredients.some(ingredient => 
      ingredient.toLowerCase().startsWith(searchTerm.toLowerCase())
    )
  );

  // Funzione per la renderizzazione nella pagina del componente scelto tramite switch-case.
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        // Restituisco la search-bar e la lista delle ricette filtrate.
        // SearchBar > restituisco tramite la callback onSearch, il termine digitato e lo assegno alla variabile 'setSearchTerm', cosi da inizializzare la logica di filtraggio.
        // RecipeList > passo al componente 'RecipeList' la lista aggiornata e filtrata di ricette. Restituisco l'id dell'elemento cliccato dall'utente, tramite la callback onSelectRecipe, al quale assegna un nuovo id alla variabile 'setSelectedRecipeId' e imposta la pagina corrente a 'details'.
        return (
          <>
            <SearchBar onSearch={(term) => setSearchTerm(term)} />
            <RecipeList 
              recipes={filteredRecipes} 
              onSelectRecipe={(id) => {
                setSelectedRecipeId(id);
                setCurrentPage('details');
              }} 
            />
          </>
        );
      case 'details':
        // Quando triggerato il case 'details', ricerco la specifica ricette per ID. Carico la pagina 'RecipeDetails' passando l'oggetto 'recipe' specifico trovato precedentemente tramite ID corrispondente a quello selezionato.  
        const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId);
        return <RecipeDetails recipe={selectedRecipe} />;
      case 'add-recipe':
        // Restituisco tramite la callback 'onSaveRecipe' il nuovo oggetto 'newRecipe' e lo aggiungo all'interno dell elenco contente le ricette tramite la funzione 'setRecipes' la quale richiama la copia dell'array 'recipes' tramite lo spread-operator '...recipes' e aggiunge alla fine di esso il nuovo elemento, combinando i due in un nuovo array di ricette. Setto infine, la pagina ad 'home'.
        return <AddRecipe onSaveRecipe={(newRecipe) => {
          setRecipes([...recipes, newRecipe]);
          setCurrentPage('home');
        }} />;
      default:
        return <RecipeList />;
    }
  };

  return (
    <div>
      {/* utilizzo di 'onNavigate' come callback tramite il componente 'Navbar' per capire quale pagina è stata selezionata e dev'essere mostrata. */}
      <Navbar onNavigate={(page) => setCurrentPage(page)} />
      {/* rederizzazione del componente scelto tramite lo switch-case richiamando la funzione 'renderPage' */}
      <div className="container mx-auto p-4">
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
