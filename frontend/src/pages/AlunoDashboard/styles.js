import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

export const Menu = styled.nav`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  button {
    background: #e0e0e0;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 4px;
    transition: background 0.3s;

    &.active {
      background: #007bff;
      color: #fff;
    }

    &:hover {
      background: #c0c0c0;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.5rem;

    button {
      width: 100%;
    }
  }
`;

export const Content = styled.div`
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 4px;

  @media (max-width: 600px) {
    padding: 0.5rem;
  }
`;
