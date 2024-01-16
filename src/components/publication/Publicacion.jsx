import React, { useEffect, useState } from 'react'
import { Global } from '../../helpers/Global'
import { useParams } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago'
import { Spiner } from '../../hooks/Spiner';

export const Publicacion = () => {
  const params = useParams()

  const [articulobuscado, setArticulobuscado] = useState(null)

  useEffect(() => {
    articuloObtenido()
  }, [params])

  const articuloObtenido = async () => {


    const articuloId = params.id
    

    try {
      const request = await fetch(Global.url + 'articulo/obtenido/' + articuloId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }

      })
      const data = await request.json()
  

      if (data.status === 'success') {
        setArticulobuscado(data.articulo)

      } else {
        console.log('error al obtener el articulo')
      }
    } catch (error) {
      console.log(error)

    }


  }

  return (
    <>
      {articulobuscado ? (
        <>
          <section>
            <header className="main">
              <h1>Articulo</h1>
            </header>
            <span className="image publi"><img src="../../src/assets/img/fondo2.png" alt="" /></span>
            <hr className="major" />
            <h2>{articulobuscado.titulo}</h2>
            <p>{articulobuscado.descripcion}</p>
            <p>{articulobuscado.contenido}</p>
            <p>Publicado por {articulobuscado.userId.name}  {articulobuscado.userId.surname} {articulobuscado.userId.create_at.split("T")[0]}</p>
            <ReactTimeAgo date={new Date(articulobuscado.userId.create_at) }></ReactTimeAgo>
          </section>

        </>
      ) : (
        <Spiner></Spiner>
      )}



    </>
  )
}
