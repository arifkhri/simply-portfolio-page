import api from '../core/fetch'

const getProducts = () => {
  const { get } = api();

  return get('/products');
}


const getProductDetail = (id) => {
  const { get } = api();

  return get(`/products/${id}`);
}

const productsApi = { getProducts, getProductDetail };
export default productsApi;

