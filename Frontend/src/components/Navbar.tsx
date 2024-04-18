import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 1rem;
`;

const NavItem = styled.li`
  list-style: none;
  margin: 0 1rem;

  a {
    color: #fff;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: #bada55;
    }
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const MobileNavToggle = styled.button`
  display: block;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #bada55;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const DesktopNav = styled.ul`
  display: flex;
  flex-direction: row;

  @media (max-width: 767px) {
    display: none;
  }
`;

const MobileNav = styled.ul`
  display: none;
  flex-direction: column;
  margin: 0;
  padding: 0;

  @media (max-width: 767px) {
    display: flex;
  }
`;

type InscriptionlistProps = {
  logOut?: () => void;
 }

const NavBar = ({ logOut }: InscriptionlistProps) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);

  return (
    <Nav>
      <Logo>DaaraSchool</Logo>
      <MobileNavToggle onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
        {isMobileNavOpen ? 'Close' : 'Menu'}
      </MobileNavToggle>
      <DesktopNav>
        <NavItem><a href="/inscriptions">Inscriptions</a></NavItem>
        <NavItem><a href="/etudiants">Etudiants</a></NavItem>
        <NavItem><a href="/professeurs">Professeurs</a></NavItem>
        <NavItem><a href="/employes">Employés</a></NavItem>
        <NavItem><a href="/employes">Log out</a></NavItem>
      </DesktopNav>
      
      <MobileNav style={{ display: isMobileNavOpen ? 'flex' : 'none' }}>
        <NavItem><a href="/inscriptions">Inscriptions</a></NavItem>
        <NavItem><a href="/etudiants">Etudiants</a></NavItem>
        <NavItem><a href="/professeurs">Professeurs</a></NavItem>
        <NavItem><a href="/employes">Employés</a></NavItem>
        
      </MobileNav>
    </Nav>
  );
};
export default NavBar;