import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../context/AuthProvider'
import { PublicLayout } from '../components/layout/public/PublicLayout'
import { PrivateLayout } from '../components/layout/private/PrivateLayout'
import { Feed } from '../components/publication/Feed'
import { Login } from '../components/user/Login'
import { Register } from '../components/user/Register'
import { Recovery } from '../components/user/Recovery'
import { Config } from '../components/user/Config'
import { Profile } from '../components/user/Profile'
import { CrearPublicacion } from '../components/publication/CrearPublicacion'
import { Publicacion } from '../components/publication/Publicacion'
import { Inicio } from '../components/publication/Inicio'
import { Logout } from '../components/user/Logout'

export const Routing = () => {
  return (

    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<PublicLayout></PublicLayout>}>
            <Route index element={<Navigate to="inicio"></Navigate>}></Route>
            <Route path='inicio' element={<Inicio></Inicio>}></Route>
            <Route path='publicaciones' element={<Feed></Feed>}></Route>
            <Route path='login' element={<Login></Login>}></Route>
            <Route path='registro' element={<Register></Register>}></Route>
            <Route path='recuperar' element={<Recovery></Recovery>}></Route>
          </Route>

          <Route path='/auth' element={<PrivateLayout></PrivateLayout>}>
            <Route index element={<Navigate to="inicio"></Navigate>}></Route>
            <Route path='inicio' element={<Inicio></Inicio>}></Route>
            <Route path='publicaciones' element={<Feed></Feed>}></Route>
            <Route path='publicar' element={<CrearPublicacion></CrearPublicacion>}></Route>
            <Route path='publicacion/:id' element={<Publicacion></Publicacion>}></Route>
            <Route path='myprofile' element={<Config></Config>}></Route>
            <Route path='perfil/:userId' element={<Profile></Profile>}></Route>
            <Route path='logout'element={<Logout></Logout>}></Route>
          </Route>

        </Routes>

      </AuthProvider>
    </BrowserRouter>

  )
}