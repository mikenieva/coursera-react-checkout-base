import React, {useReducer} from 'react'

import ProductsContext from './ProductsContext'
import ProductsReducer from './ProductsReducer'

import {
    ACTUALIZAR_TOTAL,
    AGREGAR_HELADO
} from '../types'

const ProductsState = props => {

    const initialState = {
        helados: [
            {
                id: 1,
                nombre:"Helado sencillo",
                precio: 2,
                img: "/anna-ribes-alEZLDPPRBU-unsplash.jpg"
            },
            {
                id: 2,
                nombre:"Helado doble",
                precio: 3.50,
                img: "/rachael-gorjestani-HLt6jQLf_J0-unsplash.jpg"
            },
            {
                id: 3,
                nombre:"Helado triple",
                precio: 4.50,
                img: "/sarah-gualtieri-tr9GO9WXNRI-unsplash.jpg"
            },
            {
                id: 4,
                nombre:"Malteada",
                precio: 2,
                img: "/natalie-toombs-KwCaIGKdlps-unsplash.jpg"
            },
        ],
        checkout: [],
        total: 0
    }

    const [state, dispatch] = useReducer(ProductsReducer, initialState)

    const agregarHeladoAlCarrito = (datos) => {

        // ESTABLECEMOS NUESTRO VALOR INICIAL, CON UNA CANTIDAD 1
        let nuevosDatos = {
            ...datos,
            cantidad: 1
        }

        // VERIFICAMOS SI YA EXISTE UN HELADO CON EL ID DENTRO DEL CHECKOUT
        const coincidenciaID = state.checkout.find((e) => {            
            return e.id === datos.id
        })

            // SI EXISTE LA COINCIDENCIA, ACUMULEMOS SU CANTIDAD PREVIA CON UNO ADICIONAL
            if (coincidenciaID !== undefined){
                nuevosDatos = {
                    ...datos,
                    cantidad: coincidenciaID.cantidad += 1
                }  
            }

        
        // QUITAMOS LAS COINCIDENCIAS (EN CASO DE QUE HAYAN EXISTIDO). SI NO, OBTENDREMOS UN ARREGLO VACÍO
        const eliminarCoincidencias = state.checkout.filter((e) => {
            return e.id !== datos.id
        })


        // AGREGAMOS ESTE NUEVO ARREGLO LIMPIO, SIN COINCIDENCIAS, Y LE AGREGAMOS LOS NUEVOS DATOS, CON LAS CANTIDADES ACTUALIZADAS
        const arrModificado = [nuevosDatos, ...eliminarCoincidencias]

        
        // EJECUTAMOS EL CAMBIO EN EL ESTADO Y PASAMOS EL ARREGLO MODIFICADO A TRAVÉS DEL PAYLOAD
        dispatch({
            type: AGREGAR_HELADO,
                payload: arrModificado
        })
    }

    const actualizarTotal = () => {
        const total = state.checkout.reduce((acc, cv) => {
            return acc + (cv.precio * cv.cantidad)
        }, 0)        

        dispatch({
            type: ACTUALIZAR_TOTAL,
            payload: total
        })       
    }


    return (
        <ProductsContext.Provider
            value={{
                helados: state.helados,
                checkout: state.checkout,
                total: state.total,
                agregarHeladoAlCarrito,
                actualizarTotal
            }}
        >
            {props.children}
        </ProductsContext.Provider>
    )

}
export default ProductsState