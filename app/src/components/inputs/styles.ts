import styled from 'styled-components';

export const InputGroup = styled.div`
  margin-bottom: 24px;
  text-align: left;
`;

export const InputTitle = styled.label`
  display: inline-block;
  margin-bottom: 0.5rem;
  color: #888888;
`;

export const StyledInput = styled.input`
  width: 100%;
  outline: none;
  padding: 8px 16px;
  border: 1px solid #e0e6e8;
  border-radius: 4px;
  font-size: 1rem;
  color: #888888;
  transition: box-shadow 0.2s;
  &::placeholder {
    color: #dedede;
  }
  &:focus {
    box-shadow: 0 0 0 2px rgba(255, 122, 145, 0.7);
  }
`;
