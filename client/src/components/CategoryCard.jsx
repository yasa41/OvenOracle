import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/catalog?category=${category.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
        <div className="aspect-video bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
          <h3 className="text-2xl font-bold text-gray-800 group-hover:text-red-600 transition">
            {category.name}
          </h3>
        </div>
        {category.description && (
          <div className="p-4">
            <p className="text-sm text-gray-600">{category.description}</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CategoryCard;

