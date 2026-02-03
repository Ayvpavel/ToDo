  import styled from "styled-components";

  interface ButtonProps {
    $active: boolean;
  }

  export const FilterButton = styled.button<ButtonProps>`
    background-color: ${({ $active }) =>
      $active ? "rgb(60, 0, 255)" : "transparent"};
    color: ${({ $active }) => ($active ? "#000000ff" : "#555")};
  `;
