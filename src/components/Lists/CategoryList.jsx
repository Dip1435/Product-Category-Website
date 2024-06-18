import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../Redux/slices/categorySlice";
import { AddProductModal } from "../Modal/AddProductModal";
import { ColorRing } from "react-loader-spinner";

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.categories);

  const [showModal, setShowModal] = useState(false);

  // state for categoryId
  const [catId, setCatId] = useState("");

  // state for categoryName
  const [catName, setCatName] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch, showModal]);

  // for handle add products
  const handleAddProductClick = (id, name) => {
    setShowModal(true);
    setCatId(id);
    setCatName(name);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {status === "loading" && (
        <div className="text-center">

        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#9A616D"]}
          />
          </div>
      )}

      {status === "succeeded" && (
        <>
          <div className="row">
            <h2>Category List</h2>
          </div>
          {categories.map((category) => (
            <div className="card text-center mb-4" key={category._id}>
              <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                <p className="card-text">
                  <b>Number Of Products :-</b> {category.products}
                </p>
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => handleAddProductClick(category._id, category.name)}
                >
                  Add Product
                </button>
              </div>
              <div className="card-footer text-body-secondary">
                <p>created_on : {new Date(category.created_on).toString()}</p>
                <p>updated_on : {new Date(category.updated_on).toString()}</p>
              </div>
            </div>
          ))}
        </>
      )}
      <AddProductModal
        show={showModal}
        handleClose={handleCloseModal}
        catId={catId}
        catName={catName}
      />
    </div>
  );
};

export default CategoryList;
