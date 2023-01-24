import {
  DirectoryItemContainer,
  BackgroundImage,
  Body,
} from './directory-item.styles';

export default function DirectoryItem({ category }) {
  const { title, imageUrl } = category;

  return (
    <DirectoryItemContainer>
      <BackgroundImage
        className='background-image'
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></BackgroundImage>
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
}
