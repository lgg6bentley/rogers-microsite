import { useEffect, useState } from 'react';
import ParkMap from './ParkMap';

interface Park {
  PARK_NAME: string;
  REGION_NAME: string;
  CLASSIFICATION: string;
  latitude: number;
  longitude: number;
}

export default function ParksPage() {
  const [parks, setParks] = useState<Park[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const filtered = parks.filter((park) =>
    park.PARK_NAME.toLowerCase().includes(searchQuery.toLowerCase()) ||
    park.REGION_NAME.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetch('/parks/merged.json')
      .then((res) => res.json())
      .then((data) => {
        setParks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching parks:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log('Fetched parks:', parks);
  }, [parks]);

  useEffect(() => {
    console.log('Filtered parks:', filtered);
  }, [filtered]);

  return (
    <>
      {/* Simple Custom Banner */}
      <div className="bg-forest text-white py-12 px-6 text-center">
        <h1 className="text-4xl font-bold font-display mb-2">
          Discover Ontario’s Natural Beauty
        </h1>
        <p className="text-lg">
          Find parks by name or region and plan your next outdoor adventure.
        </p>
      </div>

      <div className="min-h-screen bg-gradient-to-b from-sand to-white p-6">
        <h2 className="text-3xl font-display text-forest mb-6">
          Explore Ontario’s Provincial Parks
        </h2>

        <input
          type="text"
          placeholder="Search by park or region..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-forest p-2 mb-6 w-full rounded"
        />

        {loading ? (
          <p className="text-forest">Loading parks...</p>
        ) : filtered.length === 0 ? (
          <p className="text-forest">No parks found matching your search.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {filtered.map((park) => (
                <li
                  key={park.PARK_NAME}
                  className="bg-sand border-l-4 border-forest p-4 rounded shadow hover:shadow-md transition"
                >
                  <h3 className="text-xl font-semibold text-forest">{park.PARK_NAME}</h3>
                  <p className="text-sm text-gray-700">
                    {park.REGION_NAME} | {park.CLASSIFICATION}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-10 border border-forest rounded overflow-hidden shadow-md">
              <ParkMap parks={filtered} />
            </div>
          </>
        )}
      </div>
    </>
  );
}