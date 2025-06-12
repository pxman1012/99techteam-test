import React from 'react';

const Select = ({ label, value, onChange, options, name }) => {
    return (
        <div className="mb-4">
            {label && <label className="block font-medium mb-1">{label}</label>}
            <div className="relative">
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full p-2 pr-10 border rounded appearance-none bg-white"
                >
                    <option value="">Select</option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>

                {/* Mũi tên dropdown */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Select;
