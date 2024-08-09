import PropTypes from 'prop-types';

const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div 
      onClick={onClick} 
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      <img 
        src={recipe.image} 
        alt={recipe.title} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800">{recipe.title}</h3>
        <p className="text-gray-600 mt-2">
          {recipe.ingredients.slice(0, 3).join(", ")}...
        </p>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RecipeCard;
