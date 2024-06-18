import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, fetchProducts } from "../../Redux/slices/productSlice";
import { AddProductModal } from "../Modal/AddProductModal";
import { ColorRing } from "react-loader-spinner";
import { fetchCategories } from "../../Redux/slices/categorySlice";

const ProductList = () => {

  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
 
  // for add product from productlist
  const handleAddProductClick = () => {
    setShowModal(true);
    dispatch(fetchCategories());
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  return (
    <div className="mt-3">
      <h2 className="productList">Product List</h2>
      {status === "loading" && (
        <div className="text-center">
        <ColorRing
          visible={true}
          height="60"
          width="60"
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
            <div className="col-10">
              <h4>Total Number Of Products: {products.length}</h4>
            </div>
            <div className="col-2 text-end mb-5">
              {user.user.role === "admin" && (
                <button
                  className="btn btn-primary mt-3"
                  onClick={handleAddProductClick}
                >
                  Add Product
                </button>
              )}
            </div>
          </div>

          <div className="row">
            {products.map((product) => (
              <div className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center" key={product._id}>
                <div className="card border rounded shadow mb-4 bg-body-tertiary rounded cards" style={{ width: "22rem" }}>
                  <img
                    src="https://m.economictimes.com/thumb/msid-100966456,width-1200,height-900,resizemode-4,imgsize-63314/why-become-a-product-manager.jpg"
                    className="card-img-top img-fluid"
                    alt="products"
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.name}</h5>
                    <hr />
                    <p>
                      Available colors:{" "}
                      {Array.isArray(product.colours) &&
                        product.colours.map((color, index) => (
                          <span key={index} className="px-2 mx-1" style={{backgroundColor: `${color}` , borderRadius:"50%", border:"1px dotted black"}}></span>
                        ))}
                    </p>
                    <hr />
                    <p>
                      Tags:{" "}
                      {Array.isArray(product.tags) &&
                        product.tags.map((tag, index) => (typeof tag === "string"&&
                          <span key={index} className="mx-1">{tag}</span>
                        ))}
                    </p>
                    <hr />
                    <p>created_on: {new Date(product.created_on).toString()}</p>
                    <hr />
                    <p>updated_on: {new Date(product.updated_on).toString()}</p>
                  </div>
                </div>
              </div>
            ))}
           
          </div>
        </>
      )}
      <AddProductModal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default ProductList;

