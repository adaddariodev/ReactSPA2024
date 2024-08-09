import PropTypes from 'prop-types';

const RecipeDetails = ({ recipe }) => {
  if (!recipe) {
    return <p className="text-center text-gray-500">Recipe not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h2>
      <img 
        src={recipe.image} 
        alt={recipe.title} 
        className="w-full h-64 object-cover rounded-md mb-6" 
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Ingredients</h3>
      <ul className="list-disc pl-5 mb-6">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className="text-gray-700">{ingredient}</li>
        ))}
      </ul>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Instructions</h3>
      <p className="text-gray-700 leading-relaxed">{recipe.instructions}</p>
    </div>
  );
};

RecipeDetails.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    instructions: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  })
};

export default RecipeDetails;
