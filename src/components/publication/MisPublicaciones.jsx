import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { Global } from '../../helpers/Global'
import { NavLink } from 'react-router-dom'

export const MisPublicaciones = () => {

  const { auth } = useAuth({})
  const [page, setPage] = useState(1)
  const [articulos, setArticulos] = useState([])
  const [totalPages, setTotalPages] = useState(1)



  const nextPage = () => {
    let next = page + 1;
    setPage(next);

  };

  useEffect(() => {
    listarMisPublicaciones(page)

  }, [page])



  //aca se listan mis las publicaciones

  const listarMisPublicaciones = async (nextPage = 1) => {
    try {

      const request = await fetch(Global.url + 'articulo/misarticulos' + '/' + nextPage, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      })
      const data = await request.json()
      if (data.status === 'success') {
        setArticulos(data.articulos)
        setTotalPages(data.totalPages)
       

      } else {
        console.log(data.message)
      }

    } catch (error) {

    }
  }

  return (
    <section>
      <header className="main">
        <h1>Mis Publicaciones</h1>
      </header>
      {articulos.length > 0 && (
        <div>
          {articulos.map((articulo) => (
            <div key={articulo._id}>
              <span className="image publi"><img src="../../src/assets/img/fondo2.png" alt="" /></span>
              <hr className="major" />
              <h2>{articulo.titulo}</h2>
              <p>{articulo.descripcion}</p>
              <p>{articulo.contenido}</p>
              <ul className="actions">
                  <li><NavLink to={`/auth/publicacion/${articulo._id}`} className="button">Leer mas</NavLink></li>              
              </ul>
            </div>
          ))}
          <ul className="pagination">
            <li><span className={`button ${page === 1 ? 'disabled' : ''}`} onClick={() => setPage(page - 1)}>Anterior</span></li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <a to="#" className={`page ${page === index + 1 ? 'active' : ''}`} onClick={() => setPage(index + 1)} > {index + 1} </a></li>))}
            <li>
              <span className={`button ${page === totalPages ? 'disabled' : ''}`} onClick={nextPage}>Siguiente</span></li>
          </ul>
        </div>

      )}


    </section>
  )
}