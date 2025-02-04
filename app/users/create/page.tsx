'use client'; // This marks this file as a Client Component
import React, {useState} from 'react';
import Form from 'next/form'
import {useCreateUserMutation} from "@/app/hooks/useCreateUserMutation";
import {useRouter} from "next/navigation";

export default function CreateUser() {
    const router = useRouter();

    const {mutateAsync, isError, error, isSuccess, isPending} = useCreateUserMutation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [zipCode, setZipCode] = useState(undefined);
    const [instruments, setInstruments] = useState<string[]>([]);
    const [genres, setGenres] = useState<string[]>([]);

    const createNewUser = async (formData: FormData) => {
        event.preventDefault();
        try {
            await mutateAsync({
                firstName: firstName,
                lastName: lastName,
                zipCode: zipCode,
                instruments: instruments,
                genres: genres,
            });
        } catch (error) {
            console.error('Error creating user:', error);
        }
        console.log('all good')
    }
    const instrumentsForNow = ['guitar', 'bass Guitar', 'drums']
    const genresForNow = ['pop', 'rock', 'metal']
    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
        >
            <main className="flex flex-col gap-8 row-start-2 items-center">
                <Form action={createNewUser}>
                    <label htmlFor="firstName">First name:</label><br/>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="firstName"
                        name="firstName"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Spacer/>
                    <label htmlFor="lastName">Last name:</label><br/>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="lastName"
                        name="lastName"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <Spacer/>
                    <label htmlFor="zipCode">Zipcode:</label><br/>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                    <Spacer/>
                    Instruments:
                    <ListInstruments instrumentsForNow={instrumentsForNow} instruments={instruments}
                                     setInstruments={setInstruments}/>
                    <Spacer/>
                    Genres:
                    <ListGenres genresForNow={genresForNow} genres={genres} setGenres={setGenres}/>
                    <br/>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={isPending}
                    >{isSuccess ? 'Created' : 'Create'}
                    </button>
                    {isError && <p>Error: {error.message}</p>}
                </Form>
                <div>
                    <button
                        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                        onClick={() => router.push('/')}
                    >
                        Back to home
                    </button>
                </div>
            </main>
            <div className="flex gap-4 items-center flex-col sm:flex-row">

            </div>
        </div>
    )
}

type ListInstrumentsProps = {
    instrumentsForNow: string[];
    instruments: string[];
    setInstruments: React.Dispatch<React.SetStateAction<string[]>>;
};

type ListGenresProps = {
    genresForNow: string[];
    genres: string[];
    setGenres: React.Dispatch<React.SetStateAction<string[]>>;
};

const ListInstruments: React.FC<ListInstrumentsProps> = ({instrumentsForNow, instruments, setInstruments}) => {
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInstruments((prev) =>
            prev.includes(value) ? prev.filter((instrument) => instrument !== value) : [...prev, value]
        );
    };

    return (
        <div>
            {instrumentsForNow.map((instrument) => (
                <div key={instrument}>
                    <input
                        type="checkbox"
                        id={instrument}
                        name="pickedInstruments"
                        value={instrument}
                        checked={instruments.includes(instrument)}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor={instrument}> {instrument} </label><br/>
                </div>
            ))}
        </div>
    );
};


const ListGenres: React.FC<ListGenresProps> = ({genresForNow, genres, setGenres}) => {
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setGenres((prev) =>
            prev.includes(value) ? prev.filter((genre) => genre !== value) : [...prev, value]
        );
    };

    return (
        <div>
            {genresForNow.map((genre) => (
                <div key={genre}>
                    <input
                        type="checkbox"
                        id={genre}
                        name="pickedGenres"
                        value={genre}
                        checked={genres.includes(genre)}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor={genre}> {genre} </label><br/>
                </div>
            ))}
        </div>
    );
};

function Spacer() {
    return (
        <div>
            <br/>
            <br/>
        </div>
    )
}