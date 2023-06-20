import { Inter } from 'next/font/google';
import { useState } from 'react';
import { add } from '../components/services/Location';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    const [username, setUsername] = useState('');
    const [start, setStart] = useState('canteen');
    const [end, setEnd] = useState('bh4');

    const [isMaxLengthError, setIsMaxLengthError] = useState(false);
    const [isMinLengthError, setIsMinLengthError] = useState(false);

    const onInputChangeHandler = (label, event) => {
        event.preventDefault();
        const value = event.target.value;

        if (label === 'username') {
            setIsMaxLengthError(false);
            setIsMinLengthError(false);

            if (value.length < 3) {
                setIsMinLengthError(true);
            } else if (value.length > 12) {
                setIsMaxLengthError(true);
            }

            setUsername(value);
        } else if (label === 'start') {
            setStart(value);
        } else if (label === 'end') {
            setEnd(value);
        }
    };

    const onSubmitHandler = async () => {
        if (
            username &&
            !isMaxLengthError &&
            !isMinLengthError &&
            start &&
            end
        ) {
            console.log(username);
            console.log(start);
            console.log(end);
            const result = await add({ username, start, end });
            setUsername('');
            console.log(result);
        } else {
            alert('Missing Some Values');
        }
    };

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
            <h1>Drone Delivery</h1>

            <div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(event) =>
                            onInputChangeHandler('username', event)
                        }
                    />
                    {isMinLengthError ? (
                        <div className="invalid-feedback">
                            Min length should be 3 characters.
                        </div>
                    ) : null}
                    {isMaxLengthError ? (
                        <div className="invalid-feedback">
                            Max length should be 12 characters.
                        </div>
                    ) : null}
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="username">
                        Pickup Location
                    </label>
                    <select
                        className="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                        value={start}
                        onChange={(event) =>
                            onInputChangeHandler('start', event)
                        }>
                        <option value="">Select Pickup Location</option>
                        <option value="canteen">Canteen</option>
                        <option value="BH1">BH1</option>
                        <option value="BH2">BH2</option>
                        <option value="BH3">BH3</option>
                        <option value="BH4">BH4</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="username">
                        Delivery Location
                    </label>
                    <select
                        className="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                        value={end}
                        onChange={(event) =>
                            onInputChangeHandler('end', event)
                        }>
                        <option value="BH1">BH1</option>
                        <option value="BH2">BH2</option>
                        <option value="BH3">BH3</option>
                        <option value="BH4">BH4</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="username">
                        Delivery Status:
                    </label>
                    <span>PENDING</span>
                </div>
            </div>

            <button
                onClick={onSubmitHandler}
                disabled={!username || !start || !end}
                type="button"
                className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                Create
            </button>
        </main>
    );
}
