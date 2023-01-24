import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from './button.styles';

const BUTTON_TYPE_CLASSES = {
  base: BaseButton,
  google: GoogleSignInButton,
  inverted: InvertedButton,
};

function getButton(buttonType = 'base') {
  return BUTTON_TYPE_CLASSES[buttonType];
}

export default function Button({ children, buttonType, ...otherProps }) {
  const CustomButton = getButton(buttonType);
  return <CustomButton {...otherProps}>{children}</CustomButton>;
}
