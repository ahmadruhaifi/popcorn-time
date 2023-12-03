import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { ModalProps, Actor } from "../utils/interfaces"

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, movie }) => {
  const [cast, setCast] = useState<Actor[]>([]);

  useEffect(() => {
    const fetchCast = async () => {
      if (movie?.id) {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
          );
          const data = await response.json();
          setCast(data.cast);
        } catch (error) {
          console.error("Error fetching cast:", error);
        }
      }
    };

    if (isOpen) {
      fetchCast();
    }
  }, [isOpen, movie]);

  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-1/2 shadow-lg rounded-md bg-white">
        <h3 className="text-lg leading-6 font-medium text-gray-900 underline">{movie.title}</h3>
        {/* Movie details */}
        <div className="mt-3">
          <p className="text-sm text-gray-500 mb-2">
            <span className="font-bold">Synopsis:</span> {movie.overview}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            <span className="font-bold">Release date:</span> {format(new Date(movie.release_date), 'dd/MM/yyyy')}
          </p>
        </div>
        {/* Cast details */}
        <div className="mt-2">
          <p className="text-sm text-gray-500 mb-2 font-bold">Cast:</p>
          <div className="overflow-auto max-h-64">
            <ul className="list-disc list-inside text-sm text-gray-500">
              {cast.map((actor, index) => (
                <li key={index} className="flex items-center mb-2">
                  {actor.profile_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                      alt={actor.name}
                      width={50}
                      height={50}
                      className="rounded-full mr-2"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 mr-2 flex items-center justify-center">
                      {/* Default placeholder actor's initials */}
                      <span>{actor.name.charAt(0)}</span>
                    </div>
                  )}
                  <span>{actor.name} as {actor.character}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Close button */}
        <div className="flex justify-end py-3">
          <button
            id="ok-btn"
            className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-5/12 shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
