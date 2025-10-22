import React from 'react';
import './BalanceScale.css';

const BalanceScale = ({ equation, userAnswer, feedback }) => {
  if (!equation) return null;

  const calculateLeftSide = () => {
    if (userAnswer !== null && userAnswer !== undefined) {
      // Calculate left side with user's answer
      const variable = equation.variables.find(v => v.name === 'x');
      if (variable) {
        return variable.coefficient * userAnswer + equation.constants
          .filter(c => c.side === 'left')
          .reduce((sum, c) => sum + c.value, 0);
      }
    }
    return equation.constants
      .filter(c => c.side === 'left')
      .reduce((sum, c) => sum + c.value, 0);
  };

  const calculateRightSide = () => {
    return equation.constants
      .filter(c => c.side === 'right')
      .reduce((sum, c) => sum + c.value, 0);
  };

  const leftValue = calculateLeftSide();
  const rightValue = calculateRightSide();
  const isBalanced = Math.abs(leftValue - rightValue) < 0.001;

  const getScaleTilt = () => {
    if (leftValue > rightValue) return 'left';
    if (rightValue > leftValue) return 'right';
    return 'balanced';
  };

  const tilt = getScaleTilt();

  return (
    <div className="balance-scale-container">
      <div className="scale-labels">
        <div className="side-label left">Left Side</div>
        <div className="side-label right">Right Side</div>
      </div>
      
      <div className={`balance-scale ${tilt}`}>
        <div className="scale-base">
          <div className="scale-pivot"></div>
        </div>
        
        <div className="scale-arm">
          <div className="scale-left">
            <div className="weight-container">
              <div className="weight left-weight">
                <div className="weight-value">{leftValue.toFixed(1)}</div>
                <div className="weight-label">
                  {equation.variables.find(v => v.name === 'x')?.coefficient || 1}x
                  {equation.constants
                    .filter(c => c.side === 'left')
                    .map(c => c.value > 0 ? ` + ${c.value}` : ` ${c.value}`)
                    .join('')}
                </div>
              </div>
            </div>
          </div>
          
          <div className="scale-right">
            <div className="weight-container">
              <div className="weight right-weight">
                <div className="weight-value">{rightValue.toFixed(1)}</div>
                <div className="weight-label">
                  {equation.constants
                    .filter(c => c.side === 'right')
                    .map(c => c.value)
                    .join(' + ')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="balance-status">
        {feedback && (
          <div className={`status-message ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
            {feedback.isCorrect ? (
              <div>
                <div className="status-icon">✅</div>
                <div>Perfect! The equation is balanced!</div>
              </div>
            ) : (
              <div>
                <div className="status-icon">❌</div>
                <div>Not quite right. Keep trying!</div>
              </div>
            )}
          </div>
        )}
        
        {!feedback && (
          <div className="status-message neutral">
            <div className="status-icon">⚖️</div>
            <div>
              {isBalanced 
                ? "The equation is balanced!" 
                : tilt === 'left' 
                  ? "Left side is heavier" 
                  : "Right side is heavier"
              }
            </div>
          </div>
        )}
      </div>

      {userAnswer !== null && userAnswer !== undefined && (
        <div className="calculation-display">
          <h4>Your Calculation:</h4>
          <div className="calculation-steps">
            <div className="step">
              <strong>Left side:</strong> {equation.variables.find(v => v.name === 'x')?.coefficient || 1} × {userAnswer} 
              {equation.constants
                .filter(c => c.side === 'left')
                .map(c => c.value > 0 ? ` + ${c.value}` : ` ${c.value}`)
                .join('')} = {leftValue.toFixed(1)}
            </div>
            <div className="step">
              <strong>Right side:</strong> {rightValue.toFixed(1)}
            </div>
            <div className="step result">
              <strong>Result:</strong> {leftValue.toFixed(1)} {isBalanced ? '=' : leftValue > rightValue ? '>' : '<'} {rightValue.toFixed(1)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BalanceScale;
