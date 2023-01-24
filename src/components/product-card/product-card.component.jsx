import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';
import {
  ProductCardContainer,
  Footer,
  FooterName,
  Price,
} from './product-card.styles';

export default function ProductCard({ product }) {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  function addProductToCart() {
    addItemToCart(product);
  }

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <FooterName>{name}</FooterName>
        <Price>{price}</Price>
      </Footer>
      <Button buttonType='inverted' onClick={addProductToCart}>
        Add to cart
      </Button>
    </ProductCardContainer>
  );
}
