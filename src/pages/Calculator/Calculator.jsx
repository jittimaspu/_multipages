import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
    const [inputValue, setInputValue] = useState('');
    const [currentOperator, setCurrentOperator] = useState(null);
    const [lastValue, setLastValue] = useState(null);
    const [clearButtonLabel, setClearButtonLabel] = useState('CE');

    const handleNumberInput = (value) => {
        setInputValue((prev) => (prev === '' ? value : prev + value));
        setClearButtonLabel('C');
    };

    const handleOperatorInput = (operator) => {
        if (inputValue === '') return;
        setLastValue(inputValue);
        setCurrentOperator(operator);
        setInputValue('');
    };

    const handleClearInput = () => {
        if (clearButtonLabel === 'C') {
            setInputValue((prev) => prev.slice(0, -1));
            if (inputValue.length <= 1) {
                setClearButtonLabel('CE');
            }
        } else {
            setInputValue('');
            setCurrentOperator(null);
            setLastValue(null);
            setClearButtonLabel('CE');
        }
    };

    const handleCalculation = () => {
        if (!currentOperator || lastValue === null) return;
        const newValue = parseFloat(inputValue);
        const prevValue = parseFloat(lastValue);

        let result;
        switch (currentOperator) {
            case '+':
                result = prevValue + newValue;
                break;
            case '-':
                result = prevValue - newValue;
                break;
            case '×':
                result = prevValue * newValue;
                break;
            case '÷':
                result = prevValue / newValue;
                break;
            default:
                return;
        }

        setInputValue(result.toString());
        setCurrentOperator(null);
        setLastValue(null);
        setClearButtonLabel('CE');
    };

    return (
        <div className='calculator-container'>
            <div className="calculator-panel">
                <input type="text" id="display" value={inputValue} disabled />
                <div className="buttons">
                    <div>
                        <button className="button-input operator" disabled>MC</button>
                        <button className="button-input operator" disabled>MR</button>
                        <button className="button-input operator" disabled>M+</button>
                        <button className="button-input operator" disabled>M-</button>
                        <button className={"button-input " + (clearButtonLabel === 'CE' ? 'clear-mode' : 'backspace-mode')} onClick={handleClearInput}>{clearButtonLabel}</button>
                    </div>
                    <div>
                        <button className="button-input number" onClick={() => handleNumberInput('7')}>7</button>
                        <button className="button-input number" onClick={() => handleNumberInput('8')}>8</button>
                        <button className="button-input number" onClick={() => handleNumberInput('9')}>9</button>
                        <button className="button-input operator" onClick={() => handleOperatorInput('÷')}>÷</button>
                        <button className="button-input operator" disabled>√</button>
                    </div>
                    <div>
                        <button className="button-input number" onClick={() => handleNumberInput('4')}>4</button>
                        <button className="button-input number" onClick={() => handleNumberInput('5')}>5</button>
                        <button className="button-input number" onClick={() => handleNumberInput('6')}>6</button>
                        <button className="button-input operator" onClick={() => handleOperatorInput('×')}>×</button>
                        <button className="button-input operator" disabled>%</button>
                    </div>
                    <div>
                        <button className="button-input number" onClick={() => handleNumberInput('1')}>1</button>
                        <button className="button-input number" onClick={() => handleNumberInput('2')}>2</button>
                        <button className="button-input number" onClick={() => handleNumberInput('3')}>3</button>
                        <button className="button-input operator" onClick={() => handleOperatorInput('-')}>-</button>
                        <button className="button-input operator" disabled>1/x</button>
                    </div>
                    <div>
                        <button className="button-input number" onClick={() => handleNumberInput('0')}>0</button>
                        <button className="button-input number" onClick={() => handleNumberInput('.')}>.</button>
                        <button className="button-input operator" disabled>+/-</button>
                        <button className="button-input operator" onClick={() => handleOperatorInput('+')}>+</button>
                        <button className="button-input operator" onClick={handleCalculation}>=</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
