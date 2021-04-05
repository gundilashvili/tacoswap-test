import { useContext } from 'react'
import { Context as FarmsContext } from '../contexts/Farms'

const useFarm = (id) => {
  const { farms } = useContext(FarmsContext)
  const farm = farms.find((farm) => farm.id === id)
  return farm
}

export default useFarm
