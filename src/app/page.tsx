"use client";
import { Fragment, useEffect, useState } from 'react';
import fetchData from '@/data/fetchData';
import { MdLocationOn, MdPower, MdWifi, MdSpeed, MdVolumeUp, MdAccessTime, MdMap, MdNotes, MdExpandLess, MdExpandMore } from 'react-icons/md';
import { FaInstagram } from 'react-icons/fa';
import { BiCoffeeTogo } from 'react-icons/bi';
import type { VenueData } from '@/data/types';
import ReactMarkdown from 'react-markdown';

const IndexPage = () => {
  const [data, setData] = useState<Record<string, VenueData[]> | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  useEffect(() => {
    fetchData()
      .then((data: any) => {
        setData(data)
      })
  }, [])
  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
  };

  const getVenuesByCity = (city: string) => {
    if (!data) return [];
    return data[city] || [];
  };

  const [expandedNotes, setExpandedNotes] = useState<number | null>(null);

  const toggleExpandedNotes = (venueIndex: number) => (
    expandedNotes === venueIndex ? setExpandedNotes(null) : setExpandedNotes(venueIndex)
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl text-brown-light mb-4">
        Çalışma Mekanları <BiCoffeeTogo className="inline-block" />
      </h1>
      <select
        onChange={handleCityChange}
        className="w-full p-2 mb-4 border border-brown-dark rounded bg-brown-light text-brown-dark"
      >
        {data ? (
          <>
            <option value="">Şehir seçiniz</option>
            {Object.keys(data).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </>
        ) : (
          <option value="">Şehirler yükleniyor...</option>
        )}
      </select>
      {selectedCity && (
        <div>
          <h2 className="text-2xl text-brown-light mb-4">
            <div className="flex items-center">
              <MdLocationOn className="mr-1" /> {selectedCity} şehrindeki çalışma mekanları
            </div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {getVenuesByCity(selectedCity).map((venue, index) => (
              <div key={index} className="p-4 border rounded bg-brown-light text-brown-dark">
                <strong>{venue.isim}</strong>
                {venue.konum && (
                  <p>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <MdLocationOn className="mt-1" />
                      </div>
                      <div className="ml-1 ">
                        <span className='font-medium'>Konum: </span> {venue.konum}
                      </div>
                    </div>
                  </p>
                )}
                {venue.priz && (
                  <p>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <MdPower className="mt-1" />
                      </div>
                      <div className="ml-1 ">
                        <span className='font-medium'>Priz: </span> {venue.priz}
                      </div>
                    </div>
                  </p>
                )}
                {venue.wifi && (
                  <p>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <MdWifi className="mt-1" />
                      </div>
                      <div className="ml-1 ">
                        <span className='font-medium'>WiFi: </span> {venue.wifi}
                      </div>
                    </div>
                  </p>
                )}
                {venue.wifiHiz && (
                  <p>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <MdSpeed className="mt-1" />
                      </div>
                      <div className="ml-1 ">
                        <span className='font-medium'>WiFi Hızı: </span>
                        <ReactMarkdown
                            components={{
                              p: Fragment,
                              a: ({ node, ...props }) => (
                                <a {...props} className="text-brown-darker underline" target="_blank" rel="noopener noreferrer" />
                              ),
                            }}
                          >
                          {venue.wifiHiz}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </p>
                )}
                {venue.gurultu && (
                  <p>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <MdVolumeUp className="mt-1" />
                      </div>
                      <div className="ml-1 ">
                        <span className='font-medium'>Gürültü Seviyesi: </span> {venue.gurultu}
                      </div>
                    </div>
                  </p>
                )}
                {venue.calismaSaatleri && (
                  <p>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <MdAccessTime className="mt-1" />
                      </div>
                      <div className="ml-1 ">
                        <span className='font-medium'>Çalışma Saatleri: </span> {venue.calismaSaatleri}
                      </div>
                    </div>
                  </p>
                )}
                {venue.instagram && (
                  <p>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FaInstagram className="mt-1" />
                      </div>
                      <div className="ml-1 ">
                        <span className='font-medium'>Instagram: </span> {' '}
                        <a
                          href={`https://instagram.com/${venue.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brown-darker underline"
                        >
                          {venue.instagram}
                        </a>
                      </div>
                    </div>
                  </p>
                )}
                {venue.harita && (
                  <p>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <MdMap className="mt-1" />
                      </div>
                      <div className="ml-1 ">
                        <span className='font-medium'>Harita: </span>
                        <ReactMarkdown
                          components={{
                            p: Fragment,
                            a: ({ node, ...props }) => (
                              <a {...props} className="text-brown-darker underline" target="_blank" rel="noopener noreferrer" />
                            ),
                          }}
                        >
                          {venue.harita}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </p>
                )}
                {venue.notlar && (
                  <p>
                    <div className="flex min-w-min">
                      <div className="flex-shrink-0">
                        <MdNotes className="mt-1" />
                      </div>
                      <div className="ml-1">
                        <span className="font-medium">Notlar: </span>
                        {expandedNotes === index ? (
                          <>
                            <ReactMarkdown
                              components={{
                                p: Fragment,
                                a: ({ node, ...props }) => (
                                  <a {...props} className="text-brown-darker underline" target="_blank" rel="noopener noreferrer" />
                                ),
                              }}
                            >
                              {venue.notlar}
                            </ReactMarkdown>
                            <button
                              className="text-blue-500 underline"
                              onClick={() => toggleExpandedNotes(index)}
                            >
                              <MdExpandLess className="mt-1 text-brown-dark font-bold" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="text-blue-500 underline"
                              onClick={() => toggleExpandedNotes(index)}
                            >
                              <MdExpandMore className="mt-1 text-brown-dark font-bold" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <footer className="bg-brown-light text-center mt-8 p-4 rounded-lg">
        <div className="flex justify-center items-center">
          <p className="text-brown-darker">
            Çalışma mekanları reposu:
            <a
              href="https://github.com/ramazansancar/acikkaynak_calisma-mekanlari"
              target="_blank"
              rel="noopener noreferrer"
              className="underline ml-2"
            >
              GitHub
            </a>
          </p>
          <p className="text-brown-darker ml-8">
            Bu sitenin reposu:
            <a
              href="https://github.com/code-a-man/calisma-mekanlari-app" // Replace with your website repository URL
              target="_blank"
              rel="noopener noreferrer"
              className="underline ml-2"
            >
              GitHub
            </a>
          </p>
        </div>
        <p className="text-brown-darker mt-2">
          Made with <span role="img" aria-label="heart">🤎</span> by{' '}
          <a
            href="https://github.com/code-a-man" // Replace with your GitHub profile URL
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Code a Man
          </a>
        </p>
      </footer>
    </div>
  );
};

export default IndexPage;
