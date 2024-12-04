import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const HeaderContainer = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '188px',
  backgroundImage: 'url("/restaurant-bg2.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  zIndex: 1,
});

const Header = () => <HeaderContainer />;

export default Header;