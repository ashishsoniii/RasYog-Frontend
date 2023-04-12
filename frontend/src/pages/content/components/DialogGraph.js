import React, { useState } from "react";
import styled from "styled-components";

const DialogContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5); /* semi-transparent black */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DialogBox = styled.div`
  background-color: #fff; /* white */
  position: relative;
  padding: 2rem;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;

  .close-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    cursor: pointer;
  }
`;

const CloseButton = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #999;
`;

const TransparentDialog = () => {
  const [showDialog, setShowDialog] = useState(true);

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(true);

  return (
    <>
      <button onClick={openDialog}>Open dialog</button>

      {showDialog && (
        <DialogContainer onClick={closeDialog}>
          <DialogBox onClick={(event) => event.stopPropagation()}>
            <CloseButton className="close-button" onClick={closeDialog}>
              &times;
            </CloseButton>
            <h2>Dialog Title</h2>
            <p>Dialog content goes here...</p>
            <button onClick={closeDialog}>Close dialog</button>
          </DialogBox>
        </DialogContainer>
      )}
    </>
  );
};

export default TransparentDialog;
