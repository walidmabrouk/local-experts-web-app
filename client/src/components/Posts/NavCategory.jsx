import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../../redux/actions/categoryActions';

function NavCategory() {
    const dispatch = useDispatch();
    useEffect(async () => {
      await dispatch(await fetchCategories());
    }, []);

  const categories = useSelector((state) => state.categories.categories);
  return (
    <div
      className="nav-header pl-32 md:pl-32 pr-6 lg:pl-6"
      style={{ "grid-column": "span 3/span 3" }}
    >
      <div className="nav3">
        <div className="category-nav">
          <div className="category-title">Rechercher Selon Categories</div>
          {categories.map((category) => (
            <div className="category">
              <Link
                to={`/posts/category/${category.title}`}
                className="sidebar-link"
              >
                {category.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NavCategory