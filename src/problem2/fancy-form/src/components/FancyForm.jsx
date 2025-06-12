import { useEffect, useState } from 'react';
import Select from './Select';

const FancyForm = () => {
    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [exchangeRates, setExchangeRates] = useState([]);
    const [result, setResult] = useState(null);

    useEffect(() => {
        fetch('https://interview.switcheo.com/prices.json')
            .then((res) => res.json())
            .then((data) => {
                setExchangeRates(data);
                const uniqueCurrencies = [...new Set(data.map(item => item.currency))];
                setCurrencies(uniqueCurrencies);
            });
    }, []);

    const handleSwap = () => {
        const fromRate = exchangeRates.find(rate => rate.currency === fromCurrency)?.price;
        const toRate = exchangeRates.find(rate => rate.currency === toCurrency)?.price;

        if (fromRate && toRate && amount) {
            const converted = (Number(amount) * fromRate) / toRate;
            setResult(converted.toFixed(6));
        } else {
            setResult('Invalid input');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">Currency Swap</h1>

            <Select
                label="From Currency"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                options={currencies}
                name="from"
            />

            <Select
                label="To Currency"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                options={currencies}
                name="to"
            />

            <div className="mb-4">
                <label className="block font-medium mb-1">Amount</label>
                <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>

            <button
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                onClick={handleSwap}
            >
                Swap
            </button>

            {result && (
                <div className="mt-4 text-center text-lg font-semibold">
                    Result: {result} {toCurrency}
                </div>
            )}
        </div>
    );
};

export default FancyForm;
