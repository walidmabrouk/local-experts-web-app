import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../../redux/actions/categoryActions';
import anime from "animejs";
function NavCategory() {
  const dispatch = useDispatch();
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    const changeCategory = () => {
      setCurrentCategoryIndex((prevIndex) => {
        if (prevIndex === categories.length - 1) {
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
    };

    const interval = setInterval(changeCategory, 8000);

    return () => {
      clearInterval(interval);
    };
  }, [categories]);

  useEffect(() => {
    const categoryElements = document.querySelectorAll(".category");

    anime({
      targets: categoryElements,
      duration: 500,
      easing: "linear",
    });
  }, [currentCategoryIndex]);

  const displayCategories = categories.slice(
    currentCategoryIndex,
    currentCategoryIndex + 7
  );

  return (
    <div
      className="nav-header pl-32 md:pl-32 pr-6 lg:pl-6"
      style={{ gridColumn: "span 3/span 3" }}
    >
      <div className="nav3">
        <div className="category-nav">
          <div className="category-title">Rechercher Selon Catégories</div>
          {displayCategories.map((category, index) => (
            <div className="category" key={index}>
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