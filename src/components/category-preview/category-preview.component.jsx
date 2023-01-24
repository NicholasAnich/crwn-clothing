import ProductCard from '../product-card/product-card.component';
import {
  Preview,
  PreviewContainer,
  PreviewTitle,
} from './category-preview.styles.jsx';

import React from 'react';

export default function CategoryPreview({ title, products }) {
  return (
    <PreviewContainer>
      <h2>
        <PreviewTitle to={title}>{title.toUpperCase()}</PreviewTitle>
      </h2>
      <Preview>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </PreviewContainer>
  );
}
