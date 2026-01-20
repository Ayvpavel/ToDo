import styled from "styled-components";

interface ButtonProps {
  $active: boolean;
}

export const FilterButton = styled.button<ButtonProps>`
  border: 2px solid #6a4343ff;
  background-color: ${({ $active }) => ($active ? "#4CAF50" : "transparent")};
  color: ${({ $active }) => ($active ? "#000" : "#555")};

  &:hover {
    background-color: ${({ $active }) => ($active ? "#45a049" : "#eee")};
  }
`;
