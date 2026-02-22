  import styled from "styled-components";

  interface ButtonProps {
    $active: boolean;
  }

  export const FilterButton = styled.button<ButtonProps>`
    background-color: ${({ $active }) =>
      $active ? "rgb(25, 118, 210)" : "transparent"};
    color: ${({ $active }) => ($active ? "#000000ff" : "#555")};
  `;

    export const SortButton = styled.button<ButtonProps>`
    background-color: ${({ $active }) =>
      $active ? "rgb(25, 118, 210)" : "transparent"};
    // color: ${({ $active }) => ($active ? "#000000ff" : "#555")};
  `;
  