import React from 'react';
import styled from 'styled-components';

const Pattern = () => {
  return (
    <StyledWrapper>
      <div className="container">
        <div className="pattern-bg">
          <svg preserveAspectRatio="xMidYMid slice" height="100%" width="100%" className="cube-svg" viewBox="0 0 120 104">
            <defs>
              <linearGradient y2="100%" x2="100%" y1="0%" x1="0%" id="cube-dark">
                <stop stopColor="#232526" offset="0%" />
                <stop stopColor="#414345" offset="100%" />
              </linearGradient>
              <linearGradient y2="0%" x2="100%" y1="100%" x1="0%" id="cube-mid">
                <stop stopColor="#4b6cb7" offset="0%" />
                <stop stopColor="#182848" offset="100%" />
              </linearGradient>
              <linearGradient y2="100%" x2="0%" y1="0%" x1="100%" id="cube-light">
                <stop stopColor="#a8edea" offset="0%" />
                <stop stopColor="#fed6e3" offset="100%" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    background: #181c21;
    width: 100%;
    height: 100%;
    margin: 0;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
  }

  .pattern-bg {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: repeating-linear-gradient(
      135deg,
      #232526 0px,
      #232526 60px,
      #23252699 70px,
      #414345 130px
    );
  }

  .cube-svg {
    position: absolute;
    width: 200%;
    height: 200%;
    left: -30%;
    top: -20%;
    background: transparent;
    opacity: 0.7;
    z-index: 1;
    animation: cubeMove 18s linear infinite alternate;
  }

  @keyframes cubeMove {
    from {
      transform: translateY(0) scale(1);
    }
    to {
      transform: translateY(-20%) scale(1.02) rotate(1deg);
    }
  }`;

export default Pattern;
