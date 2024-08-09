/* eslint-disable no-case-declarations */
import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import RecipeList from './components/RecipeList.jsx';
import RecipeDetails from './components/RecipeDetails.jsx';
import AddRecipe from './components/AddRecipe.jsx';
import SearchBar from './components/SearchBar.jsx';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home'); // Stato per tenere traccia della pagina attualmente visualizzata (home, details, add-recipe).
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Stato per gestire il termine di ricerca
  // creazione delle ricette di default
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

  // Funzione per la renderizzazione della pagina scelta tramite switch-case.
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        const filteredRecipes = recipes.filter(recipe =>
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.ingredients.some(ingredient => 
            ingredient.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
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
        const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId);
        return <RecipeDetails recipe={selectedRecipe} />;
      case 'add-recipe':
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
      <div className="container mx-auto p-4">
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
