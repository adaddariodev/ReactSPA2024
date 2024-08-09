import PropTypes from "prop-types";

const RecipeList = ({ recipes, onSelectRecipe }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {recipes.map(recipe => (
        <div 
          key={recipe.id} 
          onClick={() => onSelectRecipe(recipe.id)}
          className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
        >
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-48 object-cover" 
          />
          <div className="p-4">
            <h3 className="font-bold text-lg">{recipe.title}</h3>
            <p className="text-gray-700">{recipe.ingredients.join(", ")}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// PropTypes Validation
RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelectRecipe: PropTypes.func.isRequired,
};

export default RecipeList;