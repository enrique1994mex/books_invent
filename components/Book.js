import React from 'react';

export default function Book({ book }) {

    const { TituloLibro, NombreAutor, ApellidosAutor, Anio } = book;

    return (
        <tr>
            <td className="border px-4 py-2">{TituloLibro}</td>
            <td className="border px-4 py-2">{NombreAutor}</td>
            <td className="border px-4 py-2">{ApellidosAutor}</td>
            <td className="border px-4 py-2">{Anio}</td>
        </tr>
    );
}

