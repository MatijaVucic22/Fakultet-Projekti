import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const TrainingPage = () => {
    const { user } = useContext(AuthContext);
    const [training, setTraining] = React.useState(null);

    useEffect(() => {
        const fetchTraining = async () => {
            if (!user?.id) return;
            try {
                const response = await axios.get(`http://localhost:3001/trainings?clientId=${user.id}`);
                setTraining(response.data[0] || null);
            } catch (error) {
                console.error('Greška pri dohvatanju treninga:', error);
            }
        };
        fetchTraining();
    }, [user?.id]);

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Moji Treninzi</h2>
            {training ? (
                <>
                    <p><strong>Tip:</strong> {training.frequency}</p>
                    <div className="space-y-6 mt-4">
                        <div>
                            <h3 className="text-xl font-bold">Kruzni trening</h3>
                            <p>Trening za celo telo</p>
                            <div className="mt-2">
                                <p>
                                    3 radnih serija za grudi <br />
                                    4 radnih serija za ledja <br />
                                    5 radnih serija za ramena <br />
                                    4 radnih serija za noge <br />
                                    2 radne serija za biceps <br />
                                    2 radne serije za triceps
                                </p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Upper trening</h3>
                            <p>Trening za gornji deo tela</p>
                            <div className="mt-2">
                                4 radnih serija za grudi <br />
                                5 radnih serija za ledja <br />
                                5 radnih serija za ramena <br />
                                2 radne serija za biceps <br />
                                2 radne serije za triceps
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Lower trening</h3>
                            <p>Trening za donji deo tela i stomak</p>
                            <div className="mt-2">
                                6 radnih serija za noge <br />
                                3 radnih serija za donja ledja <br />
                                3 radnih serija za listove <br />
                                5 radnih serija za stomak 
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Push trening</h3>
                            Trening za grudi, triceps , prednje i srednje rame
                            <div className="mt-2">
                                5 radnih serija za grudi <br />
                                3 radnih serija za prednje rame <br />
                                3 radnih serija za srednje rame <br />
                                2 radne serije za triceps
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Pull trening</h3>
                            Trening za ledja, biceps i zadnje rame
                            <div className="mt-2">
                                6 radnih serija za ledja <br />
                                3 radnih serija za zadnje rame <br />
                                3 radne serije za biceps
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Leg trening</h3>
                            Trening nogu i stomaka
                            <div className="mt-2">
                                4 radnih serija za kvadriceps <br />
                                3 radnih serija za zadnju lozu <br />
                                3 radne serije za listove <br />
                                4 radne serije za stomak
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Nema dodeljenog plana treninga.</p>
            )}
        </div>
    );
};

export default TrainingPage;