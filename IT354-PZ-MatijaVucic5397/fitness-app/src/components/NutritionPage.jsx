import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const NutritionPage = () => {
    const { user } = useContext(AuthContext);
    const [nutritionPlan, setNutritionPlan] = React.useState(null);

    useEffect(() => {
        const fetchNutrition = async () => {
            if (!user?.id) return;
            try {
                const response = await axios.get(`http://localhost:3001/nutritionPlans?clientId=${user.id}`);
                setNutritionPlan(response.data[0] || null);
            } catch (error) {
                console.error('Greška pri dohvatanju plana ishrane:', error);
            }
        };
        fetchNutrition();
    }, [user?.id]);

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Moja Ishrana</h2>
            {nutritionPlan ? (
                <>
                    <p><strong>Tip:</strong> {nutritionPlan.calories}</p>
                    <div className="space-y-6 mt-4">
                        <div>
                            <h3 className="text-xl font-bold">Recept 1</h3>
                            Ovsena kaša sa voćem <br />
                            <div className="mt-2">

                                U šolju mleka (biljnog ili običnog) dodaj 4 kašike ovsenih pahuljica i kuvaj 5 minuta. Kada se zgusne, skini sa vatre i dodaj kašičicu meda. Umiješaj šaku seckanih jagoda i pola banane. Po želji dodaj malo cimeta ili oraha. <br />
                                <h3 className="text-xl font-bold">Recept 2</h3>
                                Pileći file sa brokolijem <br />
                                <div className="mt-2"></div>
                                Pileći file posoli, pobiberi i ispeci na maslinovom ulju 5-6 minuta sa svake strane. U međuvremenu skuvaj brokoli na pari 7 minuta da ostane hrskav. Sve serviraj zajedno i prelij limunovim sokom. Dodaj malo maslinovog ulja preko brokolija za puniji ukus. <br />
                                <h3 className="text-xl font-bold">Recept 3</h3>
                                Proteinski smoothie <br />
                                <div className="mt-2"></div>
                                U blender ubaci jednu bananu, šaku spanaća, 1 kašiku kikiriki putera i 2 dl bademovog mleka. Po želji dodaj i malo proteina u prahu. Blendaj dok ne postane kremasto. Odličan je za doručak ili obrok posle treninga. <br />
                                <h3 className="text-xl font-bold">Recept 4</h3>
                                Pečeni losos sa povrćem <br />
                                <div className="mt-2"></div>
                                Losos začini limunom, belim lukom i maslinovim uljem. Stavi ga u rernu na 200°C i peci 15 minuta. U međuvremenu iseci tikvicu, papriku i šargarepu i kratko ih ispeci na tiganju. Sve serviraj toplo i pospi sa malo peršuna. <br />
                                Pileći file sa brokolijem <br />
                                <h3 className="text-xl font-bold">Recept 5</h3>
                                Humus i integralni tost <br />
                                <div className="mt-2"></div>
                                U blender stavi 1 konzervu leblebija, 1 kašiku tahinija, sok od 1 limuna i 1 čen belog luka. Blendaj dok ne dobiješ glatku pastu, dodaj malo maslinovog ulja i vode po potrebi. Namaži humus na integralni tost ili koristi kao dip za šargarepu. Lagan, zdrav i zasitan obrok. <br />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Nema dodeljenog plana ishrane.</p>
            )}
        </div>
    );
};

export default NutritionPage;